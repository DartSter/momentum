export function setCityToLocalStorage(cityElement) {
    localStorage.setItem("city", cityElement.value);
  }
  
export  function getCityFromLocalStorage(storageName, cityElement) {
    if (localStorage.getItem(storageName)) {
        cityElement.value = localStorage.getItem(storageName);
    }
  }