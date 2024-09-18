/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface ILoginRequestData {
  password: string
  username: string
}

export interface ILoginResponseData {
  token: string
  validTill: string
}

/**
 * The options used to configure apisauce.
 */
export interface IApiConfig {
  refreshTokenTimeout: number

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number

  /**
   * The URL of the api.
   */
  url: string
}
