export const joinClass = (...classList) =>
  classList
    .reduce((fullClassName, className) => {
      if (typeof className === "boolean") {
        if (className) {
          fullClassName += `${className} `
        }
      } else if (className !== undefined) {
        fullClassName += `${className} `
      }

      return fullClassName
    }, '')
    .trim()
