import type { FastifySchemaValidationError } from "fastify/types/schema"
import { describe, expect, it } from "vitest"
import { schemaErrorFormatter } from "./"

describe("schemaErrorFormatter", () => {
    it("should format single field error correctly", () => {
        const errors: FastifySchemaValidationError[] = [
            {
                keyword: "type",
                instancePath: "/email",
                schemaPath: "#/properties/email/type",
                params: { type: "string" },
                message: "must be string"
            }
        ]

        const result = schemaErrorFormatter(errors, "body")

        expect(result.status).toBe(422)
        expect(result.title).toBe("Validation Error")
        expect(result.detail).toBe("Schema validation failed for body: email: must be string")
    })

    it("should format multiple errors on the same field path", () => {
        const errors: FastifySchemaValidationError[] = [
            {
                keyword: "minLength",
                instancePath: "/password",
                schemaPath: "#/properties/password/minLength",
                params: { limit: 8 },
                message: "must NOT have fewer than 8 characters"
            },
            {
                keyword: "pattern",
                instancePath: "/password",
                schemaPath: "#/properties/password/pattern",
                params: { pattern: "^[A-Z]" },
                message: "must match pattern"
            }
        ]

        const result = schemaErrorFormatter(errors, "body")

        expect(result.status).toBe(422)
        expect(result.detail).toBe(
            "Schema validation failed for body: password: must NOT have fewer than 8 characters; password: must match pattern"
        )
    })

    it("should format errors across multiple different fields", () => {
        const errors: FastifySchemaValidationError[] = [
            {
                keyword: "type",
                instancePath: "/name",
                schemaPath: "#/properties/name/type",
                params: {},
                message: "must be string"
            },
            {
                keyword: "type",
                instancePath: "/age",
                schemaPath: "#/properties/age/type",
                params: {},
                message: "must be number"
            }
        ]

        const result = schemaErrorFormatter(errors, "body")

        expect(result.detail).toBe("Schema validation failed for body: name: must be string; age: must be number")
    })

    it("should handle error with undefined instancePath by defaulting to root", () => {
        const errors = [
            {
                keyword: "required",
                instancePath: undefined,
                schemaPath: "#/required",
                params: { missingProperty: "email" },
                message: "must have required property 'email'"
            }
        ] as unknown as FastifySchemaValidationError[]

        const result = schemaErrorFormatter(errors, "body")

        expect(result.detail).toBe("Schema validation failed for body: root: must have required property 'email'")
    })

    it("should handle instancePath being empty string or leading slash only", () => {
        const errorsWithEmpty: FastifySchemaValidationError[] = [
            {
                keyword: "type",
                instancePath: "",
                schemaPath: "#/type",
                params: {},
                message: "must be object"
            }
        ]
        expect(schemaErrorFormatter(errorsWithEmpty, "body").detail).toBe(
            "Schema validation failed for body: root: must be object"
        )

        const errorsWithSlash: FastifySchemaValidationError[] = [
            {
                keyword: "type",
                instancePath: "/",
                schemaPath: "#/type",
                params: {},
                message: "must be object"
            }
        ]
        expect(schemaErrorFormatter(errorsWithSlash, "body").detail).toBe(
            "Schema validation failed for body: root: must be object"
        )
    })

    it("should aggregate const keyword errors with allowed values", () => {
        const errors: FastifySchemaValidationError[] = [
            {
                keyword: "const",
                instancePath: "/role",
                schemaPath: "#/properties/role/const",
                params: { allowedValue: "admin" },
                message: "must be equal to constant"
            },
            {
                keyword: "const",
                instancePath: "/role",
                schemaPath: "#/properties/role/const",
                params: { allowedValue: "user" },
                message: "must be equal to constant"
            }
        ]

        const result = schemaErrorFormatter(errors, "body")

        expect(result.detail).toBe("Schema validation failed for body: role must be one of: admin, user")
    })

    it("should aggregate const keyword errors with empty instancePath", () => {
        const errors: FastifySchemaValidationError[] = [
            {
                keyword: "const",
                instancePath: "",
                schemaPath: "#/const",
                params: { allowedValue: "valid-root" },
                message: "must be equal to constant"
            }
        ]

        const result = schemaErrorFormatter(errors, "body")

        expect(result.detail).toBe("Schema validation failed for body: root must be one of: valid-root")
    })

    it("should handle const keyword error without allowedValue param", () => {
        const errorsWithMessage: FastifySchemaValidationError[] = [
            {
                keyword: "const",
                instancePath: "/status",
                schemaPath: "#/properties/status/const",
                params: {},
                message: "must match const"
            }
        ]
        expect(schemaErrorFormatter(errorsWithMessage, "body").detail).toBe(
            "Schema validation failed for body: status: must match const"
        )

        const errorsWithoutMessage: FastifySchemaValidationError[] = [
            {
                keyword: "const",
                instancePath: "/status",
                schemaPath: "#/properties/status/const",
                params: {}
            }
        ]
        expect(schemaErrorFormatter(errorsWithoutMessage, "body").detail).toBe(
            "Schema validation failed for body: status: Invalid value"
        )

        const errorsWithoutMessageRoot: FastifySchemaValidationError[] = [
            {
                keyword: "const",
                instancePath: "",
                schemaPath: "#/const",
                params: {}
            }
        ]
        expect(schemaErrorFormatter(errorsWithoutMessageRoot, "body").detail).toBe(
            "Schema validation failed for body: root: Invalid value"
        )
    })

    it("should handle other errors without a message by using 'Invalid value'", () => {
        const errors: FastifySchemaValidationError[] = [
            {
                keyword: "custom",
                instancePath: "/customField",
                schemaPath: "#/properties/customField/custom",
                params: {}
            }
        ]

        const result = schemaErrorFormatter(errors, "body")

        expect(result.detail).toBe("Schema validation failed for body: customField: Invalid value")
    })

    it("should ignore anyOf keyword errors when other errors exist", () => {
        const errors: FastifySchemaValidationError[] = [
            {
                keyword: "type",
                instancePath: "/value",
                schemaPath: "#/anyOf/0/type",
                params: {},
                message: "must be string"
            },
            {
                keyword: "anyOf",
                instancePath: "/value",
                schemaPath: "#/anyOf",
                params: {},
                message: "must match a schema in anyOf"
            }
        ]

        const result = schemaErrorFormatter(errors, "body")

        expect(result.detail).toBe("Schema validation failed for body: value: must be string")
    })

    it("should handle path errors when only anyOf keyword errors exist", () => {
        const errorsWithMessage: FastifySchemaValidationError[] = [
            {
                keyword: "anyOf",
                instancePath: "/value",
                schemaPath: "#/anyOf",
                params: {},
                message: "must match schema in anyOf"
            }
        ]
        expect(schemaErrorFormatter(errorsWithMessage, "body").detail).toBe(
            "Schema validation failed for body: must match schema in anyOf"
        )

        const errorsWithoutMessage: FastifySchemaValidationError[] = [
            {
                keyword: "anyOf",
                instancePath: "/value",
                schemaPath: "#/anyOf",
                params: {}
            }
        ]
        expect(schemaErrorFormatter(errorsWithoutMessage, "body").detail).toBe(
            "Schema validation failed for body: Unknown error"
        )
    })

    it("should handle empty errors array by returning 'Validation failed'", () => {
        const result = schemaErrorFormatter([], "body")

        expect(result.status).toBe(422)
        expect(result.detail).toBe("Schema validation failed for body: Validation failed")
    })

    it("should fallback to 'unknown' when dataVar is not a string", () => {
        const errors: FastifySchemaValidationError[] = [
            {
                keyword: "type",
                instancePath: "/name",
                schemaPath: "#/properties/name/type",
                params: {},
                message: "must be string"
            }
        ]

        const resultUndefined = schemaErrorFormatter(errors, undefined as any)
        expect(resultUndefined.detail).toBe("Schema validation failed for unknown: name: must be string")

        const resultNull = schemaErrorFormatter(errors, null as any)
        expect(resultNull.detail).toBe("Schema validation failed for unknown: name: must be string")

        const resultNumber = schemaErrorFormatter(errors, 123 as any)
        expect(resultNumber.detail).toBe("Schema validation failed for unknown: name: must be string")
    })
})
