(function () {

    // Module name, config and css.
    let module_name = 'unsplash';
    let unsplash = config.api.unsplash;
    addCss(module_name);

    // If we don't have the local storage data.
    // Call the unsplash webservice.
    if (getFromLocalStorage() === null) {
        let params = {
            client_id: unsplash.access,
            orientation: 'landscape',
            query: unsplash.query,
        };

        let promise = getEndpointResponse(unsplash.endpoint + "/photos/random", params);
        promise.then((data) => {
            // Save only the data needed to the local storage.
            saveToLocalStorage(JSON.parse(data));

            setBackgroundImage(JSON.parse(data));
        }, (error) => {
            setFlashbag('error', 'Could not retrieve data from the ' + module_name + ' webservice');
        });
    }
    else {
        setBackgroundImage(JSON.parse(getFromLocalStorage()));
    }

    /**
     * Display the background image from the unsplash webservice.
     */
    function setBackgroundImage(data) {
        // Add the background to the body.
        let body = document.getElementById('body');
        body.classList.add("unsplash");
        body.setAttribute("style", "background-image: url('" + data.urls.regular + "')");

        // Add the credits div.
        let title = typeof data.location !== 'undefined' ? data.location.title : '';
        let markup = `
        <div class="credit-text">${title}</div>
        <a class="credit-link" target="_blank" href ="${data.links.html}"> Photo by ${data.user.name} / Unsplash</a>
        `;

        let credit = document.createElement("div");
        credit.classList.add('credit');
        credit.innerHTML = markup;
        let footer = document.getElementById("footer");
        footer.appendChild(credit);
    }

    /**
     * @param {data: object}
     */
    function saveToLocalStorage(data) {
        // Expires after 3600 seconds.
        data['expire_time'] = Math.floor(Date.now() / 1000) + 3600;

        // Save the data.
        localStorage.setItem('unsplash', JSON.stringify(data));
    }

    /**
     * Returns local storage, or null if expired.
     */
    function getFromLocalStorage() {
        // If the storage is too old, return NULL
        let local_storage = JSON.parse(localStorage.getItem('unsplash'));
        let now = Math.floor(Date.now() / 1000);

        if (local_storage !== null) {
            // Storage is not expired.
            if (local_storage.expire_time > now) {
                return localStorage.getItem('unsplash');
            }
            // Storage has expired.
            localStorage.removeItem('unsplash');
        }
        return null;
    }

}());
