import { NavigationProp } from "@react-navigation/native"

export enum MainScreenName {
  Welcome = "Welcome",
}
export type MainNavigatorParamListType = {
  [MainScreenName.Welcome]: undefined
}

export type MainNavigationProps = NavigationProp<MainNavigatorParamListType>
