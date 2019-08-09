// USAGE:
// Use the endpoint: https://fcc-weather-api.glitch.me/. Use this endpoint to get the weather at a location. To prevent abuses this server accepts GET requests only, and serves only the route /api/current?lon=:longitude&lat=:latitude. Images links are included in the JSON under weather[0].icon. This is enough to complete the challenge. 
// Example: 
// Request: https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139 
// Response: { "coord":{ "lon":159, "lat":35 }, "weather":[ { "id":500, "main":"Rain", "description":"light rain", "icon":"https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399" } ], "base":"stations", "main":{ "temp":22.59, "pressure":1027.45, "humidity":100, "temp_min":22.59, "temp_max":22.59, "sea_level":1027.47, "grnd_level":1027.45 }, "wind":{ "speed":8.12, "deg":246.503 }, "rain":{ "3h":0.45 }, "clouds":{ "all":92 }, "dt":1499521932, "sys":{ "message":0.0034, "sunrise":1499451436, "sunset":1499503246 }, "id":0, "name":"", "cod":200 }


(function () {

    // Module name, config and css.
    let module_name = 'weather';
    let weather = config.api.weather;
    addCss(module_name);

    let promise = getEndpointResponse(weather.endpoint, { lat: 48.85, lon: 2.35 });
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
        let img_markup = (typeof data.weather[0].icon !== 'undefined') ? `<img class="weather-logo" src="${data.weather[0].icon}"></img>` : '';

        let markup = `
    <h3 class="weather-title">Météo</h3>
    En ce moment à <span class="bold">${data.name}</span>
    <div class="weather-info-container">
        ${img_markup}
        <div class="current-temp">${data.main.temp} C°</div>
    </div>
    <div class="weather-info-container">
        <div class="weather-elements">min:${data.main.temp_min} C°</div>
        <div class="weather-elements">max: ${data.main.temp_max} C°</div>
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
    }

}());

