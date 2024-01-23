/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"

import Config from "../../config"
import { AuthStore } from "../../models"
import { reportCrash } from "../reports/crashReporting"

import type { IApiConfig } from "./common/api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: IApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
  refreshTokenTimeout: 10000,
}

export const API_ROUTES = {
  login: "/auth/session", // POST
  getProjects: "/projects", // GET
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: IApiConfig
  authStore: AuthStore

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: IApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
    this.authHeaders()
  }

  setAuthStore = (authStore: AuthStore) => {
    this.authStore = authStore
  }

  authHeaders = () => {
    this.apisauce.addRequestTransform((request) => {
      const { accessToken } = this.authStore
      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`
      }
    })
  }

  postData = async <T, K = null>(urlPath: string, data?: T) => {
    try {
      return await this.apisauce.post<K>(urlPath, data)
    } catch (e) {
      this.handleError(e)
    }
  }

  getData = async <T>(urlPath: string, params?: Record<string, unknown>) => {
    try {
      return await this.apisauce.get<T>(urlPath, params)
    } catch (e) {
      this.handleError(e)
    }
  }

  private handleError(error: Error): never {
    reportCrash({ error })
    throw error
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
