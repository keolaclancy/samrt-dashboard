(function () {

    // Module name, config and css.
    let module_name = 'unsplash';
    let unsplash = config.api.unsplash;
    addCss(module_name);

    let url = unsplash.endpoint + "/photos/random";
    let params = {
        client_id: unsplash.access,
        orientation: 'landscape',
        query: unsplash.query,
    };

    let promise = getData(url, params, module_name, 3600);
    promise.then((data) => {

        setBackgroundImage(data);
    }, (error) => {
        setFlashbag('error', 'Could not retrieve data from the ' + module_name + ' webservice');
    });

    /**
     * Display the background image from the unsplash webservice.
     *
     * @param {object} data The data to be used to display the background.
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
}());
