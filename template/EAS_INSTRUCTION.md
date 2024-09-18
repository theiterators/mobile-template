# Config EAS CI/CD in Gitlab Actions

1. EAS_PROFILES_CONFIG: $
   - install eas client globally `yarn global add eas-cli`
   - run `- eas login` to enter eas(expo) account
   - run `- eas credentials --platform=ios` to configure ios profiles
   - run `- eas credentials --platform=android` to configure android keystore
   - adjust [eas.json] submit section with app specific information

[GITLAB_CI_CD_VARIABLES]

2. FIREBASE_TOKEN: This is a token used for Firebase login. It could be a personal access token or a service account key. For more information, see the Firebase documentation on generating a CI token: https://firebase.google.com/docs/cli#cli-ci-systems

```bash
fairebase login:ci
```

3. EXPO_TOKEN This is a token used for Expo login. It could be a personal access token generated in expo account [https://expo.dev] under Account settings -> Access Token

4. GITLAB_TOKEN This is a token used for gitlab api. It could be a personal access token generated in gitlab account under profile -> preferences -> Access token. Make sure [api] checkbox is selected

5. FIREBASE_APP_ID This is an id used for firebase app upload. Can be found on firebase settings tab and stored in local [gitlab-ci.yml] file
