// import{}
//GLOBAL VARIABLES
//GET CURRENT DATE AND DAYS OF MONTH
//Create object date , get current full date
const date = new Date();
let day = date.getDate();
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
  //Format date with correspondent 0
  let formatMonth;
  let formatDay;
  month < 10 ? (formatMonth = `0${month + 1}`) : (formatMonth = month + 1);
  //Container to put the year
  for (let i = 0; i < numDays; i++) {
    i + 1 < 10 ? (formatDay = `0${i + 1}`) : (formatDay = i + 1);
    let day = document.createElement("div");
    day.setAttribute("data-date", `${year}-${formatMonth}-${formatDay}`);
    day.textContent = i + 1;
    day.className = "calendar__day__item";
    calendarDays.appendChild(day);
    addEventsToCalendar(day.dataset.date, day);
  }
  //add events to all the days
  addEventsDay();
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
  } else {
    year++;
    month = 0;
  }
  addNewDatesText();
}

function prevDate() {
  if (month !== 0) {
    month--;
  } else {
    year--;
    month = 11;
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
    let day = document.createElement("div");
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
const initialTime = document.getElementById("initialTime");
const endTime = document.getElementById("endTime");
const initialErrorMsg = document.getElementById("initialDateErrorMsg");
const endErrorMsg = document.getElementById("endDateErrorMsg");

//Get save btn and do the event
const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //Returned value of the function as a boolean
  let titleValue = checkTitle(title.value);
  let initialDateValue = checkDate(initialDate.value);
  let descriptionValue = checkDescription(description.value);
  let endDateValue = false;
  if (endCheckBox.checked) {
    endDateValue = checkEndDate(endDate.value);
  }

  //If all the inputs are true is OK / verification its OK
  if (titleValue && initialDateValue && descriptionValue && !endDateValue) {
    storeLocalStorage();
    printDaysCalendar();
    if (endCheckBox.checked) {
      calcTimeBetweenDates(initialDate.value, endDate.value);
    }
    closeModal();
  } else {
  }
});

//Check title input
function checkTitle(title) {
  if (title.length > 60) {
    return false;
  } else if (title.length === 0) {
    return false;
  } else {
    return true;
  }
}
//Check date input
function checkDate(date) {
  //Convert the date data in to an array.
  const arrayDate = date.split("-");
  let compareDate =
    new Date(arrayDate[0], arrayDate[1], arrayDate[2]).getTime() <
    new Date(year, month + 1, day).getTime();
  if (date.length === 0 || compareDate) {
    initialErrorMsg.classList.remove("hide__element");
    initialErrorMsg.classList.add("show__element");
    return false;
  }
  //Check the current day and compare to the current date.
  else {
    initialErrorMsg.classList.add("hide__element");
    initialErrorMsg.classList.remove("show__element");
    return true;
  }
}
function checkEndDate(date) {
  //Convert the date data in to an array.
  const arrayDate = date.split("-");
  let compareDate =
    new Date(arrayDate[0], arrayDate[1], arrayDate[2]).getTime() <
    new Date(year, month + 1, day).getTime();
  if (date.length === 0 || compareDate) {
    endErrorMsg.classList.remove("hide__element");
    endErrorMsg.classList.add("show__element");
    return true;
  }
  //Check the current day and compare to the current date.
  else {
    endErrorMsg.classList.add("hide__element");
    endErrorMsg.classList.remove("show__element");
    return false;
  }
}

//Check description textarea
function checkDescription(description) {
  if (description.length > 500) {
    return false;
  } else if (description.length === 0) {
    return false;
  } else {
    return true;
  }
}

//!CALCULATE TIME BETWEEN DATES
function calcTimeBetweenDates(initialDate, endDate) {
  const arrayInitialDate = initialDate.split("-");
  const arrayEndDate = endDate.split("-");
  let timeBetween =
    new Date(arrayEndDate[0], arrayEndDate[1], arrayEndDate[2]).getTime() -
    new Date(
      arrayInitialDate[0],
      arrayInitialDate[1],
      arrayInitialDate[2]
    ).getTime();
  let daysBetween = timeBetween / (1000 * 3600 * 24);
}

