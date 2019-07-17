import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { CardActions, IconButton, Icon } from "@material-ui/core"
import { connect } from "react-redux";
import {
  deleteAllLinks,
  deleteNode
} from "../../store/actions"

class NodeFooter extends Component
{
  static propTypes = {
  id: PropTypes.string.isRequired,
  setFocusedLink: PropTypes.func.isRequired,
  deleteAllLinks: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired
  }

  render(){
    const {
      id,
      setFocusedLink,
      deleteAllLinks,
      deleteNode
    } = this.props
    return (
      <Fragment>
        <CardActions disableSpacing="true">
          <IconButton
            onClick={() => {
              deleteAllLinks({ id })
              deleteNode({ id })
            }}
          >
            <Icon className="material-icons">delete</Icon>
          </IconButton>
        </CardActions>
      </Fragment>
    )
  }
}

// NOT SURE WHAT NEEDS TO BE SYNCED HERE
const mapState = ({ scale, pages }) => ({
  scale,
  page: { ...pages.map[pages.focusedPage] }
});

export default connect(mapState, {
  deleteAllLinks,
  deleteNode
})(NodeFooter)
