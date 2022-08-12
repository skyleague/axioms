import { sep } from 'path'

/// or just backwards? ;)
const isBackwardSlash = sep === '\\'

export function normalizePath(
    path: string,
    { forceForwardSlash = isBackwardSlash }: { forceForwardSlash?: boolean } = {}
): string {
    return forceForwardSlash ? path.replace(/\\/g, '/') : path
}
