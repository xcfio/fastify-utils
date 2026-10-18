import { describe, expect, it } from "vitest"
import { HttpError } from "./"

describe("core/index.ts exports", () => {
    it("should export HttpError class", () => {
        expect(HttpError).toBeDefined()
        expect(typeof HttpError).toBe("function")
    })

    it("should be able to instantiate HttpError", () => {
        const error = new HttpError({
            type: "about:blank#test",
            title: "Test Error",
            status: 400,
            detail: "Test detail"
        })
        expect(error).toBeInstanceOf(HttpError)
    })
})
