export const unKebabify = (str) => {
  const words = str.replace(/-/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}