//!CLASS TO CREATE OBJECTS
//Save in local storage and array of objects
//Create a class to create multiple objects from this class
class CalendarEvent {
  //Atributes of the class
  constructor(
    id,
    title,
    initialDate,
    initialTime,
    endDate,
    endTime,
    reminder,
    description,
    eventType
  ) {
    this.id = id;
    this.title = title;
    this.initialDate = initialDate;
    this.initialTime = initialTime;
    this.endDate = endDate;
    this.endTime = endTime;
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
  const eventType = getSelectedOption("eventType");
  const reminderTime = getSelectedOption("remainderTime");
  //Create calendar event object
  const event = new CalendarEvent(
    "",
    title.value,
    initialDate.value,
    initialTime.value,
    endDate.value,
    endTime.value,
    reminderTime,
    description.value,
    eventType
  );
  //Array of objects to store the CalencdarEvent object
  const eventsArray = [];
  //If localStorage have content do a for to store the values in array objects
  if (localStorage.getItem(initialDate.value) !== null) {
    const arrObj = JSON.parse(localStorage.getItem(initialDate.value));
    for (const obj of arrObj) {
      eventsArray.push(obj);
    }
  }
  //Push the new object to array of objects
  eventsArray.push(event);
  event.id = Math.random().toString(16).slice(2);
  //Add the array of objects to the localStorage
  localStorage.setItem(initialDate.value, [JSON.stringify(eventsArray)]);
}

//!DISPLAY MODAL

//*SHOW MODAL
//get the modal container
const modalContainer = document.getElementById("modalContainer");
//get button to show modal
const showModalBtn = document.getElementById("showModal");
//Add event to display modal
showModalBtn.addEventListener("click", showModal);

function showModal(e) {
  e.stopPropagation();
  //Togle if exist class remove i doesnt exist add

  if (e.target.id === "showModal") {
    initialDate.disabled = false;
  } else {
    initialDate.disabled = true;
  }
  togleClases(modalContainer, "hide__element", "show__element");
}

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
  // e.preventDefault();
  togleClases(modalContainer, "hide__element", "show__element");
  resetValuesForm();
}

//*GENERAL CONTAINER CLOSE
modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    togleClases(modalContainer, "hide__element", "show__element");
    resetValuesForm();
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
    resetValuesForm();
  }
}

//!RESET VALUES INPUT
function resetValuesForm(e) {
  const input = modalContainer.querySelectorAll("input");
  modalContainer.querySelector("textarea").value = "";
  for (const elem of input) {
    if (elem.type !== "checkbox") {
      elem.value = "";
    } else if (elem.checked) {
      elem.checked = false;
    }
  }
  if (fieldsetEndDate.classList.contains("show__element")) {
    togleClases(fieldsetEndDate, "hide__element", "show__element");
  }
  if (reminderContainer.classList.contains("show__element")) {
    togleClases(reminderContainer, "hide__element", "show__element");
  }
}

//! GENERATE EVENT FOR EACH DAY IN CALENDAR
function addEventsDay() {
  const getDayEvent = document.querySelectorAll("[data-date]");
  for (const e of getDayEvent) {
    e.addEventListener("click", showModalClickDay);
  }
}

//!SHOW MODAL ON CLICK IN CALENDAR
function showModalClickDay(e) {
  if (e.target.className !== "showEvents") {
    const date = e.target.dataset.date;
    initialDate.value = date;
    showModal(e);
  }
}

//!ADD EVENTS TO THE CALENDAR
function addEventsToCalendar(key, element) {
  const dayData = JSON.parse(localStorage.getItem(key));
  if (dayData !== null) {
    //22-02-03 = e.title ,e.description...
    const eventTitle = document.createElement("button");
    eventTitle.textContent = "SHOW EVENT";
    eventTitle.className = "showEvents";
    eventTitle.dataset.dateBtn = element.dataset.date;
    element.appendChild(eventTitle);
    eventTitle.addEventListener("click", showEventsContainer);
  }
}

