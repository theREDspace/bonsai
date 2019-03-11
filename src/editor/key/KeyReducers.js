const keys = (state = [], { type, key, index }) => {
  switch (type) {
    case "NEW_KEY":
      return [...state, key]
    case "DELETE_KEY":
      return state.filter((key, i) => i !== index)
    default:
      return state
  }
}

export default keys
