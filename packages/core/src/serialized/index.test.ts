// oxlint-disable eslint-js/no-restricted-syntax
import { describe, expect, it } from "vitest"
import { serialize } from "./"

describe("serialized/index.ts exports", () => {
    it("should export serialize function", () => {
        expect(serialize).toBeDefined()
        expect(typeof serialize).toBe("function")
    })
})
