# Iterators React Native Template

Command for creating a new project:

```bash
npx @react-native-community/cli@latest init MyApp --template https://github.com/theiterators/mobile-template
```

Required dependencies:

- ruby version >= 2.7.0
- Yarn
- NodeJS

# Config CI/CD in GitLab/Github Actions

1. **EAS PROFILES CONFIG**: 
	-   Select a team in the Xcode **Signing & Capabilities** section.
	-	Create an App Identifier within your Apple Developer Account.
	-	Install the EAS client globally by running the following command: `yarn global add eas-cli`.
	-	Log in to your EAS (Expo) account by executing: `eas login`.
	-	Configure iOS profiles by running: `eas credentials --platform=ios`. When prompted to select certificate options, choose **Use an existing one for your project**.
	-	Configure the Android keystore by running: `eas credentials --platform=android`.
	-	Run `eas build --profile production` to build first version for stores
 	-	Create apps on App Store Connect and Google Play Publish
	-	Modify the `eas.json` file’s **submit** section with the application-specific information.
	-	Set all required environment variables.

2. **GITLAB/GITHUB CI/CD VARIABLES**

-	**EXPO_TOKEN**: This token is required for Expo authentication. You can generate a personal access token in your Expo account by navigating to **Account Settings -> Access Token**.

-	**FIREBASE_TOKEN**: This token is used for Firebase authentication. It can be either a personal access token or a service account key. For more details on generating a CI token, refer to the Firebase documentation: [Firebase CI Token Documentation](https://firebase.google.com/docs/cli#cli-ci-systems). To generate the token, use the command: `firebase login:ci`

- **FIREBASE_STAGING_APP_ID_ANDROID**
- **FIREBASE_PRODUCTION_APP_ID_ANDROID**
- **FIREBASE_STAGING_APP_ID_IOS**
- **FIREBASE_PRODUCTION_APP_ID_IOS**