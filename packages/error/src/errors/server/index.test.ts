import { describe, expect, it } from "vitest"
import * as ServerErrors from "./index"

describe("errors/server/index.ts exports", () => {
    it("should export InternalServerError", () => {
        expect(ServerErrors.InternalServerError).toBeDefined()
        const error = new ServerErrors.InternalServerError("test")
        expect(error.status).toBe(500)
    })

    it("should export NotImplementedError", () => {
        expect(ServerErrors.NotImplementedError).toBeDefined()
        const error = new ServerErrors.NotImplementedError("test")
        expect(error.status).toBe(501)
    })

    it("should export BadGatewayError", () => {
        expect(ServerErrors.BadGatewayError).toBeDefined()
        const error = new ServerErrors.BadGatewayError("test")
        expect(error.status).toBe(502)
    })

    it("should export ServiceUnavailableError", () => {
        expect(ServerErrors.ServiceUnavailableError).toBeDefined()
        const error = new ServerErrors.ServiceUnavailableError("test")
        expect(error.status).toBe(503)
    })

    it("should export GatewayTimeoutError", () => {
        expect(ServerErrors.GatewayTimeoutError).toBeDefined()
        const error = new ServerErrors.GatewayTimeoutError("test")
        expect(error.status).toBe(504)
    })

    it("should export HttpVersionNotSupportedError", () => {
        expect(ServerErrors.HttpVersionNotSupportedError).toBeDefined()
        const error = new ServerErrors.HttpVersionNotSupportedError("test")
        expect(error.status).toBe(505)
    })

    it("should export VariantAlsoNegotiatesError", () => {
        expect(ServerErrors.VariantAlsoNegotiatesError).toBeDefined()
        const error = new ServerErrors.VariantAlsoNegotiatesError("test")
        expect(error.status).toBe(506)
    })

    it("should export InsufficientStorageError", () => {
        expect(ServerErrors.InsufficientStorageError).toBeDefined()
        const error = new ServerErrors.InsufficientStorageError("test")
        expect(error.status).toBe(507)
    })

    it("should export LoopDetectedError", () => {
        expect(ServerErrors.LoopDetectedError).toBeDefined()
        const error = new ServerErrors.LoopDetectedError("test")
        expect(error.status).toBe(508)
    })

    it("should export NotExtendedError", () => {
        expect(ServerErrors.NotExtendedError).toBeDefined()
        const error = new ServerErrors.NotExtendedError("test")
        expect(error.status).toBe(510)
    })

    it("should export NetworkAuthenticationRequiredError", () => {
        expect(ServerErrors.NetworkAuthenticationRequiredError).toBeDefined()
        const error = new ServerErrors.NetworkAuthenticationRequiredError("test")
        expect(error.status).toBe(511)
    })
})
