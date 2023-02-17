export function setLS(storageName, documentElement) {
  localStorage.setItem(storageName, documentElement.value);
}

export function getLS(storageName, documentElement) {
  if (localStorage.getItem(storageName)) {
    documentElement.value = localStorage.getItem(storageName);
  }
}
