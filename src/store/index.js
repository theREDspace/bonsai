import { createStore, applyMiddleware } from "redux"
import { logger } from "redux-logger"
import { composeWithDevTools } from "remote-redux-devtools"
import reducers from "./reducers"

const store = id => {
  const initialState = JSON.parse(localStorage.getItem(id)) || {
    id,
    scene: "",
    FocusedNode: "",
    FocusedLink: { status: false, from: "", to: "" },
    nodes: {},
    links: [],
    keys: [],
    editor: true,
    scale: 1,
    warning: { status: false, warningMessage: "" }
  }
  if (process.env.NODE_ENV === "development") {
    return createStore(
      reducers,
      initialState,
      composeWithDevTools(applyMiddleware(logger))
    )
  }

  return createStore(reducers, initialState)
}
export default store
