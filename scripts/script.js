// import{}
//GLOBAL VARIABLES
//GET CURRENT DATE AND DAYS OF MONTH
//Create object date , get current full date
const date = new Date();
//Get current month
let month = date.getMonth();
//get current year
let year = date.getFullYear();
//Container tu put all the days
const calendarDays = document.getElementById("calendarDays");

//ON LOAD WINDOW FUNCTION
window.onload = () => {
  //Add current year and month
  printDaysCalendar();
  addNewDatesText();
};

//GET DAYS IN MONTH
function getDaysMonth(year, month) {
  const numDays = new Date(year, month + 1, 0).getDate();
  return numDays;
}

//PRINT DAYS EN CALENDAR
function printDaysCalendar() {
  const numDays = getDaysMonth(year, month);
  calendarDays.textContent = "";
  getStartDay();
  //Container to put the year
  for (let i = 0; i < numDays; i++) {
    let day = document.createElement("li");
    day.textContent = i + 1;
    day.className = "calendar__day__item";
    calendarDays.appendChild(day);
  }
}

//ADD CURRENT MONTH AND CURRENT YEAR TO TEXT
function addNewDatesText() {
  const monthContainer = document.getElementById("calendarMonth");
  const yearContainer = document.getElementById("calendarYear");
  const monthName = getNameMonth();
  const yearName = year.toString();
  monthContainer.textContent = monthName;
  yearContainer.textContent = yearName;
  printDaysCalendar();
}
//GET THE NAME OF THE MONTH
function getNameMonth() {
  //Transform the number of the month by the name of the month
  const arrayMonths = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const monthName = arrayMonths[month];
  return monthName;
}
//NEXT AND PREV
function nextDate() {
  if (month !== 11) {
    month++;
    console.log(month);
  } else {
    year++;
    month = 0;
    console.log(`Year: ${year} ---- Month: ${month}`);
  }
  addNewDatesText();
}

function prevDate() {
  if (month !== 0) {
    month--;
    console.log(month);
  } else {
    year--;
    month = 11;
    console.log(`Year: ${year} ---- Month: ${month}`);
  }
  addNewDatesText();
}

//START DAY IN MONTH
function getStartDay() {
  // let startDay;
  // dayIndex === -1 ? (startDay = 6) : (startDay = dayIndex);
  //Get start day position (0 - Monday) - (6 - Sunday)of the month/year specify
  const dayIndex = new Date(year, month, 0).getDay();
  let daysPrevMonth = getDaysMonth(year, month - 1) - dayIndex;
  daysPrevMonth++;
  /*Add at the begining the days of the previous month*/
  for (let i = 0; i < dayIndex; i++) {
    let day = document.createElement("li");
    day.textContent = daysPrevMonth++;
    day.className = "calendar__day__item-bloqued";
    calendarDays.appendChild(day);
  }
}
//event data 
let eventData = {
  key: '',
  title: '',
  date: [],
  endDate: [],
  remainder: '',
  description: '',
  type: ''
  }

//modal verification
const createEvent = document.getElementById("form__header-btn-create");

const formInputs = document.querySelectorAll(".input");

const inputStatus = {
  title: false,
  time: false,
};
const checkInputexpression = {
  title: /^(?=.{1,60}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9]+(?<![_.])$/g,
  time: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d(?:\.\d+)?Z?/g,
};

formInputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    updateInputs(e);
  });
});

createEvent.addEventListener("click", (event) => {
  event.preventDefault();
  if (Object.values(inputStatus).every((item) => item === true)) {
    //add data in object
    console.log("Set form data in Object");
    console.log(Object.values(inputStatus));
  }
});

function updateInputs(e) {
  const currentInput = e.target;

  const isValid = new RegExp(
    checkInputexpression[currentInput.dataset.type]
  ).test(currentInput.value);

  if (!currentInput.value.length == 0 && isValid) {
    inputStatus[currentInput.dataset.type] = isValid;
    document.getElementById(currentInput.id).classList.remove("requiredInput");
  } else {
    inputStatus[currentInput.dataset.type] = isValid;
    document.getElementById(currentInput.id).classList.add("requiredInput");
  }
}


