(function () {

    // Module name, config and css.
    let module_name = 'motd';
    let motd = config.api.motd;

    let promise = getData(motd.endpoint, {}, module_name, 3600);
    promise.then((data) => {

        buildMarkup(data);
    }, (error) => {
        setFlashbag('error', 'Could not retrieve data from the ' + module_name + ' webservice');
    });

    /**
     * Prints Message of the day.
     *
     * @param {*} data 
     */
    function buildMarkup(data) {
        let motd_node = document.getElementById('header-2');
        motd_node.classList.add('italic');

        let motd = data.slip.advice;
        motd_node.innerHTML = motd;
    }

}());

