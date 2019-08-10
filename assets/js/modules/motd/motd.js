
(function () {

    // Module name, config and css.
    let module_name = 'motd';
    let motd = config.api.motd;

    if (getFromLocalStorage(module_name) === null) {

        let promise = getEndpointResponse(motd.endpoint);
        promise.then((data) => {
            // Save only the data needed to the local storage.
            saveToLocalStorage(JSON.parse(data), module_name);

            return printMotd(JSON.parse(data));
        }, (error) => {
            setFlashbag('error', 'Could not retrieve data from the ' + module_name + ' webservice');
        });

    }
    else {
        printMotd(JSON.parse(getFromLocalStorage(module_name)));
    }

    /**
     * Prints Message of the day.
     *
     * @param {*} data 
     */
    function printMotd(data) {
        let motd_node = document.getElementById('header-2');
        motd_node.classList.add('italic');

        let motd = data.slip.advice;
        motd_node.innerHTML = motd;
    }

}());

