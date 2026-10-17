import { getConfig } from "../../config/index"

export function getErrorType(name: string): string {
    const config = getConfig()
    const baseUrl = config.baseUrl ?? "about:blank"

    if (baseUrl === "about:blank") {
        return `${baseUrl}#${name}`
    }

    return `${baseUrl}/${name}`
}
