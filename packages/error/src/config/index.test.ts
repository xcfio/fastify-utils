import { describe, expect, it } from "vitest"
import { configure, getConfig } from "./index"

describe("config/index.ts exports", () => {
    it("should export configure function", () => {
        expect(configure).toBeDefined()
        expect(typeof configure).toBe("function")
    })

    it("should export getConfig function", () => {
        expect(getConfig).toBeDefined()
        expect(typeof getConfig).toBe("function")
    })
})
