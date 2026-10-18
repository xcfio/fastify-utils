import { describe, expect, it } from "vitest"
import { extractCause } from "./"

describe("extractCause", () => {
    it("should extract Error objects as cause", () => {
        const error = new Error("Test error")
        const cause = extractCause(error)

        expect(cause).toBe(error)
    })

    it("should return undefined for non-Error values", () => {
        expect(extractCause("string")).toBeUndefined()
        expect(extractCause(123)).toBeUndefined()
        expect(extractCause(null)).toBeUndefined()
        expect(extractCause(undefined)).toBeUndefined()
        expect(extractCause({ message: "not an error" })).toBeUndefined()
    })

    it("should extract custom Error subclasses", () => {
        class CustomError extends Error {
            constructor(message: string) {
                super(message)
                this.name = "CustomError"
            }
        }

        const error = new CustomError("Custom error")
        const cause = extractCause(error)

        expect(cause).toBe(error)
        expect(cause).toBeInstanceOf(CustomError)
    })
})
