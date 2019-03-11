export const newActor = ({ actor }) => ({
  type: "NEW_ACTOR",
  actor
})

export const updateActor = ({ index, actor }) => ({
  type: "UPDATE_ACTOR",
  index,
  actor
})

export const deleteActor = ({ index }) => ({
  type: "DELETE_ACTOR",
  index
})

export const newColor = ({ color }) => ({
  type: "NEW_KEY",
  color
})

export const deleteColor = ({ index }) => ({
  type: "DELETE_COLOR",
  index
})
