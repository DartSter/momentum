export function setNameToLocalStorage(nameElement) {
    localStorage.setItem("name", nameElement.value);
  }
  
export  function getNameFromLocalStorage(storageName, nameElement) {
    if (localStorage.getItem(storageName)) {
      nameElement.value = localStorage.getItem(storageName);
    }
  }