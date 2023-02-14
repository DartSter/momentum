import { showTime } from "./js/showTime";
import { showPlaceholder } from "./js/showPlaceholder";
import { setNameToLocalStorage, getNameFromLocalStorage } from "./js/nameLocalStorage";
const leng = "ru-RU";

// time, date and greeting

const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");

showTime(time, date, greeting, leng);

// name placeholder

const name = document.querySelector(".name");
showPlaceholder(name, leng);







/// add elements to local storage

function setLocalStorage() {
  setNameToLocalStorage(name);
}

window.addEventListener('beforeunload', setLocalStorage)

/// get elements from local storage

function getLocalStorage() {
    getNameFromLocalStorage('name', name)
}

window.addEventListener('load', getLocalStorage)