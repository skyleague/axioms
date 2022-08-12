export interface RandomGenerator {
    jump(): void
    sample(): number
    clone(): RandomGenerator
}
