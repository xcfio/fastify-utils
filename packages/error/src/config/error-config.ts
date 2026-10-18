import type { ErrorConfig } from "../types/index"

/**
 * Default configuration settings for RFC 9457 Problem Details.
 *
 * Uses the `RFC9457_BASE_URL` environment variable if defined, falling back to `"about:blank"`.
 */
export const defaultConfig: ErrorConfig = {
    baseUrl: process.env.RFC9457_BASE_URL ?? "about:blank"
}

/**
 * Active runtime configuration for RFC 9457 Problem Details.
 * Initialized with {@link defaultConfig} and mutated by {@link configure}.
 */
export const currentConfig: ErrorConfig = { ...defaultConfig }
