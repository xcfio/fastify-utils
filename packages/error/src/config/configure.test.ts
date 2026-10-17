import { beforeEach, describe, expect, it } from "vitest"
import { configure } from "./configure"
import { currentConfig } from "./error-config"

describe("configure", () => {
    beforeEach(() => {
        // Reset config before each test
        Object.assign(currentConfig, { baseUrl: "about:blank" })
    })

    it("should update config with new options", () => {
        configure({ baseUrl: "https://example.com/errors" })
        expect(currentConfig.baseUrl).toBe("https://example.com/errors")
    })

    it("should merge with existing config", () => {
        configure({ baseUrl: "https://test.com" })
        expect(currentConfig.baseUrl).toBe("https://test.com")

        configure({ baseUrl: "https://updated.com" })
        expect(currentConfig.baseUrl).toBe("https://updated.com")
    })

    it("should handle empty options", () => {
        const originalConfig = { ...currentConfig }
        configure({})
        expect(currentConfig).toEqual(originalConfig)
    })
})
