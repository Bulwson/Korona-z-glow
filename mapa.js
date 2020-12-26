let global
document.addEventListener('DOMContentLoaded', getData(), false);
function getData() {
    fetch('https://api.covid19api.com/total/country/poland').then(
        response => response.json().then(
            data => {
                global = data
            }
        )
    )
}
function displayName(ele) {
    document.getElementById('country-name').firstChild.data = ele.id;
    if ()
}