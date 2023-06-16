import { NavigationProp } from "@react-navigation/native"

export enum MainScreenName {
  Projects = "Projects",
  Welcome = "Welcome"
}
export type MainNavigatorParamListType = {
  [MainScreenName.Welcome]: undefined
  [MainScreenName.Projects]: undefined
}

export type MainNavigationProps = NavigationProp<MainNavigatorParamListType>
