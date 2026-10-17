import { describe, expect, it } from "vitest"
import { factories } from "./factories"

describe("server error factories", () => {
    describe("alias factories", () => {
        it("should create ServiceUnavailableError via db alias", () => {
            const error = factories.db("Database connection failed")
            expect(error.status).toBe(503)
            expect(error.detail).toBe("Database connection failed")
        })

        it("should create BadGatewayError via fetch alias", () => {
            const error = factories.fetch("API call failed", "payment-service")
            expect(error.status).toBe(502)
            expect(error.detail).toBe("API call failed")
            expect(error.service).toBe("payment-service")
        })

        it("should create NotImplementedError via envNotSet alias", () => {
            const error = factories.envNotSet("API_KEY not set")
            expect(error.status).toBe(501)
            expect(error.detail).toBe("API_KEY not set")
        })

        it("should create NotImplementedError via envInvalid alias", () => {
            const error = factories.envInvalid("Invalid PORT value")
            expect(error.status).toBe(501)
            expect(error.detail).toBe("Invalid PORT value")
        })

        it("should create ServiceUnavailableError via maintenance alias", () => {
            const error = factories.maintenance("System maintenance", 3600)
            expect(error.status).toBe(503)
            expect(error.retryAfter).toBe(3600)
        })

        it("should create InsufficientStorageError via migration alias", () => {
            const error = factories.migration("Migration in progress")
            expect(error.status).toBe(507)
            expect(error.detail).toBe("Migration in progress")
        })

        it("should create InternalServerError via unhandledRejection alias", () => {
            const error = factories.unhandledRejection("Promise rejection")
            expect(error.status).toBe(500)
            expect(error.detail).toBe("Promise rejection")
        })

        it("should create InternalServerError via uncaughtException alias", () => {
            const error = factories.uncaughtException("Uncaught exception")
            expect(error.status).toBe(500)
            expect(error.detail).toBe("Uncaught exception")
        })
    })

    describe("standard factories", () => {
        it("should create BadGatewayError with service parameter", () => {
            const error = factories.badGateway("Gateway error", "auth-service")
            expect(error.status).toBe(502)
            expect(error.service).toBe("auth-service")
            const json = error.toJSON()
            expect(json.service).toBe("auth-service")
        })

        it("should create ServiceUnavailableError with retryAfter", () => {
            const error = factories.serviceUnavailable("Service down", 120)
            expect(error.status).toBe(503)
            expect(error.retryAfter).toBe(120)
            const json = error.toJSON()
            expect(json.retryAfter).toBe(120)
        })

        it("should create GatewayTimeoutError with service parameter", () => {
            const error = factories.gatewayTimeout("Timeout", "data-service")
            expect(error.status).toBe(504)
            expect(error.service).toBe("data-service")
            const json = error.toJSON()
            expect(json.service).toBe("data-service")
        })
    })
})
