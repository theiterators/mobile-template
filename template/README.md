# Welcome to your new mobile app!

Currently includes:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- Reactotron
- MMKV
- Firebase
- React Hook Form
- And more!

## Quick Start

The Mobile template project's structure will look similar to this:

```
├── app
│   ├── common
│   │   ├── constants
│   │   ├── enums
│   │   └── types
│   ├── components
│   ├── config
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   │   └── feature
│   │       ├── __tests__
│   │       ├── common
│   │       ├── components
│   │       ├── containers
│   │       ├── logic
│   │       └── FeatureScreen.tsx
│   ├── services
│   ├── theme
│   ├── utils
│   │  ├── helpers
│   │  ├── hooks
│   │  ├── storage
│   │  └── validators
│   ├── app.tsx
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   ├── setup.ts
├── .maestro
│   ├── Feature.yaml
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   └── templates
|       |── app-icon
│       ├── component
│       ├── model
│       ├── navigator
│       └── screen
├── index.js
├── ios
│   └── PlaceholderName
│       ├── firebase
│   ├── PlaceholderName-tvOS
│   ├── PlaceholderName-tvOSTests
│   ├── PlaceholderName.xcodeproj
│   └── PlaceholderNameTests
├── .env
└── package.json
```

**common**
This is where your common types, constants, and enums will live.

**components**
This is where your reusable components live which help you build your screens.

**config**
This is where your application's configuration will live. Production and development environments are provided for you, but you are free to add more.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find templates you can customize to help you get started with React Native.

### ./test directory

This directory will hold your Jest configs and mocks.

## Running Maestro end-to-end tests

Example flow for running Maestro end-to-end tests locally in .maestro/Login.yaml

For running you need to have installed [Maestro](https://maestro.mobile.dev/getting-started/installing-maestro)

Commnad for running tests:

```bash
yarn test:maestro
```

## Before running app

Run npm run init:
- It will run the init script to setup  environment 

Config your firebase project:

1. Create [firebase project](https://console.firebase.google.com/)
2. Add `android` and `ios` apps to your project
3. Download `google-services.json` and `GoogleService-Info.plist` files
4. Replace `google-services.json` and `GoogleService-Info.plist` files in `template` project
5. Login to firebase in terminal by running `firebase login:ci`
6. Add `FIREBASE_TOKEN` to `fastlane/Appfile`
7. Change firebase App IDs to yours in `fastlane/Appfile`

Config your iOS project:

1. Create [App IDs](https://developer.apple.com/account/resources/identifiers/list/appId).
2. Create [Certificates](https://developer.apple.com/account/resources/certificates/list). ADHOC certificate is required for deploying to Firebase.
3. Create [Provisioning Profiles](https://developer.apple.com/account/resources/profiles/list).
4. Add created certificates to your keychain. Keychain name should be `projects` and password should be `iterators`.
5. Add Profiles to your project using Xcode.

Make sure you have installed:

1. [node_modules](https://classic.yarnpkg.com/en/docs/install/#mac-stable). Run `yarn` in main directory.
2. [CocoaPods](https://cocoapods.org/). Run `pod install` in `ios` directory.
3. [Fastlane](https://docs.fastlane.tools/getting-started/ios/setup/). Run `bundle install` in main directory.

## Running app

1. Run `yarn start` in main directory.
2. Run `yarn ios:staging` or `yarn android:staging:debug` in main directory.

## Bump version

1. run `export GITLAB_TOKEN=your_gitlab_token` in code editor terminal
2. run `npm run release` to automatically bump version and make git tag

## CI/CD

You have configured CI/CD for your project. You can change it for your needs and remove unused files.

1. Github:
   - `.github/workflows` directory contains 2 files: `build.yml` and `staging.yml`.
   - [GITHUB_INSTRUCTION](GITHUB_INSTRUCTION.md) - instructions for configuring CI/CD for your project.
2. Gitlab:
   - `.gitlab-ci` file contains 2 stages: `build` and `deploy`.
   - [GITLAB_INSTRUCTION](GITLAB_INSTRUCTION.md) - instructions for configuring CI/CD for your project.
   - `Gemfile.android` - contains gems for building android project.
3. EAS_GITLAB:
   - `.gitlab-ci` file contains 1 stages: `build_deploy` and pipelines for different builds.
   - [EAS_INSTRUCTION](EAS_INSTRUCTION.md) - instructions for configuring CI/CD for your project.

---

Made with [Ignite](https://github.com/infinitered/ignite)
