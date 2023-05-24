import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import * as Screens from "app/screens"
import { colors } from "app/theme"
import { AuthNavigatorParamListType, AuthScreenName } from "app/types"
import React from "react"

export type AuthStackScreenProps<T extends keyof AuthNavigatorParamListType> =
  NativeStackScreenProps<AuthNavigatorParamListType, T>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AuthNavigatorParamListType>()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={AuthScreenName.Login}
    >
      <Stack.Screen name={AuthScreenName.Login} component={Screens.LoginScreen} />
    </Stack.Navigator>
  )
}
