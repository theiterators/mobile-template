const { defaults: tsjPreset } = require("ts-jest/presets")

thirdPartyIgnorePatterns = []

/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  ...tsjPreset,
  preset: "jest-expo",
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${thirdPartyIgnorePatterns.join("|")})`,
    "jest-runner",
  ],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/mockFile.ts",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.maestro/", "@react-native"],
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/test/setup.ts"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
}
