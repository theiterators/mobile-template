import { delay } from "../delay"

describe("delay", () => {
  it("should wait for the specified duration", () => {
    const start = Date.now()
    const duration = 1000 // milliseconds

    delay(duration).then(() => {
      const end = Date.now()
      const elapsed = end - start

      // Allow a small margin of error (e.g., 50ms) due to execution time variations
      const marginOfError = 50

      expect(elapsed).toBeGreaterThanOrEqual(duration - marginOfError)
      expect(elapsed).toBeLessThanOrEqual(duration + marginOfError)
    })
  })
})
