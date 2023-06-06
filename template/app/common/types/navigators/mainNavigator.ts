import { NavigationProp } from "@react-navigation/native"

export enum MainScreenName {
  Welcome = "Welcome",
  Projects = "Projects",
}
export type MainNavigatorParamListType = {
  [MainScreenName.Welcome]: undefined
  [MainScreenName.Projects]: undefined
}

export type MainNavigationProps = NavigationProp<MainNavigatorParamListType>
