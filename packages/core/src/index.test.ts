// oxlint-disable eslint-js/no-restricted-syntax
import { describe, expect, it } from "vitest"
import {
    ErrorsByPath,
    SchemaValidationError,
    Serialize,
    ValidationErrors,
    ValidationErrorResponse,
    error,
    errors,
    isHttpError,
    isValidRFC9457Json,
    schemaErrorFormatter,
    serialize
} from "./"

describe("index.ts exports", () => {
    it("should re-export error object from @fastify-utils/error", () => {
        expect(error).toBeDefined()
        expect(typeof error).toBe("object")
        expect(error).toHaveProperty("badRequest")
        expect(typeof error.badRequest).toBe("function")
    })

    it("should re-export errors object from @fastify-utils/error", () => {
        expect(errors).toBeDefined()
        expect(typeof errors).toBe("object")
        expect(errors).toHaveProperty("client")
        expect(errors).toHaveProperty("server")
    })

    it("should re-export isHttpError function from @fastify-utils/error", () => {
        expect(isHttpError).toBeDefined()
        expect(typeof isHttpError).toBe("function")
    })

    it("should re-export isValidRFC9457Json function from @fastify-utils/error", () => {
        expect(isValidRFC9457Json).toBeDefined()
        expect(typeof isValidRFC9457Json).toBe("function")
    })

    it("should export schemaErrorFormatter function", () => {
        expect(schemaErrorFormatter).toBeDefined()
        expect(typeof schemaErrorFormatter).toBe("function")
    })

    it("should export ValidationErrorResponse schema", () => {
        expect(ValidationErrorResponse).toBeDefined()
        expect(typeof ValidationErrorResponse).toBe("object")
    })

    it("should export serialize function", () => {
        expect(serialize).toBeDefined()
        expect(typeof serialize).toBe("function")
    })

    it("should have SchemaValidationError type available", () => {
        const schemaErr: SchemaValidationError = {
            keyword: "type",
            message: "must be string"
        }
        expect(schemaErr).toBeDefined()
    })

    it("should have ErrorsByPath type available", () => {
        const byPath: ErrorsByPath = {
            "/email": [{ keyword: "type", message: "must be string" }]
        }
        expect(byPath).toBeDefined()
    })

    it("should have Serialize type available", () => {
        type Item = { createdAt: Date }
        const item: Serialize<Item> = {
            createdAt: "2026-01-01T00:00:00.000Z"
        }
        expect(item).toBeDefined()
    })

    it("should have ValidationErrors type available from @fastify-utils/error", () => {
        const valErrors: ValidationErrors = {
            field: ["error message"]
        }
        expect(valErrors).toBeDefined()
    })
})
