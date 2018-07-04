export const joinClass = (...classList) =>
  classList
    .reduce((fullClassName, className) => {
      if (className !== undefined) {
        fullClassName += `${className} `
      }

      return fullClassName
    }, '')
    .trim()
