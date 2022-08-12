import { createHash } from 'crypto'

export function sha256(x: string): string {
    return createHash('sha256').update(x, 'utf8').digest('hex')
}
