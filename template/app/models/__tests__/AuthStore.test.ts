import { appLifeCycle } from "app/services"
import { AuthStoreModel } from "../AuthStore"
import { RootStoreModel } from "../RootStore"

beforeEach(() => {
  const _rootStore = RootStoreModel.create({})
  appLifeCycle.setRootStore(_rootStore)
})

it("AuthStore isAuthenticated", () => {
  const initialState = {
    accessToken: "token",
  }
  const authStore = AuthStoreModel.create(initialState)

  expect(authStore.isAuthenticated).toBe(true)
})

it("AuthStore clearAuthData", () => {
  const initialState = {
    accessToken: "token",
  }
  const authStore = AuthStoreModel.create(initialState)
  authStore.clearAuthData()
  expect(authStore.isAuthenticated).toBe(false)
  expect(authStore.accessToken).toBe("")
})

it("AuthStore logout", () => {
  const initialState = {
    accessToken: "token",
  }
  const authStore = AuthStoreModel.create(initialState)
  authStore.logout()
  expect(authStore.isAuthenticated).toBe(false)
  expect(authStore.accessToken).toBe("")
})
