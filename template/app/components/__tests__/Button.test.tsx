import { fireEvent, render } from "@testing-library/react-native"
import React from "react"
import { Button } from "../Button"

const componentTestID = "button-test-id"
const buttonText = "Submit"

describe("Button component", () => {
  const onPressMock = jest.fn()

  it("Renders with text and onPress handler", async () => {
    const { getByTestId } = render(
      <Button testID={componentTestID} text={buttonText} onPress={onPressMock} />,
    )

    const button = getByTestId(componentTestID)
    fireEvent.press(button)

    expect(onPressMock).toHaveBeenCalled()
  })
})
