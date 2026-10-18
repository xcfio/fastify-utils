import type { ErrorConfig } from "../types"
import { currentConfig } from "./error-config"

/**
 * Updates the global configuration for RFC 9457 Problem Details error generation.
 *
 * @param options - Configuration options to merge into the active configuration.
 *
 * @example
 * ```typescript
 * import { configure } from "@fastify-utils/error/config"
 *
 * configure({
 *     baseUrl: "https://api.example.com/errors"
 * })
 * ```
 */
export function configure(options: ErrorConfig): void {
    Object.assign(currentConfig, options)
}
