import React, { Component } from "react"
import PropTypes from "prop-types"
import { Card, Typography } from "@material-ui/core"
import NodeHeader from "./fragments/NodeHeader"
import NodeFooter from "./fragments/NodeFooter"

const styles = {
  body: {
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    padding: "2px 10px 5px",
    margin: "5px 0px 0px",
    fontSize: 11
  },
  divider: {
    margin: "5px 0px"
  }
}

class Node extends Component {
  static propTypes = {
    current: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    body: PropTypes.string,
    color: PropTypes.string,
    actor: PropTypes.string,
    prev: PropTypes.array,
    next: PropTypes.array,
    pos: PropTypes.array,
    bounds: PropTypes.array,
    updateNode: PropTypes.func.isRequired,
    setFocusedLink: PropTypes.func.isRequired,
    deleteAllLinks: PropTypes.func.isRequired, 
    deleteNode: PropTypes.func.isRequired
  }
  static defaultProps = {
    title: "",
    tags: [],
    actor: "",
    color: "FFFFFF",
    body: "",
    current: false
  }
  state = {
    expanded: true,
    collapsed: false,
    widthAdjustment: 0
  }

  handleExpandChange = expanded => {
    this.setState({ expanded })
  }

  adjustWidth = (event, data) => {
    this.setState({ widthAdjustment: data.x })
  }

  updateWidth = () => {
    const { bounds, updateNode, id } = this.props
    updateNode({
      id,
      payload: { bounds: [bounds[0] + this.state.widthAdjustment] }
    })
    this.setState({ widthAdjustment: 0 })
  }

  render() {
    const {
      id,
      type,
      title,
      tags,
      body,
      color,
      actor,
      bounds,
      current,
      setFocusedLink,
      deleteAllLinks,
      deleteNode
      // prev,
      // next
    } = this.props
    const { widthAdjustment } = this.state
    return (
      <Card
        style={{
          width: `calc(${bounds[0]}px + ${widthAdjustment}px)`
        }}
      >
        <NodeHeader
          {...{
            type,
            title,
            body,
            color
          }}
        />
        <Typography style={styles.body} expandable>
          {body}
        </Typography>
        <NodeFooter
          {...{
            id,
            isFocusedNode: this.isFocusedNode,
            setFocusedLink,
            deleteAllLinks,
            deleteNode,
            collapse: () => {
              this.setState({ collapsed: !this.state.collapsed })
            }
          }}
        />
      </Card>
    )
  }
}

export default Node
