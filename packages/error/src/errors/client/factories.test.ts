import { describe, expect, it } from "vitest"
import { factories } from "./factories"

describe("client error factories", () => {
    describe("alias factories", () => {
        it("should create ValidationError via validate alias", () => {
            const error = factories.validate("Invalid input", {
                email: ["Invalid email format"]
            })
            expect(error.status).toBe(422)
            expect(error.detail).toBe("Invalid input")
            expect(error.validationErrors).toEqual({
                email: ["Invalid email format"]
            })
        })

        it("should create AuthorizationError via permission alias", () => {
            const error = factories.permission("Access denied")
            expect(error.status).toBe(403)
            expect(error.detail).toBe("Access denied")
        })

        it("should create AuthorizationError via access alias", () => {
            const error = factories.access("No access")
            expect(error.status).toBe(403)
            expect(error.detail).toBe("No access")
        })

        it("should create NotFoundError via idNotFound alias", () => {
            const error = factories.idNotFound("User", "123")
            expect(error.status).toBe(404)
        })

        it("should create ConflictError via duplicate alias", () => {
            const error = factories.duplicate("Resource already exists")
            expect(error.status).toBe(409)
            expect(error.detail).toBe("Resource already exists")
        })

        it("should create FailedDependencyError via thirdParty alias", () => {
            const error = factories.thirdParty("External service failed")
            expect(error.status).toBe(424)
            expect(error.detail).toBe("External service failed")
        })
    })

    describe("standard factories", () => {
        it("should create PayloadTooLargeError with maxSize", () => {
            const error = factories.payloadTooLarge("File too large", 1024)
            expect(error.status).toBe(413)
            expect(error.maxSize).toBe(1024)
            const json = error.toJSON()
            expect(json.maxSize).toBe(1024)
        })

        it("should create RateLimitError with retryAfter", () => {
            const error = factories.rateLimit("Too many requests", 60)
            expect(error.status).toBe(429)
            expect(error.retryAfter).toBe(60)
            const json = error.toJSON()
            expect(json.retryAfter).toBe(60)
        })

        it("should create ValidationError with validationErrors", () => {
            const validationErrors = {
                username: ["Required"],
                email: ["Invalid format"]
            }
            const error = factories.validation("Validation failed", validationErrors)
            expect(error.status).toBe(422)
            expect(error.validationErrors).toEqual(validationErrors)
            const json = error.toJSON()
            expect(json.validationErrors).toEqual(validationErrors)
        })
    })
})
