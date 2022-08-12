export interface ISO8601Options {
    format: 'date-time' | 'date'
    dateDelimiter: '-' | ''
    timeDelimiter: ':' | ''
    expanded: boolean
}
export function toISO8601Date(
    x: Date,
    { format = 'date-time', dateDelimiter = '-', timeDelimiter = ':', expanded = true }: Partial<ISO8601Options> = {}
): string {
    const day = `${x.getDate()}`.padStart(2, '0')
    const month = `${x.getMonth() + 1}`.padStart(2, '0')
    // use expanded representation for on standard years
    const fullYear = x.getFullYear()
    const year = `${fullYear}`.padStart(!expanded || (fullYear >= 1000 && fullYear <= 9999) ? 4 : 6, '0')
    const date = [year, month, day].join(dateDelimiter)

    if (format === 'date') {
        return date
    }

    const offset = x.getTimezoneOffset()
    let timezone = 'Z'

    if (offset !== 0) {
        const absOffset = Math.abs(offset)
        const hourOffset = `${Math.floor(absOffset / 60)}`.padStart(2, '0')
        const minuteOffset = `${absOffset % 60}`.padStart(2, '0')
        timezone = `${offset < 0 ? '+' : '-'}${hourOffset}:${minuteOffset}`
    }

    const hour = `${x.getHours()}`.padStart(2, '0')
    const minute = `${x.getMinutes()}`.padStart(2, '0')
    const second = `${x.getSeconds()}`.padStart(2, '0')

    const time = [hour, minute, second].join(timeDelimiter)
    return `${date}T${time}${timezone}`
}
