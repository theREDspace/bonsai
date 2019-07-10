import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"
import Editor from "./Editor"
import Tree from "./Tree"
import Nav from "./Nav"
import Tooltip from "./Tooltip"
import store from "../store"
import { saveState, throttle } from "../store/localStorage"
import { exportState } from "../store/export"

export let focusedStore
export default function Scene({ match }) {
  focusedStore = store(match.params.id)
  focusedStore.subscribe(() => {
    throttle(() => {
      saveState(focusedStore.getState());
      exportState(focusedStore.getState());
    }, 1000)
  })

  return (
    <Provider store={focusedStore}>
      <Fragment>
        <Tree />
        <Editor />
        <Nav />
        {/* <Tree />
        <Editor />
        <Nav />
        <Tooltip /> */}
      </Fragment>
    </Provider>
  )
}

Scene.propTypes = {
  match: PropTypes.object.isRequired
}
