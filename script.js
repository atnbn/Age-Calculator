const dayInput = document.getElementById('input-day');
const monthInput = document.getElementById('input-month');
const yearinput = document.getElementById('input-year');
const arrowbtn = document.getElementById('btn');
const dayOutput = document.getElementById('output-day')
const monthOutput = document.getElementById('output-month');
const yearOutput = document.getElementById('output-year');

const takeDate = () => {
    let day = new Date().getUTCDate() - Number(dayInput.value)
    let month = new Date().getUTCMonth() - Number(monthInput.value)
    let year = new Date().getUTCFullYear() - Number(yearinput.value)
    console.log(day, month, year);



    if (day <= 0) {
        month - 1
        day = +30
    }
    // console.log(day, birthDay);
    dayOutput.innerHTML = day
    monthOutput.innerHTML = month
    yearOutput.innerHTML = year
}



arrowbtn.addEventListener('click', takeDate)