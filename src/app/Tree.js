import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  newNode,
  updateNode,
  setFocusedNode,
  setFocusedLink,
  toggleEditor,
  setWarning
} from "../store/actions"
import NodeList from "../node/NodeList"
import LinkContainer from "../link/LinkContainer"
import { dimensions } from "../lib/view"

// const zoomStep = 0.03
const gridSize = 30

const styles = {
  container: {
    top: 0,
    left: 0,
    width: "70vw",
    height: "100vh"
  },
  dragContainer: {
    width: "210px",
    position: "absolute"
  },
  dragGrid: {
    position: "relative",
    backgroundColor: "white",
    display: "block",
    backgroundSize: `${gridSize}px ${gridSize}px`
  }
}

class Tree extends Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    scale: PropTypes.number.isRequired,
    newNode: PropTypes.func.isRequired,
    updateNode: PropTypes.func.isRequired,
    setFocusedNode: PropTypes.func.isRequired,
    setFocusedLink: PropTypes.func.isRequired,
    setWarning: PropTypes.func.isRequired,
  }

  state = {
    mouseEvent: {}
  }

  handleMouse = e => {
    this.setState({ mouseEvent: { pageX: e.pageX, pageY: e.pageY } })
  }

  render() {
    const { page, scale} = this.props
    const boundary = dimensions(Object.values(page.nodes), scale)
    return (
     <div onMouseMove={this.handleMouse}>
        <div
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0ms linear"
          }}
          id="zoomGrid"
          onWheel={this.handleZoom}
        >
          <div
            style={{
              ...styles.dragGrid,
              width: boundary.width,
              height: boundary.height,
              backgroundImage: `linear-gradient(to right, #EEEEEE ${1 /
                scale}px, transparent ${1 /
                scale}px), linear-gradient(to bottom, #EEEEEE ${1 /
                scale}px, transparent ${1 / scale}px)`
            }}
            onClick={() => {
              // if (FocusedLink.status) return setFocusedLink({ status: false })
            }}
          >
            <NodeList />
             {
               <LinkContainer mouseEvent={this.state.mouseEvent} />
             }
          </div>
        </div>
      </div>
    )
  }
}

// const mapState = ({ scale, nodes, FocusedLink }) => ({
//   scale,
//   FocusedLink,
//   nodes
// })

const mapState = ({ scale, editor, title, pages, focusedPage }) => ({
  scale,
  page: { ...pages.map[pages.focusedPage] }
});

export default connect(mapState, {
  newNode,
  updateNode,
  setFocusedNode,
  toggleEditor,
  setWarning,
  setFocusedLink
})(Tree)
