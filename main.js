let xd
let tab = [1, 2, 3]
function getData() {
    fetch('https://api.covid19api.com/total/country/poland').then(
        response => response.json().then(
            data => {
                xd = data
                document.getElementById('zachorowania').innerHTML = `W poprzednim dniu zachorowało: ${data[data.length - 1].Confirmed - data[data.length - 2].Confirmed}`
                document.getElementById('smierci').innerHTML = `W poprzednim dniu zmarło: ${data[data.length - 1].Deaths - data[data.length - 2].Deaths}`
                const ctx = document.getElementById('chart').getContext('2d')
                let abc = xd.map(info => info.Confirmed)
                let cbd = []
                let temp = 0
                abc.forEach(element => {
                    element = element - temp
                    temp += element
                    cbd.push(element)
                });
                console.log(abc)
                new Chart(document.getElementById("chart"), {
                    type: 'line',
                    data: {
                        labels: xd.map(info => info.Date.slice(0, 10)),
                        datasets: [
                            {
                                label: "Ile zmarło",
                                backgroundColor: "#FF0000",
                                data: cbd,
                                fill: false
                            }
                        ]
                    },
                    options: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: 'wykres kornaswirusa'
                        }
                    }
                });
            }
        )
    )
}
