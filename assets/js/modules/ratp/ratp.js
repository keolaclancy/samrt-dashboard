// https://github.com/pgrimaud/ratp-api-rest
// https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/6/quai-de-la-gare/A

(function () {

    // Module name, config and css.
    let module_name = 'ratp';
    let ratp = config.api.ratp;
    addCss();

    let promise = getEndpointResponse(ratp.endpoint + '/schedules/metros/6/quai-de-la-gare/A');
    promise.then((data) => {
        return buildMarkup(JSON.parse(data));
    }, (error) => {
        console.log('Promise rejected.');
        console.log(error.message);
    });

    /**
     * Build the markup.
     */
    function buildMarkup(data) {
        // Create the markup of the weather tile.
        let markup = `
    <h3 class="ratp-title">Prochain métros</h3>
    <div>Destination: ${data.result.schedules[0].destination}</div>
    <div>Dans: ${data.result.schedules[0].message}</div>
    <div>Le suivant: ${data.result.schedules[1].message}</div>
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
}());
