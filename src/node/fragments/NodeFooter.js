import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { CardActions, IconButton, Icon } from "@material-ui/core"
import { connect } from "react-redux";
import { deleteNode } from "../../page/PageActions"
import { deleteAllLinks } from "../../link/LinkActions"

class NodeFooter extends Component
{
  static propTypes = {
  id: PropTypes.string.isRequired,
  deleteAllLinks: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired
  }

  render(){
    const {
      id,
      deleteAllLinks,
      deleteNode
    } = this.props
    return (
      <Fragment>
        <CardActions disablecpacing="true">
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

export default connect(null, {
  deleteAllLinks,
  deleteNode
})(NodeFooter)
