export const saveState = (key, value) => {
  try {
    const serializedState = JSON.stringify(value)
    localStorage.setItem(key, serializedState)
  } catch (err) { }
}

export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key)
    return (serializedState === null)
      ? undefined
      : JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}
