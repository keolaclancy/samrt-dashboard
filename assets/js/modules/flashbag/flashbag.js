/**
 *
 * @param {*} type
 * @param {*} message
 */
function setFlashbag(type, message) {
    addCss('flashbag');

    // Add error flashbag.
    var flashbag = document.getElementById('flashbag');
    flashbag.classList.add(type);
    flashbag.innerHTML = message;
    flashbag.innerHTML += ' <a href="#" id="close" class="close">x</a>';

    flashbag.addEventListener("click", function () {
        flashbag.classList.remove(type);
        flashbag.innerHTML = '';
    });
}

