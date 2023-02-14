import { showTime } from "./js/showTime";
import { showPlaceholder } from "./js/showPlaceholder";
import { setNameToLocalStorage, getNameFromLocalStorage } from "./js/saveName";
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
const body = document.querySelector("body");

function getRandomNum() {
  return `${Math.ceil(Math.random() * 20)}`.padStart(2, 0);
}

let randomNum = getRandomNum();
const currentTimes = getTimeOfDay();
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
function getTimeOfDay() {
  const times = ["night", "morning", "afternoon", "evening"];
  return times[Math.floor(new Date().getHours() / 6)];
}

function setBg(ranNum, curTimes, tag) {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${curTimes}/${ranNum}.jpg`;
  img.onload = () => (tag.style.backgroundImage = `url(${img.src})`);
}

function getSlideNext() {
  randomNum = randomNum === "20" ? "01" : `${+randomNum + 1}`.padStart(2, 0);
  setBg(randomNum, currentTimes, body);
}

function getSlidePrev() {
  randomNum = randomNum === "01" ? "20" : `${+randomNum - 1}`.padStart(2, 0);
  setBg(randomNum, currentTimes, body);
}

setBg(randomNum, currentTimes, body);
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
