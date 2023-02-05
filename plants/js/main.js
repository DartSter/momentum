console.log(`Самооценка:

1. При нажатии на кнопки:Gardens,Lawn,Planting происходит смена фокуса на услугах в разделе +50

2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50

3. В разделе contacts реализован select с выбором городов +25

Итоговая оценка - 100 баллов

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

accordionBtnImg.forEach((i, index) =>
  i.addEventListener("click", (event) => {
    if (accordionControlArray[index] == true) {
      accordionControlArray[index] = false;
      accordionItem[index].children[1].classList.remove("open");
      accordionItem[index].style.backgroundColor =
        "var(--bg-section-lite-green)";
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

// Contacts table
const contactSelector = document.querySelector('.contact-selector')
const contactSelect = document.querySelector(".contact-select");
const contactValues = {
  Canandaigua: ["Canandaigua, NY", "+1	585	393 0001", "151 Charlotte Street"],
  NewYorkCity: ["New York City", "+1	212	456 0002", "9 East 91st Street"],
  Yonkers: ["Yonkers, NY", "+1	914	678 0003", "511 Warburton Ave"],
  Sherrill: ["Sherrill, NY", "+1	315	908 0004", "14 WEST Noyes BLVD"],
};
const tableValue = document.querySelectorAll(".table-value");
let contactCallBtn = document.querySelector(".contact-call-btn");
const contactImg = document.querySelector(".contact-img");
const contactResult = document.querySelector(".contact-result");

contactSelect.addEventListener('click', event=> contactSelector.classList.toggle('dropdown'))

contactSelect.addEventListener("change", (event) => {
  contactResult.classList.remove("hide");

  tableValue.forEach((tableValue, index) => {
    contactSelector.classList.add('selected-city')
    tableValue.innerHTML = contactValues[event.target.value][index];
  });
  contactCallBtn.href = `tel:${contactValues[event.target.value][1]}`;
  contactSelect.classList.add('active-table-select')
  contactImg.classList.add('active-table-img')
});

console.log(contactSelector)