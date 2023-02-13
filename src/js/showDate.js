export function showDate(dateElement, local = "ru-RU") {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const currentDate = date.toLocaleDateString(local, options);
  dateElement.textContent = currentDate;
}
