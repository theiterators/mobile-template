import { appLifeCycle } from "app/services"
import { ProjectStoreModel, RootStoreModel } from ".."
import { DATA_STATUS } from "app/common/types"

const projectsResponseData = {
  ok: true,
  data: [
    {
      archived: false,
      createdAt: "2023-02-21T11:08:07.972Z",
      createdBy: "anowak",
      id: "2c502401-c5df-4967-be2c-3ed60137fc04",
      modifiedAt: "2023-02-21T11:08:07.972Z",
      modifiedBy: "anowak",
      name: "test androida",
      organizationId: "7822c678-97eb-4caf-a71a-e8ce151a2570",
      type: "Commercial",
    },
    {
      archived: false,
      createdAt: "2023-02-20T13:25:42.872Z",
      createdBy: "anowak",
      id: "e4edfc74-65c8-4a77-bbbf-968e04942049",
      modifiedAt: "2023-02-24T10:50:22.701Z",
      modifiedBy: "anowak",
      name: "Android test ",
      organizationId: "7822c678-97eb-4caf-a71a-e8ce151a2570",
      type: "Commercial",
    },
    {
      archived: false,
      createdAt: "2023-02-17T12:10:30.238Z",
      createdBy: "anowak",
      id: "07397203-310f-4b5e-928a-eac176cdc24c",
      modifiedAt: "2023-03-01T13:00:21.137Z",
      modifiedBy: "anowak",
      name: "Testowy projekt transparency",
      organizationId: "7822c678-97eb-4caf-a71a-e8ce151a2570",
      type: "Commercial",
    },
    {
      archived: false,
      createdAt: "2023-02-20T14:01:34.682Z",
      createdBy: "anowak",
      id: "b8f4c86c-e417-4e63-b2d3-1f7fe1adb081",
      modifiedAt: "2023-03-01T12:57:34.204Z",
      modifiedBy: "anowak",
      name: "test realme1",
      organizationId: "7822c678-97eb-4caf-a71a-e8ce151a2570",
      type: "Commercial",
    },
  ],
}

beforeEach(() => {
  const rootStore = RootStoreModel.create({})
  appLifeCycle.setRootStore(rootStore)
})

// Mock the apiProject.getProjects function
jest.mock("../../services/api/apiProject", () => ({
  apiProject: {
    getProjects: jest.fn().mockResolvedValue(projectsResponseData),
  },
}))

describe("ProjectStore", () => {
  // Test for getProjects action in ProjectStore
  it("ProjectStore getProjects", async () => {
    const initialState = {
      accessToken: "",
    }

    const ProjectStore = ProjectStoreModel.create(initialState)

    // Call the getProjects action
    await ProjectStore.getProjects()

    expect(ProjectStore.projects).toBe(projectsResponseData.data)
  })

  it("ProjectStore clearData", () => {
    const initialState = {}
    const ProjectStore = ProjectStoreModel.create(initialState)
    ProjectStore.clearData()
    expect(ProjectStore.dataStatus).toBe(DATA_STATUS.IDLE)
    expect(ProjectStore.projects).toStrictEqual([])
  })
})
