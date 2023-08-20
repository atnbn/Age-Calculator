const dayInput = document.getElementById('input-day');
const monthInput = document.getElementById('input-month');
const yearInput = document.getElementById('input-year');
const arrowBtn = document.getElementById('btn');
const dayOutput = document.getElementById('output-day');
const monthOutput = document.getElementById('output-month');
const yearOutput = document.getElementById('output-year');

const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const getDaysInMonth = (month, year) => {
    if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))) {
        return 29; // February in a leap year
    }
    return monthDays[month];
};

console.log();
const takeDate = () => {
    const today = new Date();
    let day = today.getUTCDate() - parseInt(dayInput.value);
    let month = today.getUTCMonth() + 1 - parseInt(monthInput.value);
    let year = today.getUTCFullYear() - parseInt(yearInput.value);
    let actualDays = getDaysInMonth(month, year);

    if (month < 0) {
        year--;
        month += 12;
    }
    if (month >= 12) {
        year++;
        month = 0;
    }
    if (day >= actualDays) {
        month++;
        day -= actualDays;
    }
    if (day < 0) {
        day += actualDays;
        month--;
    }

    dayOutput.innerHTML = day;
    monthOutput.innerHTML = month;
    yearOutput.innerHTML = year;
};
const checkValidator = (currentMonth) => {
    const dayValue = Number(dayInput.value);
    const monthValue = Number(monthInput.value);
    const yearValue = Number(yearInput.value);
    const currentDate = new Date();
    const enteredDate = new Date(yearValue, monthValue - 1, dayValue);

    // CHecks for empty input
    if (dayValue === 0) {

        // eine funktion dafür schreiben
        dayInput.classList.remove('hidden')
        let errorMessage = document.createElement("SPAN");
        errorMessage.innerHTML = 'This Field is required'
        dayInput.insertAdjacentElement('afterend', errorMessage)
    }
    if (monthValue === 0) {
        console.log('This Field is required');

    }
    if (yearValue === 0) {
        console.log('This Field is required');
    }

    // Checks if Input are in an Correct Format
    if (dayValue > getDaysInMonth(monthValue, yearValue)) {
        console.log('Must be a valid date');
    }

    if (monthValue > 12) {
        console.log('Must be a valid date');
    }

    // checks if the date is in the past
    if (enteredDate > currentDate) {
        console.log('Date must be in the past');
    }

};

arrowBtn.addEventListener('click', () => {
    checkValidator();
});
