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

// accordion

const accordionItem = document.querySelectorAll(".accordion-item");
const accordionBtnImg = document.querySelectorAll(".accordion-btn-img");

const accordionControlArray = new Array(accordionItem.length).fill(false);

console.log(accordionItem);

accordionBtnImg.forEach((i, index) =>
  i.addEventListener("click", (event) => {
    if (accordionControlArray[index] == true) {
      accordionControlArray[index] = false;
      accordionItem[index].children[1].classList.remove("open");
      accordionItem[index].style.backgroundColor = "var(--bg-section-lite-green)";
      accordionBtnImg[index].src =
        "/assets/images/icons/accordion_btn_close.svg";
      return;
    }
    accordionControlArray.fill(false);
    accordionControlArray[index] = true;
    accordionItem.forEach((item, btnIndex) => {
      if (accordionControlArray[btnIndex]) {
        item.children[1].classList.add("open");
        item.style.backgroundColor = "var(--light-green)";
        accordionBtnImg[btnIndex].src =
          "/assets/images/icons/accordion_btn_open.svg";
      } else {
        item.children[1].classList.remove("open");
        item.style.backgroundColor = "var(--bg-section-lite-green)";

        accordionBtnImg[btnIndex].src =
          "/assets/images/icons/accordion_btn_close.svg";
      }
    });
  })
);
