import { describe, expect, it } from "vitest"
import { ValidationErrorResponse } from "./"
import { Value } from "typebox/value"

describe("ValidationErrorResponse", () => {
    it("should be defined as a TypeBox schema", () => {
        expect(ValidationErrorResponse).toBeDefined()
        expect(ValidationErrorResponse.type).toBe("object")
        expect(ValidationErrorResponse.properties).toBeDefined()
    })

    it("should validate a valid minimal RFC 9457 validation error object", () => {
        const payload = {
            type: "about:blank#validation",
            title: "Validation Error",
            status: 422,
            detail: "Schema validation failed for body: email: must be string"
        }

        expect(Value.Check(ValidationErrorResponse, payload)).toBe(true)
    })

    it("should validate a full RFC 9457 validation error object with optional fields", () => {
        const payload = {
            type: "about:blank#validation",
            title: "Validation Error",
            status: 422,
            detail: "Schema validation failed for body: email: must be string",
            instance: "/users",
            validationErrors: {
                email: ["must be string"],
                age: ["must be >= 18"]
            }
        }

        expect(Value.Check(ValidationErrorResponse, payload)).toBe(true)
    })

    it("should reject an object with an incorrect status code", () => {
        const payload = {
            type: "about:blank#validation",
            title: "Validation Error",
            status: 400,
            detail: "Schema validation failed"
        }

        expect(Value.Check(ValidationErrorResponse, payload)).toBe(false)
    })

    it("should reject an object missing required fields", () => {
        const missingDetail = {
            type: "about:blank#validation",
            title: "Validation Error",
            status: 422
        }
        expect(Value.Check(ValidationErrorResponse, missingDetail)).toBe(false)

        const missingStatus = {
            type: "about:blank#validation",
            title: "Validation Error",
            detail: "Schema validation failed"
        }
        expect(Value.Check(ValidationErrorResponse, missingStatus)).toBe(false)

        const missingTitle = {
            type: "about:blank#validation",
            status: 422,
            detail: "Schema validation failed"
        }
        expect(Value.Check(ValidationErrorResponse, missingTitle)).toBe(false)

        const missingType = {
            title: "Validation Error",
            status: 422,
            detail: "Schema validation failed"
        }
        expect(Value.Check(ValidationErrorResponse, missingType)).toBe(false)
    })

    it("should reject an object with invalid field types", () => {
        const invalidType = {
            type: 123,
            title: "Validation Error",
            status: 422,
            detail: "Schema validation failed"
        }
        expect(Value.Check(ValidationErrorResponse, invalidType)).toBe(false)

        const invalidStatus = {
            type: "about:blank#validation",
            title: "Validation Error",
            status: "422",
            detail: "Schema validation failed"
        }
        expect(Value.Check(ValidationErrorResponse, invalidStatus)).toBe(false)

        const invalidValidationErrors = {
            type: "about:blank#validation",
            title: "Validation Error",
            status: 422,
            detail: "Schema validation failed",
            validationErrors: "not-a-record"
        }
        expect(Value.Check(ValidationErrorResponse, invalidValidationErrors)).toBe(false)
    })
})
