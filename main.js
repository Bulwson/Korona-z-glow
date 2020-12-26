document.addEventListener('DOMContentLoaded', getData(), false);

function drawChartConfirmed(data) {

    let howmuchdays = 10
    let tempconfirmed = 0
    let datatodisplayconfirmed = []
    let tempdeaths = 0
    let datatodisplaydeaths = []
    let fetcheddata = data.map(info => info.Confirmed)
    data.forEach(element => {
        element.Confirmed = element.Confirmed - tempconfirmed
        tempconfirmed += element.Confirmed
        datatodisplayconfirmed.push(element.Confirmed)
        element.Deaths = element.Deaths - tempdeaths
        tempdeaths += element.Deaths
        datatodisplaydeaths.push(element.Deaths)
    })
    datatodisplayconfirmed = datatodisplayconfirmed.slice(-howmuchdays)
    datatodisplaydeaths = datatodisplaydeaths.slice(-howmuchdays)
    data = data.slice(-howmuchdays)
    new Chart(document.getElementById("chart"), {
        type: "line",
        data: {
            labels: data.map(info => info.Date.slice(0, 10)),
            datasets: [
                {
                    label: "ile zachorowało",
                    backgroundColor: "#FF0000",
                    data: datatodisplayconfirmed,
                    fill: false,
                    pointRadius: 0.1,
                    borderColor: "#FF0000",
                    pointHitRadius: 5
                },
                {
                    label: "ile zmarlo",
                    backgroundColor: "#000000",
                    data: datatodisplaydeaths,
                    fill: false,
                    pointRadius: 1,
                    borderColor: "#000000",
                    pointHitRadius: 5
                }

            ]
        },
        options: {
            legend: { display: false }
        }
    })
}

function getData() {
    fetch('https://api.covid19api.com/total/country/poland').then(
        response => response.json().then(
            data => {
                document.getElementById('zachorowania').innerHTML = data[data.length - 1].Confirmed - data[data.length - 2].Confirmed
                document.getElementById('smierci').innerHTML = data[data.length - 1].Deaths - data[data.length - 2].Deaths
                drawChartConfirmed(data)
            }
        )
    )
}
