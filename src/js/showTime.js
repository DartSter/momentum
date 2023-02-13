import { showDate } from "./showDate";

export function showTime(timeElement, dateElement, local) {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeElement.textContent = currentTime;
  showDate(dateElement, local);
  setTimeout(showTime, 1000, timeElement, dateElement, local);
}
