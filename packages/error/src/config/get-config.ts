import type { ErrorConfig } from "../types/index"
import { currentConfig } from "./error-config"

export function getConfig(): Readonly<ErrorConfig> {
    return currentConfig
}
