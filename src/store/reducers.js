import { combineReducers } from "redux"

import { nodes, FocusedNode } from "../node/NodeReducers"
import { actors, colors } from "../editor/actor/ActorReducers"
import { editor } from "../editor/edit/EditReducers"
import { links, FocusedLink } from "../link/LinkReducers"
import keys from "../editor/key/KeyReducers"
import { scene } from "../app/NavReducers"

const warning = (state = null, action) => {
  switch (action.type) {
    case "WARNING_MESSAGE":
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}

const scale = (state = 1, { type, scale }) => {
  if (type === "UPDATE_SCALE") {
    return scale
  }
  return state
}

const id = (state = "") => state

export default combineReducers({
  id,
  scene,
  nodes,
  links,
  FocusedNode,
  FocusedLink,
  actors,
  keys,
  colors,
  scale,
  editor,
  warning
})
