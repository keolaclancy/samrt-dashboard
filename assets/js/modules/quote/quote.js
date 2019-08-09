
(function () {

    // Module name, config and css.
    let module_name = 'quote';
    let quote = config.api.quote;
    addCss(module_name);

    if (getFromLocalStorage(module_name) === null) {

        let params = {
            category: 'life',
        };
    
        let promise = getEndpointResponse(quote.endpoint, params);
        promise.then((data) => {
            // Save only the data needed to the local storage.
            saveToLocalStorage(JSON.parse(data), module_name);

            return printQuote(JSON.parse(data));
        }, (error) => {
            setFlashbag('error', 'Could not retrieve data from the ' + module_name + ' webservice');
        });

    }
    else {
        printQuote(JSON.parse(getFromLocalStorage(module_name)));

    }

    /**
     * 
     * @param {*} data 
     */
    function printQuote(data) {
        let quote_data = data.contents.quotes[0];
        let quote_node = document.getElementById('header-2');
        quote_node.classList.add('italic');

        let markup = `
            ${quote_data.quote} - ${quote_data.author}
            <span class="quote-credits">Quotes from <a class="default" target="_blank" href="${quote.credits}">${quote.credits}</a></span>
        `;
        quote_node.innerHTML = markup;
    }

}());

