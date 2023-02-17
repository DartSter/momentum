import { showTime } from "./js/showTime";
import { showPlaceholder } from "./js/showPlaceholder";
import { setLS, getLS } from "./js/controlLocalStorage";
import { setBg, getSlideNext, getSlidePrev } from "./js/controlSlider";
import { getWeather } from "./js/getWeather";
import { qoutes } from "./js/quotes";
import { getQutes } from "./js/getQuotes";
const lang = "en-US";

// time, date and greeting

const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");

showTime(time, date, greeting, lang);

// name placeholder

const name = document.querySelector(".name");
if (!localStorage.getItem("name")) showPlaceholder(name, lang);
name.addEventListener("change", (event) => {
  if (!event.target.value) {
    showPlaceholder(name, lang);
  }
});

// slider

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

setBg();
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

// weather widget

const city = "%D0%9C%D0%B8%D0%BD%D1%81%D0%BA";
let language = "ru";
const cityInput = document.querySelector(".city");

getWeather(city, language);

// weather placeholder

cityInput.placeholder = lang === "ru-RU" ? "Минск" : "Minsk";
cityInput.addEventListener("change", (e) => {
  e.target.value
    ? getWeather(e.target.value, language)
    : getWeather(city, language);
});

// quotes

const quote = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const changeQoute = document.querySelector('.change-quote')



getQutes(quote, quoteAuthor, lang ,qoutes)
changeQoute.addEventListener('click', () => {
  getQutes(quote, quoteAuthor, lang ,qoutes)
})


// add elements to local storage

function setLocalStorage() {
  //add name
  setLS("name",name);
  //add city
  setLS("city",cityInput);
}

window.addEventListener("beforeunload", setLocalStorage);

// get elements from local storage

function getLocalStorage() {
  //get name
  getLS("name", name);
  //get city
  getLS("city", cityInput);
}

window.addEventListener("load", getLocalStorage);
