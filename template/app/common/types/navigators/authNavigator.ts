import { NavigationProp } from "@react-navigation/native"

export enum AuthScreenName {
  Login = "Login",
}

export type AuthNavigatorParamListType = {
  [AuthScreenName.Login]: undefined
}

export type AuthNavigationProps = NavigationProp<AuthNavigatorParamListType>
