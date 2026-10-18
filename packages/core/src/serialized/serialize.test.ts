// oxlint-disable eslint-js/no-restricted-syntax
import { describe, expect, it } from "vitest"
import { serialize } from "./serialize"

describe("serialize", () => {
    it("should return non-object or falsy inputs as-is", () => {
        expect(serialize(null as any)).toBe(null)
        expect(serialize(undefined as any)).toBe(undefined)
        expect(serialize("string" as any)).toBe("string")
        expect(serialize(123 as any)).toBe(123)
        expect(serialize(true as any)).toBe(true)
    })

    it("should serialize an empty object to an empty object", () => {
        expect(serialize({})).toEqual({})
    })

    it("should convert Date instances to ISO 8601 strings", () => {
        const date = new Date("2026-01-01T00:00:00.000Z")
        const input = { createdAt: date }
        const result = serialize(input)

        expect(result).toEqual({ createdAt: "2026-01-01T00:00:00.000Z" })
    })

    it("should convert null and undefined properties to null", () => {
        const input = {
            a: null,
            b: undefined,
            name: "test"
        }
        const result = serialize(input)

        expect(result).toEqual({
            a: null,
            b: null,
            name: "test"
        })
    })

    it("should serialize arrays of Date instances", () => {
        const d1 = new Date("2026-01-01T00:00:00.000Z")
        const d2 = new Date("2026-01-02T00:00:00.000Z")
        const input = { dates: [d1, d2] }
        const result = serialize(input)

        expect(result).toEqual({
            dates: ["2026-01-01T00:00:00.000Z", "2026-01-02T00:00:00.000Z"]
        })
    })

    it("should serialize arrays of nested objects containing Dates", () => {
        const d1 = new Date("2026-01-01T00:00:00.000Z")
        const input = {
            users: [
                { id: 1, joinedAt: d1 },
                { id: 2, joinedAt: null }
            ]
        }
        const result = serialize(input)

        expect(result).toEqual({
            users: [
                { id: 1, joinedAt: "2026-01-01T00:00:00.000Z" },
                { id: 2, joinedAt: null }
            ]
        })
    })

    it("should preserve primitive elements inside arrays", () => {
        const input = {
            tags: ["tag1", "tag2"],
            numbers: [1, 2, 3],
            flags: [true, false]
        }
        const result = serialize(input)

        expect(result).toEqual({
            tags: ["tag1", "tag2"],
            numbers: [1, 2, 3],
            flags: [true, false]
        })
    })

    it("should handle null or non-object items within arrays", () => {
        const input = {
            mixed: [null, undefined, 42, "hello"]
        }
        const result = serialize(input as any)

        expect(result).toEqual({
            mixed: [null, undefined, 42, "hello"]
        })
    })

    it("should recursively serialize nested objects", () => {
        const d1 = new Date("2026-01-01T00:00:00.000Z")
        const input = {
            title: "Post",
            author: {
                name: "Cool",
                profile: {
                    createdAt: d1,
                    bio: "Developer"
                }
            }
        }
        const result = serialize(input)

        expect(result).toEqual({
            title: "Post",
            author: {
                name: "Cool",
                profile: {
                    createdAt: "2026-01-01T00:00:00.000Z",
                    bio: "Developer"
                }
            }
        })
    })

    it("should pass through primitive properties unchanged", () => {
        const sym = Symbol("test")
        const input = {
            str: "hello",
            num: 42,
            bool: true,
            big: 100n,
            sym
        }
        const result = serialize(input)

        expect(result).toEqual({
            str: "hello",
            num: 42,
            bool: true,
            big: 100n,
            sym
        })
    })
})
