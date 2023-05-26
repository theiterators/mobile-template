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

````
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
````

## Before running app

Config your firebase project:

1. Create [firebase project](https://console.firebase.google.com/)
2. Add `android` and `ios` apps to your project
3. Download `google-services.json` and `GoogleService-Info.plist` files
4. Replace `google-services.json` and `GoogleService-Info.plist` files in `template` project

Config your apple developer account. Create [App IDs](https://developer.apple.com/account/resources/identifiers/list/appId).

Made with [Ignite](https://github.com/infinitered/ignite)
