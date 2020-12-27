let global
let dict = {
    "dolnoslaskie": 15,
    "kujawsko-pomorskie": 0,
    "lubelskie": 1,
    "lubuskie": 2,
    "lodzkie": 3,
    "malopolskie": 4,
    "mazowieckie": 5,
    "opolskie": 6,
    "podkarpackie": 7,
    "podlaskie": 8,
    "pomorskie": 9,
    "slaskie": 10,
    "swietokrzyskie": 11,
    "warminsko-mazurskie": 12,
    "wielkopolskie": 13,
    "zachodnio-pomorskie": 14,

}

function drawDate() {
    const date_picker_element = document.querySelector('.date-picker');
    const selected_date_element = document.querySelector('.date-picker .selected-date');
    const dates_element = document.querySelector('.date-picker .dates');
    const mth_element = document.querySelector('.date-picker .dates .month .mth');
    const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
    const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
    const days_element = document.querySelector('.date-picker .dates .days');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let selectedDate = date;
    let selectedDay = day;
    let selectedMonth = month;
    let selectedYear = year;

    mth_element.textContent = months[month] + ' ' + year;

    selected_date_element.textContent = formatDate(date);
    selected_date_element.dataset.value = selectedDate;

    populateDates();

    // EVENT LISTENERS
    date_picker_element.addEventListener('click', toggleDatePicker);
    next_mth_element.addEventListener('click', goToNextMonth);
    prev_mth_element.addEventListener('click', goToPrevMonth);

    // FUNCTIONS
    function toggleDatePicker(e) {
        if (!checkEventPathForClass(e.path, 'dates')) {
            dates_element.classList.toggle('active');
        }
    }

    function goToNextMonth(e) {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        mth_element.textContent = months[month] + ' ' + year;
        populateDates();
    }

    function goToPrevMonth(e) {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        mth_element.textContent = months[month] + ' ' + year;
        populateDates();
    }

    function populateDates(e) {
        days_element.innerHTML = '';
        let amount_days = 31;

        if (month == 3 || month == 5 || month == 8 || month == 10) {
            amount_days = 30
        }

        if (month == 1) {
            amount_days = 28;
        }

        for (let i = 0; i < amount_days; i++) {
            const day_element = document.createElement('div');
            day_element.classList.add('day');
            day_element.textContent = i + 1;

            if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
                day_element.classList.add('selected');
            }

            day_element.addEventListener('click', function () {
                selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
                selectedDay = (i + 1);
                selectedMonth = month;
                selectedYear = year;

                selected_date_element.textContent = formatDate(selectedDate);
                selected_date_element.dataset.value = selectedDate;

                populateDates();
                dates_element.classList.toggle('active');
            });

            days_element.appendChild(day_element);
        }
    }

    // HELPER FUNCTIONS
    function checkEventPathForClass(path, selector) {
        for (let i = 0; i < path.length; i++) {
            if (path[i].classList && path[i].classList.contains(selector)) {
                return true;
            }
        }

        return false;
    }
    function formatDate(d) {
        let day = d.getDate();
        if (day < 10) {
            day = '0' + day;
        }

        let month = d.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }

        let year = d.getFullYear();

        return day + ' / ' + month + ' / ' + year;
    }
}

document.addEventListener('DOMContentLoaded', getData(), false);
function getData() {
    fetch('https://api.covid19api.com/total/country/poland').then(
        response => response.json().then(
            data => {
                global = data
                drawDate()
            }
        )
    )
}

function displayName(ele) {
    document.getElementById('infoid').innerHTML = `W wojewodztwie ${ele.id} zachorowało:`
    document.getElementById('sicked').innerHTML = dict[ele.id]
}