import type { ErrorConfig } from "../types/index"
import { currentConfig } from "./error-config"

/**
 * Retrieves a readonly reference to the active global error configuration.
 *
 * @returns A frozen view of the current {@link ErrorConfig} settings.
 *
 * @example
 * ```typescript
 * import { getConfig } from "@fastify-utils/error/config"
 *
 * const config = getConfig()
 * console.log(config.baseUrl) // e.g. "about:blank"
 * ```
 */
export function getConfig(): Readonly<ErrorConfig> {
    return currentConfig
}
