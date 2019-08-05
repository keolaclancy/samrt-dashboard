
// USAGE:
// Use the endpoint: https://fcc-weather-api.glitch.me/. Use this endpoint to get the weather at a location. To prevent abuses this server accepts GET requests only, and serves only the route /api/current?lon=:longitude&lat=:latitude. Images links are included in the JSON under weather[0].icon. This is enough to complete the challenge. 
// Example: 
// Request: https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139 
// Response: { "coord":{ "lon":159, "lat":35 }, "weather":[ { "id":500, "main":"Rain", "description":"light rain", "icon":"https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399" } ], "base":"stations", "main":{ "temp":22.59, "pressure":1027.45, "humidity":100, "temp_min":22.59, "temp_max":22.59, "sea_level":1027.47, "grnd_level":1027.45 }, "wind":{ "speed":8.12, "deg":246.503 }, "rain":{ "3h":0.45 }, "clouds":{ "all":92 }, "dt":1499521932, "sys":{ "message":0.0034, "sunrise":1499451436, "sunset":1499503246 }, "id":0, "name":"", "cod":200 }

// Add the module css.
addCss();

let promise = getEndpointResponse('https://fcc-weather-api.glitch.me/api/current', { lat: 48.85, lon: 2.35 });
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
    console.log(data);
    // Create the markup of the weather tile.
    let markup = `
    <h3 class="weather-title">${data.name}</h3>
    <img src="${data.weather[0].icon}"></img>
    <div>${data.main.temp}</div>
    <div>max: ${data.main.temp_max}</div>
    <div>min:${data.main.temp_min}</div>
    `;

    // Create the item div.
    let item = document.createElement('div');
    item.classList.add('item');
    item.setAttribute('id', "weather");
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
    link_tag.setAttribute("href", "assets/js/modules/weather/weather.css");
    
    document.head.appendChild(link_tag);
}

