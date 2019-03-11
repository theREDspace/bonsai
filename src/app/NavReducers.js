export const scene = (state = "", { type, scene }) => {
  if (type === "UPDATE_SCENE") {
    return scene
  }
  return state
}
