window.onload = function () {
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

  //Crear objeto date con la fecha completa
  let date = new Date();

  //Coger el dia del mes actual
  let currentDay = date.getDate();

  //Coger el numero del mes actual 0-11 0(Enero) , 11(Diciembre)
  let currentMonth = date.getMonth();

  //Coger el año actual de la fecha ->> integer
  let currentYear = date.getFullYear();

  //Elments html to JS
  const calendarDaysCont = document.getElementById("calendarDays");
  const calendarMonthCont = document.getElementById("calendarHeadMonth");
  const calendarYearCont = document.getElementById("calendarHeadYear");
  const nextBtn = document.getElementById("calendarHeadNext");
  const prevBtn = document.getElementById("calendarHeadPrev");

  //Store the month and the year
  let month = arrayMonths[currentMonth];
  let year = currentYear.toString();

  //Add the current month and year to html actual
  calendarMonthCont.textContent = month;
  calendarYearCont.textContent = year;

  //Add events
  nextBtn.addEventListener("click", nextDate);
  prevBtn.addEventListener("click", prevDate);

  // Next month and previous month functions
  function nextDate() {
    if (currentMonth !== 11) {
      currentMonth++;
    } else {
      currentMonth = 0;
      currentYear++;
    }
    setNewDate();
  }
  function prevDate() {
    if (currentMonth !== 0) {
      currentMonth--;
    } else {
      currentMonth = 11;
      currentYear--;
    }
    setNewDate();
  }
  //Erase the days in the container to show new one one next or on previous
  function eraseContainer() {
    calendarDaysCont.textContent = "";
  }
  //Set the new date on the container and write days
  function setNewDate() {
    calendarMonthCont.textContent = arrayMonths[currentMonth];
    calendarYearCont.textContent = currentYear.toString();
    eraseContainer();
    writeDays(currentMonth);
  }

  //Get total days depending on the month
  function getTotalDays() {
    if (
      currentMonth === 0 ||
      currentMonth === 2 ||
      currentMonth === 4 ||
      currentMonth === 6 ||
      currentMonth === 7 ||
      currentMonth === 9 ||
      currentMonth === 11
    ) {
      return 31;
    } else if (
      currentMonth === 3 ||
      currentMonth === 5 ||
      currentMonth === 8 ||
      currentMonth === 10
    ) {
      return 30;
    } else {
      return isLeap() ? 29 : 28;
    }
  }
  //Function to write all the days
  function writeDays(month) {
    console.log(getTotalDays(month));
    for (let i = dayStart(); i > 0; i--) {
      calendarDaysCont.innerHTML += `  <div class="calendar__days__item" style = "color : gray;">${
        getTotalDays(currentMonth - 1) - (i - 1)
      }</div>`;
    }
    for (let index = 0; index < getTotalDays(month); index++) {
      calendarDaysCont.innerHTML += `  <div class="calendar__days__item">${
        index + 1
      }</div>`;
    }
  }
  //Check if is it bisiesto
  function isLeap() {
    return (
      (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
      currentYear % 400 === 0
    );
  }
  function dayStart() {
    let start = new Date(currentYear, currentMonth, 1);
    if (start.getDay() - 1 === -1) {
      return 6;
    } else {
      return start.getDay() - 1;
    }
  }
  writeDays(currentMonth);
};
