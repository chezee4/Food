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

  const deadline = "2023-08-01";

  function getTimeRemaining(endtime) {
    let [days, hours,minutes,seconds] = [0,0,0,0];
    const t = Date.parse(endtime) - Date.parse(new Date());
         if (t>0) {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);}
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  const addZeroToNumber = (number) =>{return number>=0 && number < 10 ? '0' + number : number;};
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      second = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
      
      updateClock();
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
      
  }
  setClock(".timer", deadline);

  // Modal 

   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal'),
         modalCloseBtn = document.querySelector('[data-close]'),
         openModal = () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
           };


         modalTrigger.forEach(btn =>{
          btn.addEventListener('click', openModal);
         });
           
            const closeModal = () => {
              modal.classList.add('hide');
              modal.classList.remove('show');
              document.body.style.overflow = '';
            };
         modalCloseBtn.addEventListener('click', closeModal);
         
        

         modal.addEventListener('click', (e)=>{
          if(e.target === modal){
            closeModal();
          }
         });


         document.addEventListener('keydown', (e) => {
               if(e.code === "Escape" && modal.classList.contains('show')){
                closeModal();
               }
         });

         const modalTimerId = setTimeout(openModal ,15000);


         const showModalByScroll = () => {
          if(window.pageYOffset + document.documentElement.clientHeight >=document.documentElement.scrollHeight - 1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
          }
         };

         window.addEventListener('scroll', showModalByScroll);
         // Використовую класи для карточок 

         class MenuCard{
          constructor(scr,alt,title,descr,price,parentSelector, ...classes){
            this.scr = scr;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changToUAH();
          }
          changToUAH(){
              this.price *=this.transfer; 
          }
          render(){
              const element = document.createElement('article');
              if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(element);
              }else{
                 this.classes.forEach(className => element.classList.add(className));
              }
             
              element.innerHTML = `
                  <img src=${this.scr} alt=${this.alt} />
                  <h4 class="menu__item-subtitle">${this.title}</h4>
                  <p class="menu__item-descr">
                  ${this.descr}
                  </p>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                    <p class="menu__item-cost">Цена:</p>
                    <p class="menu__item-total">
                      <span class="price">${this.price}</span> <span>грн/день</span>
                    </p>
                  </div>
                `;
                this.parent.append(element);
          }
         }

         new MenuCard(
          "img/tabs/vegy.jpg",
          "vegy",
          'Меню "Фитнес"',
          ' Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
          8,
          '.menu .container',
          'menu__item',
          'big'
         ).render();
         new MenuCard(
          "img/tabs/elite.jpg",
          "elite",
          'Меню “Премиум"',
          'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
          20,
          '.menu .container',
          'menu__item',
         ).render();
         new MenuCard(
          "img/tabs/post.jpg",
          "post",
          'Меню "Постное"',
          'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
          16,
          '.menu .container',
          'menu__item',
         ).render();
});
