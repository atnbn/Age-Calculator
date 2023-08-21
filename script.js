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
const checkValidator = () => {
    const dayValue = Number(dayInput.value);
    const monthValue = Number(monthInput.value);
    const yearValue = Number(yearInput.value);
    const currentDate = new Date();
    const enteredDate = new Date(yearValue, monthValue - 1, dayValue);

    removeError(dayInput);
    removeError(monthInput);
    removeError(yearInput);

    let hasErrors = false;
    // CHecks for empty input
    if (dayValue === 0) {
        // eine funktion dafür schreiben
        addError(dayInput, 'This field is required')
        hasErrors = true;
    }
    if (monthValue === 0) {
        addError(monthInput, 'This field is required')
        hasErrors = true;

    }
    if (yearValue === 0) {
        addError(yearInput, 'This field is required')
        hasErrors = true;
    }

    // Checks if Input are in an Correct Format
    if (dayValue > getDaysInMonth(monthValue, yearValue)) {
        addError(dayInput, 'Must be a valid date');
        hasErrors = true;
    }

    if (monthValue > 12) {
        addError(monthInput, 'Must be a valid date');
        hasErrors = true;
    }

    // checks if the date is in the past
    if (enteredDate > currentDate) {
        addError(yearInput, 'Date must be in the past');
        hasErrors = true;
    }

    if (!hasErrors) {
        takeDate();
        removeError()
    }

};

arrowBtn.addEventListener('click', () => {
    checkValidator();
});

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkValidator();
    }
})


const addError = (inputType, errorText) => {
    const existingErrorMessage = inputType.nextElementSibling;
    const label = inputType.previousElementSibling;

    // Check if an error message already exists and has the error-color class
    if (existingErrorMessage && existingErrorMessage.classList.contains('error-color')) {
        return; // If an error message already exists, do nothing
    }

    let errorMessage = document.createElement('span');
    errorMessage.classList.add('error-color');
    inputType.classList.add('error-border');
    label.classList.add('error-color');
    errorMessage.innerHTML = `${errorText}`;
    inputType.insertAdjacentElement('afterend', errorMessage);

};


const removeError = (inputType) => {
    const existingErrorMessage = inputType.nextElementSibling;
    const label = inputType.previousElementSibling;

    // Check if an error message exists and has the error-color class
    if (existingErrorMessage && existingErrorMessage.classList.contains('error-color')) {
        existingErrorMessage.remove(); // Remove the error message

        // Remove error-related classes
        inputType.classList.remove('error-border');
        label.classList.remove('error-color');
    }
};