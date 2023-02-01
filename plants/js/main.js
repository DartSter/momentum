console.log(`Самооценка:

1. Верстка 768px - 24

2. Верстка 380px - 24

3. Нет горизонатальной полосы прокрутки - 15

4. Адаптивное меню 22



Итоговая оценка - 75 баллов

`);

// burgerMenu

const menuBtn = document.getElementById("menu-btn");
const navList = document.getElementById("nav-list");
const main = document.getElementById("main");
const navItem = document.querySelectorAll(".nav-item");

function menu() {
  navList.classList.toggle("active-menu");
  menuBtn.classList.toggle("active-btn");
}

function hideMenu() {
  setTimeout(() => {
    navList.classList.remove("active-menu");
    menuBtn.classList.remove("active-btn");
  }, 500);
}

menuBtn.addEventListener("click", menu);
main.addEventListener("click", menu);

navItem.forEach((item) => {
  item.addEventListener("click", hideMenu);
});

//service buttons

const serviceBtns = document.querySelector(".service-controls-btns");
const serviceBtnList = document.querySelectorAll(".service-btn");
const serviceCards = document.querySelectorAll(".service-card");
const serviceCardsControl = {
  garden: false,
  lawn: false,
  planting: false,
};

serviceBtns.addEventListener("click", (event) => {
  let key = event.target.dataset.category;
  event.target.classList.toggle("active-btn");

  serviceCardsControl[key] = !serviceCardsControl[key];
  serviceCards.forEach((item) => {
    const category = item.dataset.category;
    serviceCardsControl[category]
      ? item.classList.remove("blur")
      : item.classList.add("blur");
  });
  if (Object.values(serviceCardsControl).every((i) => !i)) {
    serviceCards.forEach((item) => item.classList.remove("blur"));
  }
  if (Object.values(serviceCardsControl).every((i) => i)) {
    serviceBtnList.forEach((btn) => btn.classList.remove("active-btn"));
    for (category in serviceCardsControl) {
      serviceCardsControl[category] = false;
    }
  }
});
