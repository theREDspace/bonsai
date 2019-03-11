import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Node from "./Node"
import { makeGetNode, makeConnectedNodes } from "../store/selectors"
import {
  updateNode,
  setFocusedLink,
  deleteAllLinks,
  deleteNode
} from "../store/actions"

class NodeContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    node: PropTypes.object,
    updateNode: PropTypes.func.isRequired,
    setFocusedLink: PropTypes.func.isRequired,
    deleteAllLinks: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired,
    FocusedLink: PropTypes.object.isRequired
  }
  static defaultProps = {
    node: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.FocusedLink.status !== this.props.FocusedLink.status) {
      const { id, updateNode, node } = this.props
      if (nextProps.node.id === nextProps.FocusedLink.from) {
        nextProps.node.next.forEach(n => {
          updateNode({ id: n, payload: { linkable: false } })
        })
      }
      if (node.linkable === false) {
        updateNode({ id, payload: { linkable: true } })
      }
    }
  }

  render() {
    const {
      node,
      updateNode,
      setFocusedLink,
      deleteNode,
      deleteAllLinks
    } = this.props
    return (
      <Node
        {...{
          ...node,
          updateNode,
          setFocusedLink,
          deleteAllLinks,
          deleteNode
        }}
      />
    )
  }
}

const makeMapState = () => {
  const getNode = makeGetNode()
  const getConnected = makeConnectedNodes()
  return ({ nodes, actors, FocusedNode, FocusedLink, links }, { id }) => ({
    node: {
      ...getNode({ nodes, actors, FocusedNode }, { id }),
      ...getConnected({ links }, { id })
    },
    FocusedLink
  })
}

export default connect(makeMapState, {
  updateNode,
  deleteNode,
  setFocusedLink,
  deleteAllLinks
})(NodeContainer)
