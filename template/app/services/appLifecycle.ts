import { AppState, NativeEventSubscription } from "react-native"

import { RootStore } from "../models"

import { Api } from "./api"

type AppLifecycleFunc = {
  onAppFinished: () => void
  onAppNavigatorReady: () => void
  onAppStarted: () => void
  onAppWillGoToBackground: () => void
  onAppWillGoToForeground: () => void
  onTokenRestored: () => void
  onUserSignIn: () => void
  onUserSignOut: () => void
}

export class AppLifeCycle implements AppLifecycleFunc {
  #apiService: Api
  #rootStore: RootStore
  #appState: AppState
  #eventSubscription: NativeEventSubscription

  private static instance: AppLifeCycle

  private constructor(apiService: Api, appState = AppState) {
    this.#apiService = apiService
    this.#appState = appState
    this.#eventSubscription = this.addEventListener()
  }

  public static getInstance(apiService: Api, appState = AppState): AppLifeCycle {
    if (!AppLifeCycle.instance) {
      AppLifeCycle.instance = new AppLifeCycle(apiService, appState)
    }

    return AppLifeCycle.instance
  }

  setRootStore(rootStore: RootStore) {
    this.#rootStore = rootStore
    this.#apiService.setAuthStore(rootStore.authStore)
  }

  implementsAppLifecycle = (lifecycleFunc: keyof AppLifecycleFunc) => {
    Object.values(this.#rootStore)
      .filter((store) => lifecycleFunc in store)
      .forEach((store) => {
        store[lifecycleFunc]()
      })
  }

  onAppStarted = () => {
    this.implementsAppLifecycle("onAppStarted")
  }

  onAppFinished = () => {
    this.implementsAppLifecycle("onAppFinished")
    this.#eventSubscription.remove()
  }

  onAppNavigatorReady = () => {
    this.implementsAppLifecycle("onAppNavigatorReady")
  }

  onAppWillGoToForeground = () => {
    this.implementsAppLifecycle("onAppWillGoToForeground")
  }

  onAppWillGoToBackground = () => {
    this.implementsAppLifecycle("onAppWillGoToBackground")
  }

  onUserSignIn = () => {
    this.isAuthorized && this.implementsAppLifecycle("onUserSignIn")
  }

  onUserSignOut = () => {
    this.implementsAppLifecycle("onUserSignOut")
  }

  onTokenRestored = () => {
    this.isAuthorized && this.implementsAppLifecycle("onTokenRestored")
  }

  private addEventListener = () =>
    this.#appState.addEventListener("change", (state) => {
      state === "active" && this.onAppWillGoToForeground()
      state === "background" && this.onAppWillGoToBackground()
    })

  get isAuthorized() {
    return !!this.#rootStore.authStore.accessToken
  }
}
