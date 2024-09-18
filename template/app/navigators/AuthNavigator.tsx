import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import { AuthNavigatorParamListType, AuthScreenName } from "app/common/types"
import * as Screens from "app/screens"
import { colors } from "app/theme"

export type AuthStackScreenProps<T extends keyof AuthNavigatorParamListType> =
  NativeStackScreenProps<AuthNavigatorParamListType, T>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AuthNavigatorParamListType>()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthScreenName.Login}
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
    >
      <Stack.Screen component={Screens.LoginScreen} name={AuthScreenName.Login} />
    </Stack.Navigator>
  )
}
