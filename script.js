const months = [
    { name: "January", days: 31 },
    { name: "February", days: 28 }, // Adjust for leap years in the function
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 }
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthElement = document.getElementById('month');
const yearElement = document.getElementById('year');
const monthContainer = document.getElementById('month-container');

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function createMonth(name, days, year) {
    const monthDiv = document.createElement('div');
    monthDiv.className = 'month';
    const monthHeader = document.createElement('div');
    monthHeader.className = 'month-header';
    monthHeader.textContent = name;
    monthDiv.appendChild(monthHeader);

    const daysContainer = document.createElement('div');
    daysContainer.className = 'days-container';

    // Adding days of the week headers
    daysOfWeek.forEach(day => {
        const dayOfWeekElement = document.createElement('div');
        dayOfWeekElement.className = 'day-header';
        dayOfWeekElement.textContent = day;
        daysContainer.appendChild(dayOfWeekElement);
    });

    const firstDay = new Date(year, months.findIndex(m => m.name === name), 1).getDay();
    for (let i = 0; i < firstDay; i++) {
        const emptyElement = document.createElement('div');
        emptyElement.className = 'day empty';
        daysContainer.appendChild(emptyElement);
    }

    for (let i = 1; i <= days; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = i;
        daysContainer.appendChild(dayElement);
    }

    if (name === 'February' && isLeapYear(year)) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = 29;
        daysContainer.appendChild(dayElement);
    }

    monthDiv.appendChild(daysContainer);
    return monthDiv;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function renderCalendar(year, monthIndex) {
    monthContainer.innerHTML = '';
    const month = months[monthIndex];
    let daysInMonth = month.days;
    if (month.name === "February" && isLeapYear(year)) {
        daysInMonth += 1; // Add an extra day for leap year
    }
    const monthDiv = createMonth(month.name, daysInMonth, year);
    monthContainer.appendChild(monthDiv);
    monthElement.textContent = month.name;
    yearElement.textContent = year;
}

document.getElementById('prevMonth').addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar(currentYear, currentMonth);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar(currentYear, currentMonth);
});

document.getElementById('prevYear').addEventListener('click', () => {
    currentYear--;
    renderCalendar(currentYear, currentMonth);
});

document.getElementById('nextYear').addEventListener('click', () => {
    currentYear++;
    renderCalendar(currentYear, currentMonth);
});

function initCalendar() {
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    renderCalendar(currentYear, currentMonth);
}

initCalendar();
