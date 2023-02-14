export function showPlaceholder(nameElement, local='ru-RU') {
    const placeholders = {
        'ru-RU': "[Введите имя]",
        'en-US':'[Enter name]'
    }
    nameElement.placeholder = placeholders[local]
}