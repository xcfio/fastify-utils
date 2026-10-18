import { describe, expect, it } from "vitest"
import * as ClientErrors from "./"

describe("errors/client/index.ts exports", () => {
    it("should export BadRequestError", () => {
        expect(ClientErrors.BadRequestError).toBeDefined()
        const error = new ClientErrors.BadRequestError("test")
        expect(error.status).toBe(400)
    })

    it("should export PaymentRequiredError", () => {
        expect(ClientErrors.PaymentRequiredError).toBeDefined()
        const error = new ClientErrors.PaymentRequiredError("test")
        expect(error.status).toBe(402)
    })

    it("should export AuthenticationError", () => {
        expect(ClientErrors.AuthenticationError).toBeDefined()
        const error = new ClientErrors.AuthenticationError("test")
        expect(error.status).toBe(401)
    })

    it("should export AuthorizationError", () => {
        expect(ClientErrors.AuthorizationError).toBeDefined()
        const error = new ClientErrors.AuthorizationError("test")
        expect(error.status).toBe(403)
    })

    it("should export NotFoundError", () => {
        expect(ClientErrors.NotFoundError).toBeDefined()
        const error = new ClientErrors.NotFoundError("test")
        expect(error.status).toBe(404)
    })

    it("should export MethodNotAllowedError", () => {
        expect(ClientErrors.MethodNotAllowedError).toBeDefined()
        const error = new ClientErrors.MethodNotAllowedError("test")
        expect(error.status).toBe(405)
    })

    it("should export NotAcceptableError", () => {
        expect(ClientErrors.NotAcceptableError).toBeDefined()
        const error = new ClientErrors.NotAcceptableError("test")
        expect(error.status).toBe(406)
    })

    it("should export ProxyAuthenticationRequiredError", () => {
        expect(ClientErrors.ProxyAuthenticationRequiredError).toBeDefined()
        const error = new ClientErrors.ProxyAuthenticationRequiredError("test")
        expect(error.status).toBe(407)
    })

    it("should export RequestTimeoutError", () => {
        expect(ClientErrors.RequestTimeoutError).toBeDefined()
        const error = new ClientErrors.RequestTimeoutError("test")
        expect(error.status).toBe(408)
    })

    it("should export ConflictError", () => {
        expect(ClientErrors.ConflictError).toBeDefined()
        const error = new ClientErrors.ConflictError("test")
        expect(error.status).toBe(409)
    })

    it("should export GoneError", () => {
        expect(ClientErrors.GoneError).toBeDefined()
        const error = new ClientErrors.GoneError("test")
        expect(error.status).toBe(410)
    })

    it("should export LengthRequiredError", () => {
        expect(ClientErrors.LengthRequiredError).toBeDefined()
        const error = new ClientErrors.LengthRequiredError("test")
        expect(error.status).toBe(411)
    })

    it("should export PreconditionFailedError", () => {
        expect(ClientErrors.PreconditionFailedError).toBeDefined()
        const error = new ClientErrors.PreconditionFailedError("test")
        expect(error.status).toBe(412)
    })

    it("should export PayloadTooLargeError", () => {
        expect(ClientErrors.PayloadTooLargeError).toBeDefined()
        const error = new ClientErrors.PayloadTooLargeError("test")
        expect(error.status).toBe(413)
    })

    it("should export UriTooLongError", () => {
        expect(ClientErrors.UriTooLongError).toBeDefined()
        const error = new ClientErrors.UriTooLongError("test")
        expect(error.status).toBe(414)
    })

    it("should export UnsupportedMediaTypeError", () => {
        expect(ClientErrors.UnsupportedMediaTypeError).toBeDefined()
        const error = new ClientErrors.UnsupportedMediaTypeError("test")
        expect(error.status).toBe(415)
    })

    it("should export RangeNotSatisfiableError", () => {
        expect(ClientErrors.RangeNotSatisfiableError).toBeDefined()
        const error = new ClientErrors.RangeNotSatisfiableError("test")
        expect(error.status).toBe(416)
    })

    it("should export ExpectationFailedError", () => {
        expect(ClientErrors.ExpectationFailedError).toBeDefined()
        const error = new ClientErrors.ExpectationFailedError("test")
        expect(error.status).toBe(417)
    })

    it("should export MisdirectedRequestError", () => {
        expect(ClientErrors.MisdirectedRequestError).toBeDefined()
        const error = new ClientErrors.MisdirectedRequestError("test")
        expect(error.status).toBe(421)
    })

    it("should export ValidationError", () => {
        expect(ClientErrors.ValidationError).toBeDefined()
        const error = new ClientErrors.ValidationError("test")
        expect(error.status).toBe(422)
    })

    it("should export LockedError", () => {
        expect(ClientErrors.LockedError).toBeDefined()
        const error = new ClientErrors.LockedError("test")
        expect(error.status).toBe(423)
    })

    it("should export FailedDependencyError", () => {
        expect(ClientErrors.FailedDependencyError).toBeDefined()
        const error = new ClientErrors.FailedDependencyError("test")
        expect(error.status).toBe(424)
    })

    it("should export TooEarlyError", () => {
        expect(ClientErrors.TooEarlyError).toBeDefined()
        const error = new ClientErrors.TooEarlyError("test")
        expect(error.status).toBe(425)
    })

    it("should export UpgradeRequiredError", () => {
        expect(ClientErrors.UpgradeRequiredError).toBeDefined()
        const error = new ClientErrors.UpgradeRequiredError("test")
        expect(error.status).toBe(426)
    })

    it("should export PreconditionRequiredError", () => {
        expect(ClientErrors.PreconditionRequiredError).toBeDefined()
        const error = new ClientErrors.PreconditionRequiredError("test")
        expect(error.status).toBe(428)
    })

    it("should export RateLimitError", () => {
        expect(ClientErrors.RateLimitError).toBeDefined()
        const error = new ClientErrors.RateLimitError("test")
        expect(error.status).toBe(429)
    })

    it("should export RequestHeaderFieldsTooLargeError", () => {
        expect(ClientErrors.RequestHeaderFieldsTooLargeError).toBeDefined()
        const error = new ClientErrors.RequestHeaderFieldsTooLargeError("test")
        expect(error.status).toBe(431)
    })

    it("should export UnavailableForLegalReasonsError", () => {
        expect(ClientErrors.UnavailableForLegalReasonsError).toBeDefined()
        const error = new ClientErrors.UnavailableForLegalReasonsError("test")
        expect(error.status).toBe(451)
    })
})
