import { cleanup, fireEvent, render, waitFor } from "@testing-library/react-native"
import React from "react"
import { Button } from "../Button"

const componentTestID = "button-test-id"
const buttonText = "Submit"

describe("Button component", () => {
  const onPressMock = jest.fn()

  it("renders with text and onPress handler", async () => {
    const { getByTestId } = render(
      <Button testID={componentTestID} text={buttonText} onPress={onPressMock} />,
    )

    const button = getByTestId(componentTestID)
    fireEvent.press(button)

    await waitFor(() => {
      expect(onPressMock).toHaveBeenCalled()
    })

    cleanup()
  })
})
