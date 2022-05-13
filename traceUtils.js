const util = {}

util.string = {
    toHumanReadable: str => str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ').toLowerCase(),
    toCapitalized: str => {
        str = util.string.toHumanReadable(str)
        return str.charAt(0).toUpperCase() + str.slice(1)
    },
    toTitleCase: str => {
        str = util.string.toHumanReadable(str)
        return str.split(" ").map(util.string.toCapitalized).join(" ")
    },
    toCamelCase: str => {
        str = util.string.toHumanReadable(str)
        return str.split(" ").map(util.string.toCapitalized).join("")
    },
    toPascalCase: str => {
        str = util.string.toHumanReadable(str)
        return str.split(" ").map(util.string.toCapitalized).join("")
    },
    toSnakeCase: str => {
        str = util.string.toHumanReadable(str)
        return str.split(" ").join("_")
    },
    toUpperSnakeCase: str => {
        str = util.string.toHumanReadable(str)
        return str.replaceAll(" ", "_").toUpperCase()
    },
    padLeft: (str, length, character = " ") => (new Array(length + 1).join(character) + str).slice(-length),
    padRight: (str, length, character = " ") => (str + new Array(length + 1).join(character)).slice(0, length),
    pad: (str, length, character = " ") => {
        const sideLength = Math.floor((length - str.length) / 2)
        return character.repeat(sideLength) + str + character.repeat(sideLength)
    },
    includesAny: (str, ...values) => values.some(value => str.includes(value)),
    includesAll: (str, ...values) => values.every(value => str.includes(value)),
    remove: (str, value) => str.replace(value, ""),
    removeAll: (str, value) => str.replaceAll(value, ""),
    truncate: (str, maxLength, suffix = "...") => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + suffix
        }
        return str
    },
    random: (str, length = 6) => {
        let result = ""
        for (let i = 0; i < length; i++) {
            result += str.charAt(Math.floor(Math.random() * str.length))
        }
        return result
    },
    stripExtension: filename => filename.replace(/\.[^/.]+$/, "")
}

module.exports = util
