function getData() {
    fetch('https://api.covid19api.com/total/country/poland').then(
        response => response.json().then(
            data => document.getElementById('dane').innerHTML = `W poprzednim dniu zachorowało: ${data[data.length - 1].Confirmed - data[data.length - 2].Confirmed}`
        )
    )
}