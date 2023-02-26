import { getUnsplashImg } from "./api/getUnsplashImg";
import { getFlickrImg } from "./api/getFlickrImg";

const body = document.querySelector("body");
let randomNum = getRandomNum();

function getRandomNum() {
  return `${Math.ceil(Math.random() * 20)}`.padStart(2, 0);
}

const currentTimes = getTimeOfDay();
export function getTimeOfDay() {
  const times = ["night", "morning", "afternoon", "evening"];
  return times[Math.floor(new Date().getHours() / 6)];
}

function getGithubImg() {
  return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTimes}/${randomNum}.jpg`;
}

const apiSources = {
  github: getGithubImg,
  unsplash: getUnsplashImg,
  flickr: getFlickrImg,
};

export async function setBg(source = "github", theme = currentTimes) {
  const img = new Image();
  img.src = await apiSources[source](theme);
  img.onload = () => (body.style.backgroundImage = `url(${img.src})`);
}

export async function getSlideNext(source = "github", theme = currentTimes) {
  if (source === "github") {
    randomNum = randomNum === "20" ? "01" : `${+randomNum + 1}`.padStart(2, 0);
    setBg(source);
  } else setBg(source, theme);
}

export async function getSlidePrev(source = "github", theme = currentTimes) {
  if (source === "github") {
    randomNum = randomNum === "01" ? "20" : `${+randomNum - 1}`.padStart(2, 0);
    setBg((source));
  } else setBg(source, theme);
}
