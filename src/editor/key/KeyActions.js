export const newKey = ({ key }) => ({
  type: "NEW_KEY",
  key
})

export const deleteKey = ({ index }) => ({
  type: "DELETE_KEY",
  index
})
