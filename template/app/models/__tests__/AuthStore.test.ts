import { appLifeCycle } from "app/services"
import { AuthStoreModel, RootStoreModel } from ".."

const loginRequestData = {
  username: "test",
  password: "test",
}

const loginResponseData = {
  ok: true,
  data: { token: "token" },
}

beforeEach(() => {
  const rootStore = RootStoreModel.create({})
  appLifeCycle.setRootStore(rootStore)
})

// Mock the apiAuth.login function
jest.mock("../../services/api/apiAuth", () => ({
  apiAuth: {
    login: jest.fn().mockResolvedValue(loginResponseData),
  },
}))

describe("AuthStore", () => {
  // Test for login action in authStore
  it("AuthStore login", async () => {
    const initialState = {
      accessToken: "",
    }

    const authStore = AuthStoreModel.create(initialState)

    // Call the login action
    await authStore.login(loginRequestData)

    expect(authStore.isAuthenticated).toBe(true)
    expect(authStore.accessToken).toBe(loginResponseData.data.token)
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
})
