import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { TEST_IDS } from "app/common/constants"

import { MainScreenName } from "../../../common/types"
import { Button, Text } from "../../../components"
import { useStores } from "../../../models"
import { MainStackScreenProps } from "../../../navigators"
import { colors, spacing } from "../../../theme"
import { useHeader } from "../../../utils/hooks/useHeader"

interface WelcomeScreenProps extends MainStackScreenProps<MainScreenName.Welcome> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const {
    authStore: { logout },
  } = useStores()

  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: logout,
    },
    [logout],
  )

  const onNavigationPress = () => {
    _props.navigation.navigate(MainScreenName.Projects)
  }

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Text
          preset="heading"
          style={$welcomeHeading}
          testID={TEST_IDS.main.heading}
          tx="welcomeScreen.readyForLaunch"
        />
        <Button tx="project.openProjects" onPress={onNavigationPress} />
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
