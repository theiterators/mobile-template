/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"

import { Header, HeaderProps } from "../../components"

/**
 * A hook that can be used to easily set the Header of a react-navigation screen from within the screen's component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Utils-useHeader.md)
 */
export function useHeader(
  headerProps: HeaderProps,
  deps: Parameters<typeof useLayoutEffect>[1] = [],
) {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header {...headerProps} />,
    })
  }, [...deps, navigation])
}
