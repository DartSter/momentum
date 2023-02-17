export function getQutes(quo, author, lang, quotesArray) {
    const quotesArr = quotesArray[lang];
    const randomNum = Math.floor(Math.random()*quotesArr.length) 
    quo.textContent = quotesArr[randomNum][0]
    author.textContent=quotesArr[randomNum][1]
  
  }