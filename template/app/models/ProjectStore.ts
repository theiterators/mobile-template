import { ApiResponse } from "apisauce"
import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { TProject } from "app/common/types/projectType"

import { DATA_STATUS } from "../common/types"
import { apiProject } from "../services/api/apiProject"
import { reportCrash } from "../services/reports/crashReporting"

import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ProjectStoreModel = types
  .model("ProjectStore")
  .props({
    projects: types.frozen<TProject[]>(),
    dataStatus: DATA_STATUS.IDLE,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    setDataStatus(dataStatus: DATA_STATUS) {
      store.dataStatus = dataStatus
    },
    clearData() {
      store.setProp("dataStatus", DATA_STATUS.IDLE)
      store.setProp("projects", [])
    },
  }))
  .views((self) => ({
    get isDataLoading() {
      return self.dataStatus === DATA_STATUS.PENDING
    },
  }))
  .actions((self) => ({
    getProjects: () =>
      flow(function* () {
        self.setDataStatus(DATA_STATUS.PENDING)
        try {
          const response: ApiResponse<TProject[]> = yield apiProject.getProjects()
          if (!response.ok) {
            self.setDataStatus(DATA_STATUS.REJECTED)
            return
          }
          const { data } = response
          self.setProp("projects", data)
          self.setDataStatus(DATA_STATUS.FULFILLED)
        } catch (e) {
          self.setDataStatus(DATA_STATUS.REJECTED)
          reportCrash(e)
        } finally {
          self.setDataStatus(DATA_STATUS.IDLE)
        }
      })(),
  }))
  .actions((store) => ({
    onUserSignOut() {
      store.clearData()
    },
  }))

export interface ProjectStore extends Instance<typeof ProjectStoreModel> {}
export interface ProjectStoreSnapshotOut extends SnapshotOut<typeof ProjectStoreModel> {}
export interface ProjectStoreSnapshotIn extends SnapshotIn<typeof ProjectStoreModel> {}
export const createProjectStoreDefaultModel = () => types.optional(ProjectStoreModel, {})
