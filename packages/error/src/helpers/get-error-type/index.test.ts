import { beforeEach, describe, expect, it } from "vitest"
import { currentConfig } from "../../config/error-config"
import { configure } from "../../config/index"
import { getErrorType } from "./index"

describe("getErrorType", () => {
    beforeEach(() => {
        // Reset config before each test
        Object.assign(currentConfig, { baseUrl: "about:blank" })
    })

    it("should return about:blank#name format when baseUrl is about:blank", () => {
        const result = getErrorType("not-found")
        expect(result).toBe("about:blank#not-found")
    })

    it("should return baseUrl/name format when baseUrl is not about:blank", () => {
        configure({ baseUrl: "https://api.example.com/errors" })
        const result = getErrorType("not-found")
        expect(result).toBe("https://api.example.com/errors/not-found")
    })

    it("should handle different error names", () => {
        configure({ baseUrl: "https://errors.com" })
        expect(getErrorType("validation")).toBe("https://errors.com/validation")
        expect(getErrorType("authentication")).toBe("https://errors.com/authentication")
        expect(getErrorType("internal-server-error")).toBe("https://errors.com/internal-server-error")
    })

    it("should use # separator only for about:blank", () => {
        const result = getErrorType("test-error")
        expect(result).toContain("#")
        expect(result).toBe("about:blank#test-error")

        configure({ baseUrl: "http://example.com" })
        const result2 = getErrorType("test-error")
        expect(result2).not.toContain("#")
        expect(result2).toBe("http://example.com/test-error")
    })

    it("should default to about:blank when baseUrl is undefined", () => {
        Object.assign(currentConfig, { baseUrl: undefined })
        const result = getErrorType("test-error")
        expect(result).toBe("about:blank#test-error")
    })
})
