export const newLink = ({ from, to , outIndex}) => ({
  type: "NEW_LINK",
  from,
  to,
  outIndex
})

export const deleteLink = ({ from, to }) => ({
  type: "DELETE_LINK",
  from,
  to
})

export const deleteAllLinks = ({ id }) => ({
  type: "DELETE_ALL_LINKS",
  id
})

export const setFocusedLink = ({ status, from, to, outIndex, }) => ({
  type: "SET_CURRENT_LINK",
  status,
  from,
  to,
  outIndex
})
