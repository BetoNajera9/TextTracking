export const toPascalCase = <T extends Record<string, any>>(obj: T): T => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key]
        .split(' ')
        .map(
          (word: any) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
    } else {
      obj[key] = obj[key]
    }
  }

  return obj
}
