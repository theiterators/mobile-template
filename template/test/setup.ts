/* eslint-disable @typescript-eslint/no-magic-numbers */
// we always make sure 'react-native' gets included first
import * as ReactNative from "react-native"

import "./mocks"

import mockFile from "./mockFile"

// libraries to mock
jest.doMock("react-native", () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile),
        getSize: jest.fn(
          (
            uri: string,
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void, // eslint-disable-line @typescript-eslint/no-unused-vars
          ) => success(100, 100),
        ),
      },
      LogBox: {
        ignoreLogs: jest.fn(), // Mock LogBox.ignoreLogs
      },
    },
    ReactNative,
  )
})

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

declare const tron // eslint-disable-line @typescript-eslint/no-unused-vars

// Doen't work with jest 27
// jest.useFakeTimers()
declare global {
  let __TEST__
}
