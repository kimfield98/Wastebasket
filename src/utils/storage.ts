export const setLocalStorageValue = <T>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return
  }
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageValue = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") {
    return defaultValue
  }
  const storedValue = localStorage.getItem(key)
  return storedValue ? (JSON.parse(storedValue) as T) : defaultValue
}
