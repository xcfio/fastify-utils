// oxlint-disable eslint-js/no-restricted-syntax
/**
 * Represents a single schema validation error produced by AJV.
 *
 * @example
 * ```typescript
 * const err: SchemaValidationError = {
 *   keyword: "type",
 *   message: "must be string",
 *   instancePath: "/email"
 * }
 * ```
 */
export interface SchemaValidationError {
    instancePath?: string
    keyword: string
    message?: string
    params?: {
        allowedValue?: any
        [key: string]: any
    }
}

/**
 * Maps instance paths (e.g. `/email`, `/address`) to their corresponding AJV validation errors.
 * Used internally to group errors before formatting them into a single message string.
 *
 * @example
 * ```typescript
 * const byPath: ErrorsByPath = {
 *   "/email": [{ keyword: "type", message: "must be string" }],
 *   "/role":  [{ keyword: "const", params: { allowedValue: "admin" } }]
 * }
 * ```
 */
export interface ErrorsByPath {
    [key: string]: SchemaValidationError[]
}

/**
 * Recursively transforms a type by converting all `Date` values to `string`,
 * preserving `null`, arrays, and nested objects.
 *
 * @template T - The source type to serialize.
 *
 * @example
 * type User = { name: string; createdAt: Date; tags: Date[] }
 * type SerializedUser = Serialized<User>
 * // { name: string; createdAt: string; tags: string[] }
 */
export type Serialize<T> = {
    [K in keyof T]: T[K] extends Date
        ? string
        : T[K] extends Date | null
          ? string | null
          : T[K] extends (infer U)[]
            ? U extends Date
                ? string[]
                : Serialize<U>[]
            : T[K] extends object
              ? Serialize<T[K]>
              : T[K]
}
