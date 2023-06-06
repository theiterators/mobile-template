import { ProjectLocalStore } from "../logic/projectsLocalStore"

describe("ProjectLocalStore", () => {
  describe("date", () => {
    it("should return an empty string when item is not set", () => {
      const store = new ProjectLocalStore(null)
      expect(store.date).toBe("")
    })

    it("should return the formatted date when item is set", () => {
      const item: any = {
        createdAt: "2022-01-01T00:00:00.000Z",
      }
      const store = new ProjectLocalStore(item)
      expect(store.date).toBe("01.01.2022")
    })
  })
})
