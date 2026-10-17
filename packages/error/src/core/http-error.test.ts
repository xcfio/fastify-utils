import { describe, expect, it } from "vitest"
import { HttpError } from "./http-error"

describe("HttpError", () => {
    it("should create an HttpError instance", () => {
        const error = new HttpError({
            status: 404,
            title: "Not Found",
            type: "about:blank",
            detail: "Resource not found"
        })

        expect(error).toBeInstanceOf(HttpError)
        expect(error.status).toBe(404)
        expect(error.title).toBe("Not Found")
        expect(error.name).toBe("HttpError")
    })

    it("should have a type property", () => {
        const error = new HttpError({
            status: 500,
            title: "Internal Server Error",
            type: "https://example.com/errors/server-error",
            detail: "Something went wrong"
        })

        expect(error.type).toBe("https://example.com/errors/server-error")
    })

    it("should support detail property", () => {
        const error = new HttpError({
            status: 400,
            title: "Bad Request",
            type: "about:blank",
            detail: "The request body is invalid"
        })

        expect(error.detail).toBe("The request body is invalid")
    })

    it("should support instance property", () => {
        const error = new HttpError({
            status: 400,
            title: "Bad Request",
            type: "about:blank",
            detail: "Invalid request",
            instance: "/api/users/123"
        })

        expect(error.instance).toBe("/api/users/123")
    })

    it("should serialize to JSON correctly", () => {
        const error = new HttpError({
            status: 404,
            title: "Not Found",
            type: "about:blank",
            detail: "Resource not found",
            instance: "/api/users/123"
        })

        const json = error.toJSON()

        expect(json).toEqual({
            type: "about:blank",
            title: "Not Found",
            status: 404,
            detail: "Resource not found",
            instance: "/api/users/123"
        })
    })

    it("should not include instance in JSON when not provided", () => {
        const error = new HttpError({
            status: 500,
            title: "Internal Server Error",
            type: "about:blank",
            detail: "Server error"
        })

        const json = error.toJSON()

        expect(json).toEqual({
            type: "about:blank",
            title: "Internal Server Error",
            status: 500,
            detail: "Server error"
        })
        expect(json).not.toHaveProperty("instance")
    })

    it("should support cause property", () => {
        const originalError = new Error("Original error message")
        const error = new HttpError({
            status: 500,
            title: "Internal Server Error",
            type: "about:blank",
            detail: "Wrapped error",
            cause: originalError
        })

        expect(error.cause).toBe(originalError)
    })

    it("should propagate cause chain", () => {
        const rootCause = new Error("Root cause")
        const middleError = new Error("Middle error", { cause: rootCause })
        const error = new HttpError({
            status: 500,
            title: "Internal Server Error",
            type: "about:blank",
            detail: "Top level error",
            cause: middleError
        })

        expect(error.cause).toBe(middleError)
        expect((error.cause as Error).cause).toBe(rootCause)
    })
})
