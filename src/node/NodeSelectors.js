import { createSelector } from "reselect"

const getNodeById = ({ nodes }, { id }) => nodes[id]
const getId = (_, { id }) => id
const getFocusedNode = ({ FocusedNode }) => FocusedNode
const getNodes = ({ nodes }) => nodes
const getActors = ({ actors }) => actors
const getLinks = ({ links }) => links

export const makeGetNode = () =>
  createSelector(
    [getNodeById, getActors, getFocusedNode],
    (node, actors, FocusedNode) => ({
      ...node,
      actor: node.actor !== undefined ? actors[node.actor].name : "",
      color: node.actor !== undefined ? actors[node.actor].color : "#FFF",
      current: FocusedNode === node.id
    })
  )

export const makeGetNodeByCurrent = () =>
  createSelector([getNodes, getFocusedNode], (nodes, FocusedNode) => ({
    node: nodes[FocusedNode]
  }))

export const makeConnectedNodes = () =>
  createSelector([getId, getLinks], (id, links) =>
    links.reduce(
      (obj, link) => {
        if (link[0] === id) {
          obj.next = [...obj.next, link[1]]
        }
        if (link[1] === id) {
          obj.prev = [...obj.prev, link[0]]
        }
        return obj
      },
      { prev: [], next: [] }
    )
  )

export const makeGetNodeKeys = () =>
  createSelector([getNodes], nodes => Object.keys(nodes))
