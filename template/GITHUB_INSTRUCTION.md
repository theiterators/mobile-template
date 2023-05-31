# Config CI/CD in Github Actions

Add in github secrets:

1. FIREBASE_TOKEN: This is a token used for Firebase login. It could be a personal access token or a service account key. For more information, see the Firebase documentation on generating a CI token: https://firebase.google.com/docs/cli#cli-ci-systems

```bash
fairebase login:ci
```

2. TEAM_ID: This refers to your team ID in apple developer account.

3. ISSUER_ID: This is your issuer ID in apple developer account. You can get from [SPACESHIP_CONNECT_API_KEY_FILE](https://docs.fastlane.tools/app-store-connect-api/)

4. KEY_ID: This is your key ID in apple developer account. You can get from [SPACESHIP_CONNECT_API_KEY_FILE](https://docs.fastlane.tools/app-store-connect-api/)
5. KEY_CONTENT: This is your key content in apple developer account. You can get from [SPACESHIP_CONNECT_API_KEY_FILE](https://docs.fastlane.tools/app-store-connect-api/)

6. MATCH_PASSWORD: The password used to encrypt/decrypt the repository used to store your distrbution certificates and provisioning profiles. Example of password: iterators. (http://docs.fastlane.tools/best-practices/continuous-integration/codemagic/#adding-environment-variables)

7. MATCH_DEPLOY_KEY: The Github deploy key used to access the repository used to store your distrbution certificates and provisioning profiles.

Command to generate deploy key:

```bash
ssh-keygen -t ed25519 -C "USERNAME@EMAIL.com"
```

‌This command will create and store an SSH key. You use two parameters:

1. -t ed25519 to specify which algorithm to use to generate the key. You chose ED25519, a very secure and efficient algorithm.
2. -C USERNAME@EMAIL.com to append your email as a comment at the end of the key. Make sure to replace USERNAME@EMAIL.com with your actual email.

After generating the key, you need to add it to your Github repository. To do so, you need to copy the content of the public key (the one with the .pub extension) and add it to your repository as a deploy key. To copy the content of the public key, run the following command:

```bash
cat ~/.ssh/id_ed25519.pub
```

Your private key is stored in ~/.ssh/id_ed25519. You need to copy your private key and add it to your repository as a secret with name MATCH_DEPLOY_KEY. To copy the content of the private key, run the following command:

```bash
cat ~/.ssh/id_ed25519
```
