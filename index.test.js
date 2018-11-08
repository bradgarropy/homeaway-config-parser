// imports
const Configuration = require("./index.js")

const config = new Configuration("config.txt")

// getRawProperty
test("getRawProperty", async() => {
    let property = undefined
    expect.assertions(5)

    property = await config.getRawProperty("a")
    expect(property).toBe("Hello")

    property = await config.getRawProperty("b")
    expect(property).toBe("world")

    property = await config.getRawProperty("c")
    expect(property).toBe("${a} ${b}")

    property = await config.getRawProperty("d")
    expect(property).toBe("${c}, it's @bradgarropy.")

    property = await config.getRawProperty("e")
    expect(property).toBe("")
})

// getRawProperties
test("getRawProperties", async() => {
    expect.assertions(1)

    const properties = await config.getRawProperties()
    expect(properties).toEqual({
        a: "Hello",
        b: "world",
        c: "${a} ${b}",
        d: "${c}, it's @bradgarropy.",
        e: "",
    })
})

// getInterpolatedProperty
test("getInterpolatedProperty", async() => {
    let property = undefined
    expect.assertions(5)

    property = await config.getInterpolatedProperty("a")
    expect(property).toBe("Hello")

    property = await config.getInterpolatedProperty("b")
    expect(property).toBe("world")

    property = await config.getInterpolatedProperty("c")
    expect(property).toBe("Hello world")

    property = await config.getInterpolatedProperty("d")
    expect(property).toBe("Hello world, it's @bradgarropy.")

    property = await config.getInterpolatedProperty("e")
    expect(property).toBe("")
})

// getInterpolatedProperties
test("getInterpolatedProperties", async() => {
    expect.assertions(1)

    const properties = await config.getInterpolatedProperties()
    expect(properties).toEqual({
        a: "Hello",
        b: "world",
        c: "Hello world",
        d: "Hello world, it's @bradgarropy.",
        e: "",
    })
})
