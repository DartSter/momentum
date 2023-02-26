const langTitle = document.querySelector(".language-title");
const imageApiTitle = document.querySelector(".image-api-title");
const appSelectTitle = document.querySelector(".app-select");
const selectedList = document.querySelector(".selected-list");
const toggleAppBtns = selectedList.querySelectorAll(".setting-item");
const btnsTranslateOptions = {
  time: ["Time", "Время"],
  date: ["Date", "Дата"],
  "greeting-container": ["Greeting", "Приветствие"],
  "quote-container": ["Quotes", "Цитаты"],
  weather: ["Weather", "Погода"],
  player: ["Player", "Плеер"],
  "todolist-container": ["ToDoList", "Список дел"],
};

export function translateMenu(language) {
  langTitle.textContent =
    language === "en-US" ? "Change language" : "Поменять язык";
  imageApiTitle.textContent =
    language === "en-US" ? "Image source" : "Источник изображения";
  appSelectTitle.textContent =
    language === "en-US" ? "Visible apps" : "Активные приложения";

  toggleAppBtns.forEach((i) => {
    i.textContent =
      language === "en-US"
        ? btnsTranslateOptions[i.dataset.block][0]
        : btnsTranslateOptions[i.dataset.block][1];
  });
}
