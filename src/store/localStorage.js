export const throttle = (callback, limit) => {
  let wait = false
  return () => {
    if (!wait) {
      callback.call()
      wait = true
      setTimeout(() => {
        wait = false
      }, limit)
    }
  }
}

export const loadState = id => {
  try {
    const serial = localStorage.getItem(id)
    if (!serial) return null
    return JSON.parse(serial)
  } catch (err) {
    return null
  }
}

export const saveState = state => {
  try {
    const serial = JSON.stringify(state)
    localStorage.setItem(state.id, serial)
  } catch (err) {
    return null
  }
}
