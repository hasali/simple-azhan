export function formatCountdown(ms: number): string {
    const hours = Math.floor(ms / 3600000)
    const mins = Math.floor((ms % 3600000) / 60000)
    const secs = Math.floor((ms % 60000) / 1000)
    return `${hours}h ${mins}m ${secs}s`
}