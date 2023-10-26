import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { TEST_IDS } from "app/common/constants"
import { Screen, Text } from "app/components"
import { androidAvoidOffset, spacing } from "app/theme"

import { AuthScreenName } from "../../common/types"
import { AuthStackScreenProps } from "../../navigators"

import { LoginForm } from "./containers"

interface LoginScreenProps extends AuthStackScreenProps<AuthScreenName.Login> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  return (
    <Screen
      contentContainerStyle={$screenContentContainer}
      preset="auto"
      safeAreaEdges={["top", "bottom"]}
    >
      <Text
        preset="heading"
        style={$signIn}
        testID={TEST_IDS.auth.login.heading}
        tx="loginScreen.signIn"
      />
      <LoginForm />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
  flexGrow: 1,
}
const $formContentContainer: ViewStyle = {
  flex: 1,
}
const $signIn: TextStyle = {
  marginBottom: spacing.small,
}
