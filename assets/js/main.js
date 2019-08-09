// Feed from API.
// Create item element.

// Wait for dom ready.
document.addEventListener('DOMContentLoaded', (event) => {
    // Get the modules to load their JS.
    let modules = config.modules;

    // Add <script> tag to the dom.
    var i = 0;
    for (i = 0; i < modules.length; i++) {
        var script_tag = document.createElement("script");
        var script_att = document.createAttribute("src");
        script_att.value = "assets/js/modules/" + modules[i] + "/" + modules[i] + ".js";
        script_tag.setAttributeNode(script_att);
        document.body.appendChild(script_tag);
    }

    // Display the date and quote in the header
    displayDate();
})

// Display the date in the header 1.
function displayDate() {
    var dt = new Date();
    var lang = navigator.language;
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };

    var header1 = document.getElementById('header-1');
    header1.innerHTML = dt.toLocaleDateString(lang, options);
    // Refresh every minute.
    var t = setTimeout(displayDate, 60000);
}

/**
 * Add module css.
 */
function addCss(module_name) {
    var link_tag = document.createElement("link");
    link_tag.setAttribute("rel", "stylesheet");
    link_tag.setAttribute("type", "text/css");
    link_tag.setAttribute("media", "screen");
    link_tag.setAttribute("href", "assets/js/modules/" + module_name + "/" + module_name + ".css");

    document.head.appendChild(link_tag);
}