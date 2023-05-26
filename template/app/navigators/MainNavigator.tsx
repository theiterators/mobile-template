import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import * as Screens from "app/screens"
import { colors } from "app/theme"
import { MainNavigatorParamListType, MainScreenName } from "app/common/types"
import React from "react"

export type MainStackScreenProps<T extends keyof MainNavigatorParamListType> =
  NativeStackScreenProps<MainNavigatorParamListType, T>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<MainNavigatorParamListType>()

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={MainScreenName.Welcome}
    >
      <Stack.Screen name={MainScreenName.Welcome} component={Screens.WelcomeScreen} />
    </Stack.Navigator>
  )
}
