// https://github.com/pgrimaud/ratp-api-rest
// https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/6/quai-de-la-gare/A

(function () {

    // Module name, config and css.
    let module_name = 'ratp';
    let ratp = config.api.ratp;
    addCss(module_name);
    let options = {
        line: 6,
        station: 'quai-de-la-gare',
        direction: 'A',
    };

    let promise = getEndpointResponse(ratp.endpoint + '/schedules/metros/' + options.line + '/' + options.station + '/' + options.direction);
    promise.then((data) => {
        return buildMarkup(JSON.parse(data));
    }, (error) => {
        setFlashbag('error', 'Could not retrieve data from the ' + module_name + ' webservice');
    });

    /**
     * Build the markup.
     */
    function buildMarkup(data) {
        // Create the markup of the weather tile.
        let markup = `
    <h3 class="item-title">Prochain métros</h3>
    <div>Ligne: <span class="bold">${options.line}</span></div>
    <div>De: <span class="bold">${options.station}</span></div>
    <div>Destination: <span class="bold">${data.result.schedules[0].destination}</span></div>
    <div class="ratp-generic-container">Dans: <div class="digital-container"><span class="digital">${data.result.schedules[0].message}</span></div></div>
    <div class="ratp-generic-container">Le suivant: <div class="digital-container"><span class="digital"> ${data.result.schedules[1].message}</span></div></div>
    `;

        // Create the item div.
        let item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('id', module_name);
        item.innerHTML = markup;

        // Add the item to the DOM.
        let container = document.getElementById('item-container');
        container.appendChild(item);
    }

}());
