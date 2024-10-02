import { Api, api, API_ROUTES, ILoginRequestData, ILoginResponseData } from "."

class ApiAuth {
  api: Api

  constructor(api: Api) {
    this.api = api
  }

  async login(loginData: ILoginRequestData) {
    const response = await this.api.postData<ILoginRequestData, ILoginResponseData>(
      API_ROUTES.login,
      loginData,
    )
    return response
  }
}

export const apiAuth = new ApiAuth(api)
