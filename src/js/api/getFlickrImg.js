import { getTimeOfDay } from "../controlSlider";
const apiKey = "bba5817a068beea4959347491b3adeaf";

function getRandomNum() {
  return `${Math.ceil(Math.random() * 100)}`.padStart(2, 0);
}

export async function getFlickrImg(theme) {
  const tag = theme ? theme : getTimeOfDay();
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const src = await data.photos.photo[getRandomNum()].url_l;
  return src;
}
