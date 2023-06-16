/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from "react"
import { RefreshControl, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { Screen } from "app/components"
import { useHeader } from "app/utils/hooks"

import { MainScreenName } from "../../../common/types"
import { useStores } from "../../../models"
import { MainStackScreenProps } from "../../../navigators"
import { colors, spacing } from "../../../theme"

import { ProjectList } from "./components/ProjectList"

interface ProjectsScreenProps extends MainStackScreenProps<MainScreenName.Welcome> {}

export const ProjectsScreen: FC<ProjectsScreenProps> = observer(function ProjectsScreen(_props) {
  const {
    projectStore: { getProjects, isDataLoading, projects },
  } = useStores()

  useHeader(
    {
      titleTx: "project.projects",
      leftIcon: "back",
      onLeftPress: () => _props.navigation.goBack(),
    },
    [],
  )

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <Screen
      contentContainerStyle={$screenContentContainer}
      preset="auto"
      safeAreaEdges={["top", "bottom"]}
      ScrollViewProps={{
        refreshControl: (
          <RefreshControl
            refreshing={isDataLoading}
            tintColor={colors.palette.neutral800}
            onRefresh={getProjects}
          />
        ),
      }}
    >
      <ProjectList data={projects} />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
  flexGrow: 1,
}
