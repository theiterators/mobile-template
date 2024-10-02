import { MMKVStorage } from "."

describe("Mmkv test", () => {
  it("functions correctly", () => {
    const testObject = {
      key1: "value1",
      key2: "value2",
    }
    MMKVStorage.save("testString", "value")
    MMKVStorage.save("testNumber", 5)
    MMKVStorage.save("testBoolean", false)
    MMKVStorage.save("testObject", testObject)

    expect(MMKVStorage.load("testString", "string")).toStrictEqual("value")
    expect(MMKVStorage.load("testString", "number")).toBeUndefined()
    expect(MMKVStorage.load("testNumber", "number")).toStrictEqual(5)
    expect(MMKVStorage.load("testBoolean", "boolean")).toStrictEqual(false)
    expect(MMKVStorage.load("testObject", "object")).toStrictEqual(testObject)
    expect(MMKVStorage.getAllKeys()).toEqual(
      expect.arrayContaining(["testString", "testNumber", "testBoolean", "testObject"]),
    )

    MMKVStorage.remove("testBoolean")
    expect(MMKVStorage.contains("testBoolean")).toBeFalsy()
    expect(MMKVStorage.getAllKeys()).toEqual(expect.arrayContaining(["testString", "testNumber"]))
    MMKVStorage.clear()
    expect(MMKVStorage.storage.toString()).toStrictEqual("MMKV (mmkv.default): []")
  })
})
