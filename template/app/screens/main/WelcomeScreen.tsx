import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Text } from "../../components"

import { TEST_IDS } from "app/common/constants"
import { MainScreenName } from "../../common/types"
import { useStores } from "../../models"
import { MainStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../utils/hooks/useHeader"

interface WelcomeScreenProps extends MainStackScreenProps<MainScreenName.Welcome> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const {
    authStore: { logout },
  } = useStores()

  const [value, setValue] = useState("man")

  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: logout,
    },
    [logout],
  )

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Text
          testID={TEST_IDS.main.heading}
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
