import { fireEvent, render } from "@testing-library/react-native"
import React from "react"
import { Header } from "../Header"

const componentTestID = "header-test-id"
const actionTestID = "logout-button-test-id"
const rightText = "Logout"

describe("Header component", () => {
  const onLogoutPress = jest.fn()
  it("Renders with logout button", () => {
    const { getByTestId } = render(
      <Header
        testID={componentTestID}
        rightActionTestID={actionTestID}
        onRightPress={onLogoutPress}
        rightText={rightText}
      />,
    )
    const content = getByTestId(componentTestID)
    expect(content).toBeTruthy()
  })

  it("Calls onLogoutPress when the rightAction button is pressed", () => {
    const { getByTestId } = render(
      <Header
        rightText={rightText}
        rightActionTestID={actionTestID}
        onRightPress={onLogoutPress}
      />,
    )
    const logoutButton = getByTestId(actionTestID)
    fireEvent.press(logoutButton)
    expect(onLogoutPress).toHaveBeenCalled()
  })
})
