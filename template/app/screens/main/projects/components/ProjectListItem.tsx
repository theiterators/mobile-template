import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { observer, useLocalObservable } from "mobx-react-lite"

import { TProject } from "app/common/types/projectType"
import { Text } from "app/components"
import { colors } from "app/theme"

import { ProjectLocalStore } from "../logic/projectsLocalStore"

export interface IProjectListItemProps {
  item: TProject
}

export const ProjectListItem: FC<IProjectListItemProps> = observer(({ item }) => {
  const localStore = useLocalObservable(() => new ProjectLocalStore(item))

  return (
    <View style={$container}>
      <Text text={item.name} />
      <Text text={localStore.date} />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.neutral600,
}
