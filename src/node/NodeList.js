import React, { Component } from "react"
import { connect } from "react-redux"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import Node from "./Node"
import {
  setFocusedNode,
  setFocusedLink,
  newLink,
  updateNode,
  deleteAllLinks,
  deleteNode
} from "../store/actions"
import { gridSize } from "../lib/view"

const styles = {
  dragContainer: {
    width: "210px",
    position: "absolute"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.1)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
}

class NodeList extends Component {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    page: PropTypes.object.isRequired,
    setFocusedNode: PropTypes.func.isRequired,
    setFocusedLink: PropTypes.func.isRequired,
    newLink: PropTypes.func.isRequired,
    updateNode: PropTypes.func.isRequired
  }

  state = {
    xAdjust: 0,
    yAdjust: 0,
    nonLinkables: []
  }

  handleNodePositionAdjust(event, data) {
    console.log(data.x,)
    const { scale } = this.props


    this.props.updateNode({
      id: this.props.page.focusedNode,
      pos: [data.x, data.y]
    })
  }



  isFocusedNode = id => {
    return this.props.FocusedNode === id
  }

  render() {
    /*const {
      nodes,
      FocusedLink,
      setFocusedNode,
      setFocusedLink,
      newLink,
      FocusedNode
    } = this.props*/

    const { page} = this.props

    return Object.values(page.nodes).map(node => {
      return (
        <Draggable
          key={node.id}
          position={{
            x: Math.round(node.pos[0] / gridSize) * gridSize,
            y: Math.round(node.pos[1] / gridSize) * gridSize
          }}
          handle=".draggable"
          grid={[gridSize, gridSize]}
          onMouseDown={() => {
            // if (node.linkable) {
            //   if (FocusedLink.status) {
            //     newLink({
            //       from: FocusedLink.from,
            //       to: node.id,
            //       outIndex: FocusedLink.outIndex
            //     })
            //     return setFocusedLink({ status: false , outIndex:FocusedLink.outIndex})
            //   }
            //   if (FocusedNode !== node.id) setFocusedNode({ id: node.id })
            // }
          }}
          onDrag={(e, data) => this.handleNodePositionAdjust(e, data)}
          onStop={(e, data) => this.handleNodePositionAdjust(e, data)}
        >
          <div
            id={node.id}
            style={{
              ...styles.dragContainer,
              zIndex: this.isFocusedNode(node.id) ? 10 : 1
            }}
          >
          <Node
              {...{
                ...page.nodes[page.focusedNode],
                updateNode,
                setFocusedLink,
                deleteAllLinks,
                deleteNode
              }}
            />

            <div
              style={{
                ...styles.overlay,
                display: node.linkable ? "none" : "block"
              }}
            />
          </div>
        </Draggable>
      )
    })
  }
}

// const mapState = ({ scale, nodes, FocusedLink, FocusedNode }) => ({
//   scale,
//   nodes,
//   FocusedLink,
//   FocusedNode
// })

/*function mapState({ scale, pages, focusedPage }) {
  return { scale, ...pages[focusedPage] };
}*/

const mapState = ({ scale, editor, title, pages, focusedPage }) => ({
  scale,
  editor,
  title,
  page: { ...pages.map[pages.focusedPage] }
});

export default connect(mapState, {
  setFocusedNode,
  setFocusedLink,
  newLink,
  updateNode,
  deleteAllLinks
})(NodeList)
