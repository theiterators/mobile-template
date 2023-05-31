# Config CI/CD in Gitlab Actions

Add in gitlab variables:

1. FIREBASE_TOKEN: This is a token used for Firebase login. It could be a personal access token or a service account key. For more information, see the Firebase documentation on generating a CI token: https://firebase.google.com/docs/cli#cli-ci-systems

```bash
fairebase login:ci
```

2. TEAM_ID: This refers to your team ID in apple developer account.

3. ISSUER_ID: This is your issuer ID in apple developer account. You can get from [SPACESHIP_CONNECT_API_KEY_FILE](https://docs.fastlane.tools/app-store-connect-api/)

4. KEY_ID: This is your key ID in apple developer account. You can get from [SPACESHIP_CONNECT_API_KEY_FILE](https://docs.fastlane.tools/app-store-connect-api/)
5. KEY_CONTENT: This is your key content in apple developer account. You can get from [SPACESHIP_CONNECT_API_KEY_FILE](https://docs.fastlane.tools/app-store-connect-api/)

6. MATCH_PASSWORD: The password used to encrypt/decrypt the repository used to store your distrbution certificates and provisioning profiles. Example of password: iterators. (http://docs.fastlane.tools/best-practices/continuous-integration/codemagic/#adding-environment-variables)
