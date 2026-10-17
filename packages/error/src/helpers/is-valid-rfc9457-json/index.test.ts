import { describe, expect, it } from "vitest"
import { isValidRFC9457Json } from "./index"

describe("isValidRFC9457Json", () => {
    it("should return true for complete RFC9457 response", () => {
        const response = {
            type: "about:blank#not-found",
            title: "Not Found",
            status: 404,
            detail: "User 123 not found"
        }

        expect(isValidRFC9457Json(response)).toBe(true)
    })

    it("should return true for RFC9457 response with additional fields", () => {
        const response = {
            type: "about:blank#internal-server-error",
            title: "Internal Server Error",
            status: 500,
            detail: "Oops, something bad happened!",
            instance: "/api/users"
        }

        expect(isValidRFC9457Json(response)).toBe(true)
    })

    it("should return true for RFC9457 response with extensions", () => {
        const response = {
            type: "about:blank#validation",
            title: "Validation Error",
            status: 422,
            detail: "Validation failed",
            validationErrors: {
                email: ["Invalid email format"]
            }
        }

        expect(isValidRFC9457Json(response)).toBe(true)
    })

    it("should return false for object missing type", () => {
        const response = {
            title: "Not Found",
            status: 404,
            detail: "User not found"
        }

        expect(isValidRFC9457Json(response)).toBe(false)
    })

    it("should return false for object missing title", () => {
        const response = {
            type: "about:blank#not-found",
            status: 404,
            detail: "User not found"
        }

        expect(isValidRFC9457Json(response)).toBe(false)
    })

    it("should return false for object missing status", () => {
        const response = {
            type: "about:blank#not-found",
            title: "Not Found",
            detail: "User not found"
        }

        expect(isValidRFC9457Json(response)).toBe(false)
    })

    it("should return false for object missing detail", () => {
        const response = {
            type: "about:blank#not-found",
            title: "Not Found",
            status: 404
        }

        expect(isValidRFC9457Json(response)).toBe(false)
    })

    it("should return false for non-object input", () => {
        expect(isValidRFC9457Json("invalid")).toBe(false)
    })

    it("should return false for null input", () => {
        expect(isValidRFC9457Json(null)).toBe(false)
    })

    it("should return false for empty object", () => {
        expect(isValidRFC9457Json({})).toBe(false)
    })

    it("should return false for array input", () => {
        expect(isValidRFC9457Json([])).toBe(false)
    })

    it("should return false for undefined input", () => {
        expect(isValidRFC9457Json(undefined)).toBe(false)
    })
})
