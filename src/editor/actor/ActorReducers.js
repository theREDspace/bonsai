export const actors = (state = [], { type, payload, index, actor }) => {
  switch (type) {
    case "NEW_ACTOR":
      return [...state, payload]
    case "UPDATE_ACTOR":
      return Object.assign([...state], {
        [index]: Object.assign({}, state[index], {
          ...actor
        })
      })
    case "DELETE_ACTOR":
      return state.filter((actor, i) => i !== index)
    default:
      return state
  }
}

export const colors = (state = [], { type, color, index }) => {
  switch (type) {
    case "NEW_COLOR":
      return [...state, color]
    case "DELETE_KEY":
      return state.filter((color, i) => i !== index)
    default:
      return state
  }
}
