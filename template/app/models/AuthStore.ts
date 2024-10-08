import { ApiResponse } from "apisauce"
import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { showAlert } from "app/utils/helpers"

import { DATA_STATUS } from "../common/types"
import { appLifeCycle } from "../services"
import { ILoginRequestData, ILoginResponseData } from "../services/api"
import { apiAuth } from "../services/api/apiAuth"
import { reportCrash } from "../services/reports/crashReporting"

import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    accessToken: types.maybe(types.string),
    dataStatus: DATA_STATUS.IDLE,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    initializeWithAccessToken(accessToken: string | null) {
      accessToken && store.setProp("accessToken", accessToken)
    },
    clearAuthData() {
      store.setProp("accessToken", "")
    },
    setDataStatus(dataStatus: DATA_STATUS) {
      store.dataStatus = dataStatus
    },
  }))
  .views((self) => ({
    get isAuthenticated() {
      return !!self.accessToken
    },
    get isDataLoading() {
      return self.dataStatus === DATA_STATUS.PENDING
    },
  }))
  .actions((self) => ({
    onAppStarted: () => {
      self.initializeWithAccessToken(self.accessToken)
      appLifeCycle.onTokenRestored()
    },
    login: (data: ILoginRequestData) =>
      flow(function* () {
        self.setDataStatus(DATA_STATUS.PENDING)
        try {
          const response: ApiResponse<ILoginResponseData> = yield apiAuth.login(data)
          if (!response.ok) {
            showAlert({ message: "Wrong credentials" })
            self.setDataStatus(DATA_STATUS.REJECTED)
            return
          }
          const {
            data: { token },
          } = response
          self.initializeWithAccessToken(token)
          appLifeCycle.onUserSignIn()

          self.setDataStatus(DATA_STATUS.FULFILLED)
        } catch (e) {
          self.setDataStatus(DATA_STATUS.REJECTED)
          reportCrash(e)
        } finally {
          self.setDataStatus(DATA_STATUS.IDLE)
        }
      })(),

    logout: () => {
      self.setDataStatus(DATA_STATUS.PENDING)
      try {
        self.clearAuthData()
        appLifeCycle.onUserSignOut()
        self.setDataStatus(DATA_STATUS.FULFILLED)
      } catch (e) {
        self.setDataStatus(DATA_STATUS.REJECTED)
        reportCrash(e)
      } finally {
        self.setDataStatus(DATA_STATUS.IDLE)
      }
    },
  }))

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStoreModel> {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
