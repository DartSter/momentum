export function showGreeting(greetingElement, local = "ru-RU") {
    const data = new Date().getHours();
    const greetings = {
      "ru-RU": ["Доброй ночи", "Доброе утро", "Добрый день", "Добрый вечер"],
      "en-US": ["Good night", "Good morning", "Good afternoon", "Good evening"],
    };
    greetingElement.textContent = greetings[local][Math.floor(data / 6)];
  }