//!SHOW CONTAINER OF TITLE EVENTS
function showEventsContainer(e) {
  const date = e.target.dataset.dateBtn;
  //Get items from localStorage from the date passed of the btn showEvents
  const dateData = JSON.parse(localStorage.getItem(date));
  //Container with all title text events
  const eventContainerTitle = document.getElementById("eventContainerTitle");
  //Iterate all the events of the date given from localStorage
  for (const event of dateData) {
    //event.title , event1.title
    //Create element div for every event on that day
    const titleContainer = document.createElement("div");
    titleContainer.textContent = event.title;
    titleContainer.className = "event__title__div";
    titleContainer.id = Math.random().toString(16).slice(2);
    //Add a event to the div created for every event on that date
    titleContainer.addEventListener("click", (e) => {
      //pass the event example:
      /*
      event{
      title: Peluquero
      initialDate: 2022-05-03
      reminder: 5
      description: Ir al peluquero
      eventType: other
    }
      */
      showEventData(event, e.target.id);
    });
    //Append the div inside general container that stores all events title
    eventContainerTitle.appendChild(titleContainer);
  }
  //Show the container with all the events
  togleClases(eventContainerTitle, "hide__element", "show__element");
}

//!Show events info
//Displays the event information
function showEventData(event, eventId) {
  const eventInfo = document.getElementById("eventsInfo");
  //Clear the section for every day event
  eventInfo.textContent = "";
  //Create a container for every event add className and Id
  const eventInfoContainer = document.createElement("div");
  eventInfoContainer.className = "event__info__Container";
  eventInfoContainer.id = "eventInfoContainer";
  //Create button to close the event container
  const closeEventInfo = document.createElement("button");
  closeEventInfo.textContent = "X";
  eventInfo.appendChild(closeEventInfo);
  //Event Listener to show the Event Data
  closeEventInfo.addEventListener("click", () => {
    togleClases(eventInfo, "hide__element", "show__element");
  });
  //Get all the entries of the object {entries -> key & value}
  //iteration to get key and value
  for (const [key, value] of Object.entries(event)) {
    //Only print if value has something
    if (value !== "" && key !== "id") {
      //Create paragraphs for every key and value from every event in local storage
      const eventData = document.createElement("p");
      eventData.className = "events__info-text";
      eventData.textContent = `${key}: ${value}`;
      eventInfoContainer.appendChild(eventData);
    }
  }
  //Create button for removing the content in local storge
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "deleteEvent";
  eventInfoContainer.appendChild(deleteBtn);
  eventInfo.appendChild(eventInfoContainer);
  //Event for removing values in local storage
  deleteBtn.addEventListener("click", (e) => {
    deleteEvent(event, eventInfo, eventId);
  });
  //Toggel class showing event info
  togleClases(eventInfo, "hide__element", "show__element");
}

//!DELETE CALENDAR EVENTS
function deleteEvent(currentEvent, eventInfo, eventId) {
  //get data from localStorage for the current day
  const arrayObjEvents = JSON.parse(
    localStorage.getItem(currentEvent.initialDate)
  );
  //Iterate in every event inside the day
  let pos = 0;
  for (const event of arrayObjEvents) {
    //Check the current position in the array if matches with the target.id
    if (event.id === currentEvent.id) {
      //Delete the object inside the array
      arrayObjEvents.splice(pos, 1);
    }
    pos++;
  }
  //If its any remainded data bring it back to localStorage
  if (arrayObjEvents.length > 0) {
    const arrayObjString = JSON.stringify(arrayObjEvents);
    localStorage.setItem(currentEvent.initialDate, arrayObjString);
  }
  //If there is no remainded data remove the event from the calendar
  else {
    localStorage.removeItem(currentEvent.initialDate);
    const removeBtn = document.querySelector(
      `[data-date-btn="${currentEvent.initialDate}"]`
    );
    removeBtn.remove();
  }
  //Remove the current event that trigged the function
  const removeTitleContainer = document.getElementById(`${eventId}`);
  removeTitleContainer.remove();
  //Toggel class to hide  event info
  togleClases(eventInfo, "hide__element", "show__element");
}

