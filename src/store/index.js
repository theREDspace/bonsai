import { createStore, applyMiddleware, compose } from "redux"
import { logger } from "redux-logger"
import reducers from "./reducers"
import { createNewScene } from "../config/Config";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = id => {
  const initialState = JSON.parse(localStorage.getItem(id)) || createNewScene(id);
  if (process.env.NODE_ENV === "development") {
    console.log("ASDSDASDASDASDASDASDASD")
    return createStore(
      reducers,
      initialState,
      composeEnhancers(applyMiddleware(logger))
    )
  }

  return createStore(reducers, initialState)
}
export default store
