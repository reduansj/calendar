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

//!ON LOAD WINDOW FUNCTION
window.onload = () => {
  //Add current year and month
  printDaysCalendar();
  addNewDatesText();
  addEventsDay();
};

//!GET DAYS IN MONTH
function getDaysMonth(year, month) {
  const numDays = new Date(year, month + 1, 0).getDate();
  return numDays;
}

//!PRINT DAYS EN CALENDAR
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

//!ADD CURRENT MONTH AND CURRENT YEAR TO TEXT
function addNewDatesText() {
  const monthContainer = document.getElementById("calendarMonth");
  const yearContainer = document.getElementById("calendarYear");
  const monthName = getNameMonth();
  const yearName = year.toString();
  monthContainer.textContent = monthName;
  yearContainer.textContent = yearName;
  printDaysCalendar();
}
//!GET THE NAME OF THE MONTH
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
//!NEXT AND PREV
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

//!START DAY IN MONTH
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
//!CHECKBOX DISPLAY FIELDSET
const endCheckBox = document.getElementById("addEndDate");
const remainderCheckbox = document.getElementById("addRemainder");
const fieldsetEndDate = document.getElementById("endDateContainer");
const reminderContainer = document.getElementById("remainderContainer");
//add event to the checkbox
endCheckBox.addEventListener("change", () => {
  togleClases(fieldsetEndDate, "hide__element", "show__element");
});
remainderCheckbox.addEventListener("change", () => {
  togleClases(reminderContainer, "hide__element", "show__element");
});

//!SAVE FUNCTION/ VERIFICATION FORM
//Get all the inputs of the form
const title = document.getElementById("title");
const initialDate = document.getElementById("initialDate");
const endDate = document.getElementById("endDate");
const description = document.getElementById("description");
const eventType = getSelectedOption("eventType");
const reminderTime = getSelectedOption("remainderTime");

//Get save btn and do the event
const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //Returned value of the function as a boolean
  let titleValue = checkTitle(title.value);
  let initialDateValue = checkDate(initialDate.value);
  let descriptionValue = checkDescription(description.value);
  //If all the inputs are true is OK / verification its OK
  if (titleValue && initialDateValue && descriptionValue) {
    console.log("OK");
    storeLocalStorage();
  } else {
    console.log("ERROR");
  }
});

//Check title input
function checkTitle(title) {
  if (title.length > 60) {
    console.log("Max 60 character");
    return false;
  } else if (title.length === 0) {
    console.log("This field is required");
    return false;
  } else {
    console.log("OK");
    return true;
  }
}
//Check date input
function checkDate(date) {
  if (date.length === 0) {
    console.log("This field is required");
    return false;
  } else {
    console.log("OK");
    return true;
  }
}
//Check description textarea
function checkDescription(description) {
  if (description.length > 500) {
    console.log("Max 500 character");
    return false;
  } else if (description.length === 0) {
    console.log("This field is required");
    return false;
  } else {
    console.log("OK");
    return true;
  }
}

//!CLASS TO CREATE OBJECTS
//Save in local storage and array of objects
//Create a class to create multiple objects from this class
class CalendarEvent {
  //Atributes of the class
  constructor(title, initialDate, endDate, reminder, description, eventType) {
    this.title = title;
    this.initialDate = initialDate;
    this.endDate = endDate;
    this.reminder = reminder;
    this.description = description;
    this.eventType = eventType;
  }
}

//!GET SELECTED OPTION FROM SELECT
function getSelectedOption(selectElement) {
  return document.getElementById(selectElement).value;
}

//!STORE IN LOCAL STORAGE
function storeLocalStorage() {
  //Create calendar event object
  const event = new CalendarEvent(
    title.value,
    initialDate.value,
    endDate.value,
    reminderTime,
    description.value,
    eventType
  );
  //Array of objects to store the CalencdarEvent object
  const eventsArray = [];
  //If localStorage have content do a for to store the values in array objects
  if (localStorage.length > 0) {
    const arrObj = JSON.parse(localStorage.getItem("event"));
    for (const obj of arrObj) {
      console.log(obj);
      eventsArray.push(obj);
    }
  }
  //Push the new object to array of objects
  eventsArray.push(event);
  //Add the array of objects to the localStorage
  localStorage.setItem("event", [JSON.stringify(eventsArray)]);
}

//!DISPLAY MODAL

//*SHOW MODAL
//get the modal container
const modalContainer = document.getElementById("modalContainer");
//get button to show modal
const showModalBtn = document.getElementById("showModal");
//Add event to display modal
showModalBtn.addEventListener("click", () => {
  //Togle if exist class remove i doesnt exist add
  togleClases(modalContainer, "hide__element", "show__element");
});

//Class toggle between clases hide/show element
function togleClases(element, classElemHide, classElemShow) {
  element.classList.toggle(classElemHide);
  element.classList.toggle(classElemShow);
}

//*HIDE MODAL
//Cancel Button
const cancelBtn = document.getElementById("cancelBtn");
//X button
const closeBtn = document.getElementById("closeBtn");
//Events to close modal

cancelBtn.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

function closeModal(e) {
  e.preventDefault();
  togleClases(modalContainer, "hide__element", "show__element");
}

//*GENERAL CONTAINER CLOSE
modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    togleClases(modalContainer, "hide__element", "show__element");
  }
});

//*ESC KEY close
//Escape button to close modal
//Event keyup when you  release the escape
document.addEventListener("keyup", escCloseModal);
function escCloseModal(e) {
  //only do the event if modal container is displayed and the key is Esc
  if (
    modalContainer.classList.contains("show__element") &&
    e.key === "Escape"
  ) {
    togleClases(modalContainer, "hide__element", "show__element");
  }
}

//!
function addEventsDay() {
  const getDayEvent = document.querySelectorAll(".calendar__day__item");
  for (const e of getDayEvent) {
    e.addEventListener("click", (e) => {
      console.log(e.target);
    });
  }
}
