/* eslint-disable typescript/no-base-to-string */
import { describe, expect, it } from "vitest"
import { normalizeToString } from "./index"

describe("normalizeToString", () => {
    it("should return Error message for Error instances", () => {
        const error = new Error("Test error message")
        expect(normalizeToString(error)).toBe("Test error message")
    })

    it("should return string as-is for string input", () => {
        expect(normalizeToString("test string")).toBe("test string")
    })

    it("should return 'Unknown error' for null", () => {
        expect(normalizeToString(null)).toBe("Unknown error")
    })

    it("should return 'Unknown error' for undefined", () => {
        expect(normalizeToString(undefined)).toBe("Unknown error")
    })

    it("should return JSON stringified for plain objects", () => {
        const obj = { key: "value", number: 42 }
        expect(normalizeToString(obj)).toBe(JSON.stringify(obj))
    })

    it("should return String(value) for objects that cannot be JSON stringified", () => {
        const circularObj: { self?: unknown } = {}
        circularObj.self = circularObj
        const result = normalizeToString(circularObj)
        expect(result).toBe(String(circularObj))
    })

    it("should return String(value) for numbers", () => {
        expect(normalizeToString(123)).toBe("123")
        expect(normalizeToString(0)).toBe("0")
        expect(normalizeToString(-456)).toBe("-456")
    })

    it("should return String(value) for booleans", () => {
        expect(normalizeToString(true)).toBe("true")
        expect(normalizeToString(false)).toBe("false")
    })

    it("should handle BigInt values", () => {
        expect(normalizeToString(BigInt(123))).toBe("123")
    })

    it("should handle Symbol values", () => {
        const sym = Symbol("test")
        expect(normalizeToString(sym)).toBe(String(sym))
    })

    it("should handle arrays", () => {
        expect(normalizeToString([1, 2, 3])).toBe("[1,2,3]")
        expect(normalizeToString(["a", "b"])).toBe('["a","b"]')
    })

    it("should handle nested objects", () => {
        const nested = { a: { b: { c: "value" } } }
        expect(normalizeToString(nested)).toBe(JSON.stringify(nested))
    })
})
