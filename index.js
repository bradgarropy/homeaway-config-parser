// imports
const fs = require("fs")

// regexes
const entryRegex = new RegExp(/(.*)=(.*)/, "g")
const propertyRegex = property => new RegExp(`${property}=(.*)`, "g")
const interpolationRegex = new RegExp(/\${(.*?)}/)

class Configuration {
    constructor(path) {
        this.path = path
        this.data = fs.readFileSync(path, "utf8")
    }

    // getRawProperty
    async getRawProperty(property) {
        // find entry
        const result = propertyRegex(property).exec(this.data)

        // check entry
        const value = result ? result[1] : null
        return value
    }

    // getRawProperties
    async getRawProperties() {
        const entryRegex = new RegExp(/(.*)=(.*)/, "g")
        let properties = {}
        let match = entryRegex.exec(this.data)

        // find entries
        while (match) {
            const name = match[1]
            const value = match[2]
            properties[name] = value

            // find next entry
            match = entryRegex.exec(this.data)
        }

        return properties
    }

    // getInterpolatedProperty
    async getInterpolatedProperty(property) {
        const rawProperty = await this.getRawProperty(property)

        let value = rawProperty

        while (interpolationRegex.test(value)) {
            const result = interpolationRegex.exec(value)
            const replaceMe = result[1]
            const replacement = await this.getRawProperty(replaceMe)
            value = value.replace(`\${${replaceMe}}`, replacement)
        }

        return value
    }

    // getInterpolatedProperties
    async getInterpolatedProperties() {
        let properties = {}
        let match = entryRegex.exec(this.data)

        // find entries
        while (match) {
            const name = match[1]
            const value = await this.getInterpolatedProperty(name)
            properties[name] = value

            // find next entry
            match = entryRegex.exec(this.data)
        }

        return properties
    }
}

// exports
module.exports = Configuration
