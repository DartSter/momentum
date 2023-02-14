const body = document.querySelector("body");
let randomNum = getRandomNum();

function getRandomNum() {
  return `${Math.ceil(Math.random() * 20)}`.padStart(2, 0);
}

const currentTimes = getTimeOfDay();
function getTimeOfDay() {
  const times = ["night", "morning", "afternoon", "evening"];
  return times[Math.floor(new Date().getHours() / 6)];
}

export function setBg() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTimes}/${randomNum}.jpg`;
  img.onload = () => (body.style.backgroundImage = `url(${img.src})`);
}

export function getSlideNext() {
  randomNum = randomNum === "20" ? "01" : `${+randomNum + 1}`.padStart(2, 0);
  setBg();
}

export function getSlidePrev() {
  randomNum = randomNum === "01" ? "20" : `${+randomNum - 1}`.padStart(2, 0);
  setBg();
}