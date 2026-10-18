import { describe, expect, it } from "vitest"
import { createErrorByStatus, extractCause, getErrorType, isHttpError, isValidRFC9457Json, normalizeToString } from "./"

describe("helpers/index.ts exports", () => {
    it("should export createErrorByStatus", () => {
        expect(createErrorByStatus).toBeDefined()
        expect(typeof createErrorByStatus).toBe("function")
    })

    it("should export extractCause", () => {
        expect(extractCause).toBeDefined()
        expect(typeof extractCause).toBe("function")
    })

    it("should export getErrorType", () => {
        expect(getErrorType).toBeDefined()
        expect(typeof getErrorType).toBe("function")
    })

    it("should export isHttpError", () => {
        expect(isHttpError).toBeDefined()
        expect(typeof isHttpError).toBe("function")
    })

    it("should export isValidRFC9457Json", () => {
        expect(isValidRFC9457Json).toBeDefined()
        expect(typeof isValidRFC9457Json).toBe("function")
    })

    it("should export normalizeToString", () => {
        expect(normalizeToString).toBeDefined()
        expect(typeof normalizeToString).toBe("function")
    })
})
