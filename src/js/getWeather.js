const weatherApiKay = `377b8386dd1eb3af7f7770726f59ece1`;
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");

export async function getWeather(c, l) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${c}&lang=${l}&appid=${weatherApiKay}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}
