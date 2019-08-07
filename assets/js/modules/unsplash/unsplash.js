(function () {

    // Module name, config and css.
    let module_name = 'unsplash';
    let unsplash = config.api.unsplash;
    addCss();

    // If we don't have the local storage data.
    // Call the unsplash webservice.
    if (getFromLocalStorage() === null) {
        let params = {
            client_id: unsplash.access,
            orientation: 'landscape',
            query: 'nature',
        };

        let promise = getEndpointResponse(unsplash.endpoint + "/photos/random", params);
        promise.then((data) => {
            // Save only the data needed to the local storage.
            saveToLocalStorage(JSON.parse(data));

            setBackgroundImage(JSON.parse(data));
        }, (error) => {
            console.log('Promise rejected.');
            console.log(error.message);
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
        let markup = `
        <div class="credit-text">${data.location || ''}</div>
        <a class="credit-link" target="_blank" href ="${data.links.html}"> Photo by ${data.user.name} / Unsplash</a>
        `;

        let credit = document.createElement("div");
        credit.classList.add('credit');
        credit.innerHTML = markup;
        let footer = document.getElementById("footer");
        footer.appendChild(credit);
        
        // @todo : We can also change the Date/quote colors depending on the image color. (data.color)
        console.log(data);
    }

    /**
    * Add module css.
    */
    function addCss() {
        var link_tag = document.createElement("link");
        link_tag.setAttribute("rel", "stylesheet");
        link_tag.setAttribute("type", "text/css");
        link_tag.setAttribute("media", "screen");
        link_tag.setAttribute("href", "assets/js/modules/" + module_name + "/" + module_name + ".css");

        document.head.appendChild(link_tag);
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
