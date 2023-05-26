import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "app/components"

import { spacing } from "app/theme"

import { AuthStackScreenProps } from "../../navigators"
import { AuthScreenName } from "../../common/types"
import { LoginForm } from "./containers"
import { TEST_IDS } from "app/common/constants"

interface LoginScreenProps extends AuthStackScreenProps<AuthScreenName.Login> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text
        testID={TEST_IDS.auth.login.heading}
        tx="loginScreen.signIn"
        preset="heading"
        style={$signIn}
      />
      <LoginForm />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
  justifyContent: "center",
  flexGrow: 1,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
}
