/**
 * Main function to retrieve data
 * Gets data from the WS or the local Storage.
 * 
 * Returns a promise when data is present.
 *
 * @param {string} url The endpoint url.
 * @param {object} params Additional query parameters.
 * @param {string} module_name The module name.
 * @param {int} keep_time How long to store data in seconds.
 */
function getData(url, params={}, module_name, keep_time=3600) {

    const main_promise = new Promise((resolve, reject) => {

        if (getFromLocalStorage(module_name) === null) {
            let promise = getEndpointResponse(url, params);
            promise.then((data) => {
                console.log('calling WS: ' + module_name);
    
                // Save only the data needed to the local storage.
                saveToLocalStorage(JSON.parse(data), module_name, keep_time);
    
                // return JSON.parse(data);
                resolve(JSON.parse(getFromLocalStorage(module_name)));
            }, (error) => {
                setFlashbag('error', 'Could not retrieve data from the ' + module_name + ' webservice');
                reject(Error('Could not get data'));
            });
        }
        else {
            console.log('calling locaStorage: ' + module_name);
    
            resolve(JSON.parse(getFromLocalStorage(module_name)));
        }
    });

    return main_promise;
}

/**
 * Get json response for an endpoint
 * @param {string} url The url.
 * @param {array} params Additional query parameters.
 * @returns {object} The promise.
 */
function getEndpointResponse(url, params) {

    const promise = new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        if (params) {
            url = buildUrlParams(url, params);
        }
        request.open('GET', url);
        request.onload = () => {
            if (request.status === 200) {
                resolve(request.response); // we got data here, so resolve the Promise
            }
            else {
                if (request.status === 429) {
                    reject(Error('too many requests')); // Too mmany
                }
                reject(Error(request.statusText)); // status is not 200 OK, so reject
            }
        };
        request.onerror = () => {
            reject(Error('Error fetching data.')); // error occurred, reject the  Promise
        };

        request.send(); // send the request
    });

    return promise;

}

/**
 * Returns url with param as string.
 *
 * @param {string} url The url.
 * @param {object} params Additional parameters.
 */
function buildUrlParams(url, params) {
    let params_array = Object.entries(params);
    let params_string = [];

    params_array.forEach(element => {
        params_string.push(element.join('='));
    });

    url = url + '?' + params_string.join('&');

    return url;
}

/**
 * Saves data to the local storage.
 *
 * @param {string} data The data we retrieved i.e from a WS.
 * @param {string} module_name The module name.
 * @param {int} keep_time How long in seconds the data should be stored.
 */
function saveToLocalStorage(data, module_name, keep_time = 3600) {
    // Expires after 3600 seconds.
    data['expire_time'] = Math.floor(Date.now() / 1000) + keep_time;

    // Save the data.
    localStorage.setItem(module_name, JSON.stringify(data));
}

/**
 * Returns local storage, or null if expired.
 *
 * @param {string} module_name The module name.
 */
function getFromLocalStorage(module_name) {
    // If the storage is too old, return NULL
    let local_storage = JSON.parse(localStorage.getItem(module_name));
    let now = Math.floor(Date.now() / 1000);

    if (local_storage !== null) {
        // Storage is not expired.
        if (local_storage.expire_time > now) {
            return localStorage.getItem(module_name);
        }
        // Storage has expired.
        localStorage.removeItem(module_name);
    }

    return null;
}