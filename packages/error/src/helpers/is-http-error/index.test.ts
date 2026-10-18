import { describe, expect, it } from "vitest"
import { HttpError } from "../../core"
import { isHttpError } from "./"

describe("isHttpError", () => {
    it("should return true for HttpError instances", () => {
        const error = new HttpError({
            type: "about:blank#test",
            title: "Test Error",
            status: 400,
            detail: "Test detail"
        })
        expect(isHttpError(error)).toBe(true)
    })

    it("should return false for regular Error instances", () => {
        const error = new Error("Regular error")
        expect(isHttpError(error)).toBe(false)
    })

    it("should return false for non-error objects", () => {
        expect(isHttpError({})).toBe(false)
        expect(isHttpError({ message: "Not an error" })).toBe(false)
    })

    it("should return false for null", () => {
        expect(isHttpError(null)).toBe(false)
    })

    it("should return false for undefined", () => {
        expect(isHttpError(undefined)).toBe(false)
    })

    it("should return false for primitive values", () => {
        expect(isHttpError("string")).toBe(false)
        expect(isHttpError(123)).toBe(false)
        expect(isHttpError(true)).toBe(false)
    })
})
