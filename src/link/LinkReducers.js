export const FocusedLink = (state = {}, { type, status, from, to }) => {
  if (type === "SET_CURRENT_LINK") {
    return { ...state, status, from, to }
  }
  return state
}

export const links = (state = [], { type, from, to, id }) => {
  switch (type) {
    case "NEW_LINK":
      return [...state, [from, to]]
    case "DELETE_LINK":
      return state.filter(link => (link[0] !== from) | (link[1] !== to))
    case "DELETE_ALL_LINKS":
      return state.filter(link => (link[0] !== id) & (link[1] !== id))
    default:
      return state
  }
}
