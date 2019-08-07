/**
 * Get json response for an endpoint
 * @param {string} url
 * @param {array} params
 * @returns {} json response.
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
 * @param {string} url 
 * @param {object} params 
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
