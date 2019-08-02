// Feed from API.
// Create item element.


// Wait for dom ready.
document.addEventListener('DOMContentLoaded', (event) => {
    // Declare array of js scripts that should be fired.
    var scripts = ['flashbag.js', 'webgl.js'];

    // Add <script> tag to the dom.
    var i = 0;
    for (i = 0; i < scripts.length; i++) {
        var script_tag = document.createElement("script");
        var script_att = document.createAttribute("src");
        script_att.value = 'assets/js/'.concat(scripts[i]);
        script_tag.setAttributeNode(script_att);
        document.body.appendChild(script_tag);
    }

    // Display the date and quote in the header
    displayDate();
    displayQuote();
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

// Display a quote in the header 2.
function displayQuote() {
    // @todo : Use a text file with quotes (or api).
    var header2 = document.getElementById('header-2');
    header2.innerHTML = "Make it happen !";
}
