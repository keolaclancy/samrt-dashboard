
// Last 5 core SA
// https://www.drupal.org/api-d7/node.json?limit=5&sort=created&direction=DESC&type=sa&status=1&field_project=3060

(function () {

    // Module name, config and css.
    let module_name = 'drupal';
    let sa = config.api.drupal;
    addCss(module_name);

    let core_project_id = 3060;

    if (getFromLocalStorage(module_name) === null) {

        let options = {
            limit: 10,
            type: 'sa',
            sort: 'created',
            direction: 'DESC',
            status: 1,
            // field_project: 3060,
        };

        let promise = getEndpointResponse(sa.endpoint, options);
        promise.then((data) => {

            // Save only the data needed to the local storage.
            saveToLocalStorage(JSON.parse(data), module_name);

            return buildMarkup(JSON.parse(data));
        }, (error) => {
            setFlashbag('error', 'Could not retrieve data from the ' + module_name + ' webservice');
        });

    }
    else {
        buildMarkup(JSON.parse(getFromLocalStorage(module_name)));
    }

    /**
     *
     * @param {*} data 
     */
    function buildMarkup(data) {
        let filtered_sa = filterSa(data.list);

        console.log(filtered_sa);

        // Create the markup of the weather tile.
        let markup = `
    <h3 class="drupal-title">DRUPAL SECURITY</h3>
    Drupal Core
    <div class="sa-container">
        <ul id="core-list">
        </ul>    
    </div>
    Drupal Contrib
    <div class="sa-container">
        <ul id="contrib-list">
        </ul>
    </div>
    `;

        // Create the item div.
        let item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('id', module_name);
        item.innerHTML = markup;

        // Add the item to the DOM.
        let container = document.getElementById('item-container');
        container.appendChild(item);

        // Add items inside the lists.
        // Core items.
        filtered_sa.core.forEach(element => {
            buildListElement(element, 'core');
        });

        // Contrib items.
        filtered_sa.contrib.forEach(element => {
            buildListElement(element, 'contrib');
        });

    }

    /**
     * Filter security advisories into Core and Contrib arrays.
     * 
     * @param {*} sa 
     */
    function filterSa(sa) {
        let sa_core = [];
        let sa_contrib = [];

        sa.forEach(element => {
            if (element.field_project.id == core_project_id) {
                sa_core.push(element);
            }
            else {
                sa_contrib.push(element);
            }
        });

        return {
            core: sa_core,
            contrib: sa_contrib,
        }
    }

    /**
     * Returns a well formatted element to be printed.
     * @param {*} element 
     */
    function formatElement(element) {
        // The creation date, from timestamp to human readable date.
        var dt = new Date(parseInt(element.created) * 1000);
        var lang = navigator.language;
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: false,
        };
        // Split the title.
        let split_title = element.title.split(' - ');

        let formatted = {
            created: dt.toLocaleDateString(lang, options),
            title: split_title[split_title.length - 1],
            criticity: split_title[1],
            sa_type: element.field_sa_type,
            link: element.url,
        };

        return formatted;
    }

    /**
     * Builds individual elements for a list.
     *
     * @param {*} element 
     * @param {*} list_name 
     */
    function buildListElement(element, list_name) {
        let formatted = formatElement(element);

        let item = document.createElement('li');
        let markup = `
        <li>
            <div class="${list_name}-item">
            <a class="default" href="${formatted.link}">${formatted.title}</a>
            <span title="${formatted.criticity}" class="drupal-criticity ${cleanString(formatted.criticity)}">${formatted.sa_type}</span>
            </div>
        </li>
        `;
        item.innerHTML = markup;

        let container = document.getElementById(list_name + '-list');
        container.appendChild(item);
    }

    /**
     * Returns an img uri from a string.
     */
    function cleanString(name) {
        // Clean the name
        // strlower, adding replace spaces
        return name.replace(/\s+/g, '-').toLowerCase();
    }

}());

