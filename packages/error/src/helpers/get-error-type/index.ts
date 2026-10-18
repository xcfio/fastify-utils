import { getConfig } from "../../config"

/**
 * Generates an RFC 9457 compliant `type` URI for a given error slug.
 *
 * - When `baseUrl` is `"about:blank"` (default), formats as `about:blank#<name>`.
 * - When a custom `baseUrl` is configured, formats as `<baseUrl>/<name>`.
 *
 * @param name - The error identifier slug (e.g. `"not-found"`, `"validation"`).
 * @returns A formatted URI string identifying the problem type.
 *
 * @example
 * ```typescript
 * import { getErrorType } from "@fastify-utils/error/helpers"
 *
 * getErrorType("not-found") // "about:blank#not-found"
 *
 * configure({ baseUrl: "https://api.example.com/errors" })
 * getErrorType("not-found") // "https://api.example.com/errors/not-found"
 * ```
 */
export function getErrorType(name: string): string {
    const config = getConfig()
    const baseUrl = config.baseUrl ?? "about:blank"

    if (baseUrl === "about:blank") {
        return `${baseUrl}#${name}`
    }

    return `${baseUrl}/${name}`
}
