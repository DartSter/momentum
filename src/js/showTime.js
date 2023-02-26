import { showDate } from "./showDate";
import { showGreeting } from "./showGreeting";

export function showTime(timeElement, dateElement, greetingElement, local) {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeElement.textContent = currentTime;
  showDate(dateElement, local);
  showGreeting(greetingElement, local);
  setTimeout(
    showTime,
    1000,
    timeElement,
    dateElement,
    greetingElement,
    local
  );
  
}
