import { showTime } from "./js/showTime";
import { showPlaceholder } from "./js/showPlaceholder";
import { setNameToLocalStorage, getNameFromLocalStorage } from "./js/saveName";
import { setBg, getSlideNext, getSlidePrev } from "./js/controlSlider";
const leng = "ru-RU";

// time, date and greeting

const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");

showTime(time, date, greeting, leng);

// name placeholder

const name = document.querySelector(".name");
if (!localStorage.getItem("name")) showPlaceholder(name, leng);
name.addEventListener("change", (even) => {
  if (!even.target.value) {
    showPlaceholder(name, leng);
  }
});

// slider

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

setBg();
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

/// add elements to local storage

function setLocalStorage() {
  setNameToLocalStorage(name);
}

window.addEventListener("beforeunload", setLocalStorage);

/// get elements from local storage

function getLocalStorage() {
  getNameFromLocalStorage("name", name);
}

window.addEventListener("load", getLocalStorage);
