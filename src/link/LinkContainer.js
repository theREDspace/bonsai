import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Link from "./Link"
import { setFocusedLink, deleteLink, setFocusedNode } from "../store/actions"
import { layers } from "../lib/view"

const styles = {
  linkCreator: {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: layers.CURRENTARROW
  }
}

class LinkContainer extends Component {
  static propTypes = {
    links: PropTypes.array.isRequired,
    FocusedLink: PropTypes.object.isRequired,
    FocusedNode: PropTypes.string.isRequired,
    mouseEvent: PropTypes.object.isRequired,
    deleteLink: PropTypes.func.isRequired,
    setFocusedLink: PropTypes.func.isRequired,
    setFocusedNode: PropTypes.func.isRequired
  }

  state = {
    mounted: false
  }
  componentDidMount() {
    this.setState({ mounted: true })
  }

  isFocusedNode = from => {
    return this.props.FocusedNode === from
  }

  render() {
    const {
      links,
      FocusedLink,
      mouseEvent,
      setFocusedLink,
      setFocusedNode,
      deleteLink
    } = this.props
    const { mounted } = this.state
    const linkList = links.map(link => (
      <Link
        key={`${link[0]}-${link[1]}`}
        from={link[0]}
        to={link[1]}
        FocusedNode={this.isFocusedNode(link[0])}
        setFocusedLink={setFocusedLink}
        setFocusedNode={setFocusedNode}
        deleteLink={deleteLink}
      />
    ))

    return (
      <Fragment>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>
          {mounted && linkList}
        </svg>
        {FocusedLink.status && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            style={styles.linkCreator}
          >
            <defs>
              <marker
                id="arrowhead"
                viewBox="0 0 10 10"
                refX="10"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
            </defs>
            <Link
              from={FocusedLink.from}
              linking={FocusedLink.status}
              mouse={mouseEvent}
              FocusedNode={true}
              setFocusedLink={setFocusedLink}
              setFocusedNode={setFocusedNode}
              deleteLink={deleteLink}
              style={styles.linkCreator}
            />
          </svg>
        )}
      </Fragment>
    )
  }
}

const mapState = ({ links, FocusedLink, FocusedNode }) => ({
  links,
  FocusedLink,
  FocusedNode
})

export default connect(mapState, {
  setFocusedLink,
  setFocusedNode,
  deleteLink
})(LinkContainer)
