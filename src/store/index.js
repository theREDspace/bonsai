import { createStore, applyMiddleware } from "redux"
import { logger } from "redux-logger"
import { composeWithDevTools } from "remote-redux-devtools"
import reducers from "./reducers"
import { createNewScene } from "../config/Config";

const store = id => {
  const initialState = JSON.parse(localStorage.getItem(id)) || createNewScene(id);
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
