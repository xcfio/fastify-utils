import { describe, expect, it } from "vitest"
import { errors } from "../../errors"
import { createErrorByStatus } from "./index"

describe("createErrorByStatus", () => {
    it("should create BadRequestError for status 400", () => {
        const error = createErrorByStatus(400, "Bad request")
        expect(error.status).toBe(400)
        expect(error.detail).toBe("Bad request")
        expect(error.title).toBe("Bad Request")
    })

    it("should create AuthenticationError for status 401", () => {
        const error = createErrorByStatus(401, "Unauthorized")
        expect(error.status).toBe(401)
        expect(error.detail).toBe("Unauthorized")
        expect(error.title).toBe("Authentication Required")
    })

    it("should create AuthorizationError for status 403", () => {
        const error = createErrorByStatus(403, "Forbidden")
        expect(error.status).toBe(403)
        expect(error.detail).toBe("Forbidden")
        expect(error.title).toBe("Forbidden")
    })

    it("should create NotFoundError for status 404", () => {
        const error = createErrorByStatus(404, "Not found")
        expect(error.status).toBe(404)
        expect(error.detail).toBe("Not found")
        expect(error.title).toBe("Not Found")
    })

    it("should create ValidationError for status 422", () => {
        const error = createErrorByStatus(422, "Validation failed")
        expect(error.status).toBe(422)
        expect(error.detail).toBe("Validation failed")
        expect(error.title).toBe("Validation Error")
    })

    it("should create RateLimitError for status 429", () => {
        const error = createErrorByStatus(429, "Too many requests")
        expect(error.status).toBe(429)
        expect(error.detail).toBe("Too many requests")
        expect(error.title).toBe("Too Many Requests")
    })

    it("should create InternalServerError for status 500", () => {
        const error = createErrorByStatus(500, "Internal error")
        expect(error.status).toBe(500)
        expect(error.detail).toBe("Internal error")
        expect(error.title).toBe("Internal Server Error")
    })

    it("should create NotImplementedError for status 501", () => {
        const error = createErrorByStatus(501, "Not implemented")
        expect(error.status).toBe(501)
        expect(error.detail).toBe("Not implemented")
        expect(error.title).toBe("Not Implemented")
    })

    it("should create BadGatewayError for status 502", () => {
        const error = createErrorByStatus(502, "Bad gateway")
        expect(error.status).toBe(502)
        expect(error.detail).toBe("Bad gateway")
        expect(error.title).toBe("Bad Gateway")
    })

    it("should create ServiceUnavailableError for status 503", () => {
        const error = createErrorByStatus(503, "Service unavailable")
        expect(error.status).toBe(503)
        expect(error.detail).toBe("Service unavailable")
        expect(error.title).toBe("Service Unavailable")
    })

    it("should create GatewayTimeoutError for status 504", () => {
        const error = createErrorByStatus(504, "Gateway timeout")
        expect(error.status).toBe(504)
        expect(error.detail).toBe("Gateway timeout")
        expect(error.title).toBe("Gateway Timeout")
    })

    it("should default to BadRequestError for unknown 4xx status", () => {
        const error = createErrorByStatus(499, "Unknown client error")
        expect(error.status).toBe(400)
        expect(error.detail).toBe("Unknown client error")
        expect(error.title).toBe("Bad Request")
    })

    it("should default to InternalServerError for unknown 5xx status", () => {
        const error = createErrorByStatus(599, "Unknown server error")
        expect(error.status).toBe(500)
        expect(error.detail).toBe("Unknown server error")
        expect(error.title).toBe("Internal Server Error")
    })

    it("should default to InternalServerError for unknown status code", () => {
        const error = createErrorByStatus(999, "Unknown error")
        expect(error.status).toBe(500)
        expect(error.detail).toBe("Unknown error")
        expect(error.title).toBe("Internal Server Error")
    })

    it("should handle all standard 4xx status codes", () => {
        const clientStatuses = [
            400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 421, 422, 423,
            424, 425, 426, 428, 429, 431, 451
        ]

        for (const status of clientStatuses) {
            const error = createErrorByStatus(status, `Error ${status}`)
            expect(error.status).toBe(status)
            expect(error.detail).toBe(`Error ${status}`)
        }
    })

    it("should handle all standard 5xx status codes", () => {
        const serverStatuses = [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511]

        for (const status of serverStatuses) {
            const error = createErrorByStatus(status, `Error ${status}`)
            expect(error.status).toBe(status)
            expect(error.detail).toBe(`Error ${status}`)
        }
    })

    it("should be accessible via errors.byStatus", () => {
        const error = errors.byStatus(404, "Not found")
        expect(error.status).toBe(404)
        expect(error.detail).toBe("Not found")
        expect(error.title).toBe("Not Found")
    })

    it("should work with errors.byStatus for all status codes", () => {
        const error400 = errors.byStatus(400, "Bad request")
        expect(error400.status).toBe(400)

        const error500 = errors.byStatus(500, "Internal error")
        expect(error500.status).toBe(500)
    })
})
