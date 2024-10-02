import { MMKV } from "react-native-mmkv"

type mmkvValueType = number | object | string | boolean | undefined

type Load = <T extends "number" | "boolean" | "string" | "object">(
  key: string,
  type: T,
) => T extends "number"
  ? number
  : T extends "boolean"
    ? boolean
    : T extends "string"
      ? string
      : object

class Storage {
  storage: MMKV = new MMKV()

  save = (key: string, value: mmkvValueType) => {
    let valueToSaved = value
    if (typeof value === "object") {
      valueToSaved = JSON.stringify(value)
    }
    this.storage.set(key, valueToSaved as string)
  }

  load: Load = (key, type) => {
    switch (type) {
      case "boolean":
        return this.storage.getBoolean(key)
      case "number":
        return this.storage.getNumber(key)
      case "object":
        try {
          return JSON.parse(this.storage.getString(key))
        } catch {
          return this.storage.getString(key)
        }
      default:
        return this.storage.getString(key)
    }
  }

  clear = () => {
    this.storage.clearAll()
  }

  remove = (key: string) => {
    this.storage.delete(key)
  }

  getAllKeys = () => {
    return this.storage.getAllKeys()
  }

  contains = (key: string) => {
    return this.storage.contains(key)
  }

  // Functions for Reactron
  setItem = async (key: string, value: mmkvValueType) => {
    return new Promise((resolve) => {
      resolve(this.save(key, value))
    })
  }

  getItem = (key: string): Promise<mmkvValueType> => {
    return new Promise((resolve) => {
      resolve(this.load(key, "object"))
    })
  }
}

export default new Storage()
