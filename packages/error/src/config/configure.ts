import type { ErrorConfig } from "../types/index"
import { currentConfig } from "./error-config"

export function configure(options: ErrorConfig): void {
    Object.assign(currentConfig, options)
}
