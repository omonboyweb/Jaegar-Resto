export function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
export function getStorage(key) {
    const storageData = JSON.parse(localStorage.getItem(key))
    return storageData || []
}