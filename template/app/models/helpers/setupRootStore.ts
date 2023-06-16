/* eslint-disable no-console */
/**
 * This file is where we do "rehydration" of your RootStore from mmkv.
 * This lets you persist your state between app launches.
 *
 * Navigation state persistence is handled in navigationUtilities.tsx.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * @refresh reset
 */
import { applySnapshot, IDisposer, onSnapshot } from "mobx-state-tree"

import { ROOT_STATE_STORAGE_KEY } from "app/common/constants"

import { MMKVStorage } from "../../utils/storage"
import type { RootStore } from "../RootStore"

/**
 * Setup the root state.
 */
let _disposer: IDisposer
export async function setupRootStore(rootStore: RootStore) {
  let restoredState: any

  try {
    // load the last known state from MMkv
    restoredState = MMKVStorage.load(ROOT_STATE_STORAGE_KEY, "object") || {}
    applySnapshot(rootStore, restoredState)
  } catch (e) {
    // if there's any problems loading, then inform the dev what happened
    if (__DEV__) {
      console.tron.error(e.message, null)
    }
  }

  // stop tracking state changes if we've already setup
  if (_disposer) _disposer()

  // track changes & save to mmkv
  _disposer = onSnapshot(rootStore, (snapshot) =>
    MMKVStorage.save(ROOT_STATE_STORAGE_KEY, snapshot),
  )

  const unsubscribe = () => {
    _disposer()
    _disposer = undefined
  }

  return { rootStore, restoredState, unsubscribe }
}
