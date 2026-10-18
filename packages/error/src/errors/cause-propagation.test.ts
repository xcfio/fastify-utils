import { describe, expect, it } from "vitest"
import { errors } from "../"

describe("Error cause propagation", () => {
    it("should automatically extract and propagate cause from Error objects", () => {
        const originalError = new Error("Database connection failed")
        const httpError = errors.server.internal(originalError)

        expect(httpError.cause).toBe(originalError)
        expect(httpError.detail).toBe("Database connection failed")
    })

    it("should work with error aliases", () => {
        const dbError = new Error("Connection pool exhausted")
        const httpError = errors.server.db(dbError)

        expect(httpError.cause).toBe(dbError)
        expect(httpError.detail).toBe("Connection pool exhausted")
    })

    it("should not set cause for non-Error values", () => {
        const httpError = errors.server.internal("String error message")

        expect(httpError.cause).toBeUndefined()
        expect(httpError.detail).toBe("String error message")
    })

    it("should preserve error chains", () => {
        const rootCause = new Error("Root cause")
        const wrappedError = new Error("Wrapped error", { cause: rootCause })
        const httpError = errors.server.internal(wrappedError)

        expect(httpError.cause).toBe(wrappedError)
        expect((httpError.cause as Error).cause).toBe(rootCause)
    })

    it("should work with client errors", () => {
        const validationError = new Error("Validation failed")
        const httpError = errors.client.validate(validationError)

        expect(httpError.cause).toBe(validationError)
        expect(httpError.detail).toBe("Validation failed")
    })

    it("should work with third-party errors", () => {
        const stripeError = new Error("Stripe payment failed")
        const httpError = errors.client.thirdParty(stripeError)

        expect(httpError.cause).toBe(stripeError)
        expect(httpError.status).toBe(424)
    })

    it("should work with fetch alias", () => {
        const apiError = new Error("GitHub API unreachable")
        const httpError = errors.server.fetch(apiError)

        expect(httpError.cause).toBe(apiError)
        expect(httpError.status).toBe(502)
    })

    it("should not set cause for notFound when id is provided", () => {
        // When id is provided, resourceOrDetail is used as a string, not an error
        const httpError = errors.client.notFound("User", "123")

        expect(httpError.cause).toBeUndefined()
        expect(httpError.detail).toBe("User 123 not found")
    })

    it("should set cause for notFound when id is not provided and detail is an Error", () => {
        const error = new Error("Resource not found")
        const httpError = errors.client.notFound(error)

        expect(httpError.cause).toBe(error)
        expect(httpError.detail).toBe("Resource not found")
    })
})
