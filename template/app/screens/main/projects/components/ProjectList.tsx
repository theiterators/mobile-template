import { FlashList } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

import { spacing } from "app/theme"

import { TProject } from "app/common/types/projectType"
import { ProjectListItem } from "./ProjectListItem"
import { ListItem } from "app/components"

interface IProjectListProps {
  data: TProject[]
}

const ItemSeparatorComponent = () => <ListItem height={spacing.tiny} />
const renderItem = ({ item }: { item: TProject }) => {
  return <ProjectListItem item={item} />
}

export const ProjectList: FC<IProjectListProps> = observer(({ data }) => {
  return (
    <View style={$container}>
      <FlashList
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={data}
        estimatedItemSize={30}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  marginTop: spacing.medium,
}
