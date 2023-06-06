import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { RefreshControl, ViewStyle } from "react-native"

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
    projectStore: { getProjects, projects, isDataLoading },
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
      ScrollViewProps={{
        refreshControl: (
          <RefreshControl
            refreshing={isDataLoading}
            tintColor={colors.palette.neutral800}
            onRefresh={getProjects}
          />
        ),
      }}
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
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
