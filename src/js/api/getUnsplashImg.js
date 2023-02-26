import { getTimeOfDay } from "../controlSlider";

const apiKey = "FdC5DssuHcxoiXyZAuJAaWOfpJd0IDXYO28ZguY7-Lw";

export async function getUnsplashImg(theme) {
  const tag = theme ? theme : getTimeOfDay();
  const url = `https://api.unsplash.com/photos/random?query=${tag}&client_id=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  const src = await data.urls.regular;
  return src;
}
