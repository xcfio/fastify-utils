import { ValidationErrorResponse, schemaErrorFormatter } from "./"
import { describe, expect, it } from "vitest"

describe("schema/index.ts exports", () => {
    it("should export schemaErrorFormatter", () => {
        expect(schemaErrorFormatter).toBeDefined()
        expect(typeof schemaErrorFormatter).toBe("function")
    })

    it("should export ValidationErrorResponse", () => {
        expect(ValidationErrorResponse).toBeDefined()
        expect(typeof ValidationErrorResponse).toBe("object")
    })
})
