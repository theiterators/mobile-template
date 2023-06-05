import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Platform, TextStyle, ViewStyle } from "react-native"

import { androidAvoidOffset, spacing } from "app/theme"
import { Screen, Text } from "app/components"
import { TEST_IDS } from "app/common/constants"
import { AvoidSoftInputView } from "react-native-avoid-softinput"
import { AuthScreenName } from "../../common/types"
import { AuthStackScreenProps } from "../../navigators"
import { LoginForm } from "./containers"

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
      {Platform.OS === "android" ? (
        <AvoidSoftInputView
          style={$formContentContainer}
          avoidOffset={androidAvoidOffset}
          easing="easeIn"
        >
          <LoginForm />
        </AvoidSoftInputView>
      ) : (
        <LoginForm />
      )}
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
