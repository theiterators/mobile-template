import { TProject } from "app/common/types/projectType"
import { Api, api, API_ROUTES } from "."

class ApiProject {
  api: Api

  constructor(api: Api) {
    this.api = api
  }
  async getProjects() {
    const response = await this.api.getData<TProject[]>(API_ROUTES.getProjects)
    return response
  }
}

export const apiProject = new ApiProject(api)
