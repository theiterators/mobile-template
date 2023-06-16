import React from "react"
import { createNativeStackNavigator,NativeStackScreenProps } from "@react-navigation/native-stack"

import { MainNavigatorParamListType, MainScreenName } from "app/common/types"
import * as Screens from "app/screens"
import { colors } from "app/theme"

export type MainStackScreenProps<T extends keyof MainNavigatorParamListType> =
  NativeStackScreenProps<MainNavigatorParamListType, T>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<MainNavigatorParamListType>()

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={MainScreenName.Welcome}
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
    >
      <Stack.Screen component={Screens.WelcomeScreen} name={MainScreenName.Welcome} />
      <Stack.Screen component={Screens.ProjectsScreen} name={MainScreenName.Projects} />
    </Stack.Navigator>
  )
}
