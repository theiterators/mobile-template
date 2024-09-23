# Config EAS CI/CD in Gitlab Actions

1. [EAS_PROFILES_CONFIG]: 
	-   Select a team in xcode Signing & Capabilities section
	-	Create an App Identifier within your Apple Developer Account.
	-	Install the EAS client globally by running the following command: yarn global add eas-cli.
	-	Log in to your EAS (Expo) account by executing: eas login.
	-	Configure iOS profiles by running: eas credentials --platform=ios. When prompted to select certificate options, choose “Use an existing one for your project.”
	-	Configure the Android keystore by running: eas credentials --platform=android.
	-	Modify the [eas.json] file’s submit section with the application-specific information.
	-	Set all required env variables

2. [GITLAB_CI_CD_VARIABLES]

-	EXPO_TOKEN: This token is required for Expo authentication. You can generate a personal access token in your Expo account by navigating to Expo, under Account Settings -> Access Token.

-	FIREBASE_TOKEN: This token is used for Firebase authentication. It can be either a personal access token or a service account key. For more details on generating a CI token, refer to the Firebase documentation: [Firebase CI Token Documentation](https://firebase.google.com/docs/cli#cli-ci-systems). To generate the token, use the following command:

```bash
firebase login:ci
```

-	GITLAB_TOKEN: This token is used for GitLab API access. It can be created as a personal access token in your GitLab account by going to Profile -> Preferences -> Access Token. Ensure the [api] checkbox is selected when generating the token.


3. [EXPO_VARIABLES]

- GITLAB_PROJECT_ID: The unique identifier for your GitLab project. You can find this ID under the project’s General Settings in GitLab.

- TRIGGER_TOKEN: The unique authentication token used to trigger CI/CD pipelines programmatically via the GitLab API. You can generate a trigger token in your Gitlab account by navigating to project settings -> CI/CD -> Pipelines trigger token 




