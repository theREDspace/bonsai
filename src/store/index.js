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
    actors: [{ name: "Narrator", playable: false, color: "FFFFFF" }],
    colors: ["FFFFFF", "94E495", "85B7A1", "486B8D", "554A6E", "501D47"],
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
