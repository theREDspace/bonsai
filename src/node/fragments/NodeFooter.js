import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { CardActions, IconButton, Icon } from "@material-ui/core"

export default function NodeFooter({
  id,
  setFocusedLink,
  deleteAllLinks,
  deleteNode
}) {
  return (
    <Fragment>
      <CardActions disableActionSpacing>
        <IconButton
          onClick={() => {
            deleteAllLinks({ id })
            deleteNode({ id })
          }}
        >
          <Icon className="material-icons">delete</Icon>
        </IconButton>
        <IconButton
          onClick={() =>
            setFocusedLink({
              status: true,
              from: id
            })
          }
        >
          <Icon className="material-icons">arrow_forward</Icon>
        </IconButton>
      </CardActions>
    </Fragment>
  )
}

NodeFooter.propTypes = {
  id: PropTypes.string.isRequired,
  setFocusedLink: PropTypes.func.isRequired,
  deleteAllLinks: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired
}
