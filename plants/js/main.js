console.log(`Самооценка:

1. Верстка 768px - 24

2. Верстка 380px - 24

3. Нет горизонатальной полосы прокрутки - 15

4. Адаптивное меню 22



Итоговая оценка - 75 баллов

`);

// burgerMenu

const menuBtn = document.getElementById('menu-btn')
const navList = document.getElementById('nav-list')
const main = document.getElementById('main')
const navItem = document.querySelectorAll('.nav-item')

function menu() {
    navList.classList.toggle('active-menu')
    menuBtn.classList.toggle('active-btn')
}
    
function hideMenu() {
   
    setTimeout(() => {
        navList.classList.remove('active-menu')
        menuBtn.classList.remove('active-btn')  
   },500)
    
}

menuBtn.addEventListener('click', menu)
main.addEventListener('click', menu)

navItem.forEach(item => {
    item.addEventListener('click', hideMenu)
});