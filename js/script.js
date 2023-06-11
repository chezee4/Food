window.addEventListener("DOMContentLoaded", () => {
  // Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabCountent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabCountent();
  showTabContent();
  tabsParent.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabCountent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer

  const deadline = "2023-08-12";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      second = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
      
      
    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = addZeroToNumber(t.days);
      hours.innerHTML = addZeroToNumber(t.hours);
      minutes.innerHTML = addZeroToNumber(t.minutes);
      second.innerHTML = addZeroToNumber(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
    
    function addZeroToNumber(number){
      return number < 10 ? '0' + number : number;
     } 
  }
  setClock(".timer", deadline);
});
