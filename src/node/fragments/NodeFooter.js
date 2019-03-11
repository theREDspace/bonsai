import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { CardActions, IconButton, Icon } from "@material-ui/core"
import Corner from "./Corner"

const styles = {
  corner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 0,
    padding: 0,
    transition: `transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms`
  },
  footer: {
    height: "16px",
    textAlign: "right",
    paddingRight: 10
  },
  button: {
    width: 14,
    height: 14,
    padding: 0,
    margin: 0
  },
  icon: {
    fontSize: 14
  }
}

export default function NodeFooter({
  id,
  expanded,
  current,
  collapse,
  adjustWidth,
  updateWidth,
  setFocusedLink,
  deleteAllLinks,
  deleteNode
}) {
  return (
    <Fragment>
      <CardActions
        style={{
          ...styles.footer,
          background: current
            ? `linear-gradient(0deg, #43a047 10%, #FFFFFF 10%)`
            : "#FFFFFF"
        }}
      >
        {expanded && (
          <IconButton
            style={styles.button}
            iconStyle={styles.icon}
            onClick={() => {
              deleteAllLinks({ id })
              deleteNode({ id })
            }}
            data-tip={"Delete"}
            data-tippos={"bottom"}
          >
            <Icon className="material-icons">delete</Icon>
          </IconButton>
        )}
        <IconButton
          style={styles.button}
          iconStyle={styles.icon}
          onClick={() =>
            setFocusedLink({
              status: true,
              from: id
            })
          }
          data-tip={
            "Link.\nClick a link to move to another node.\nTo cancel a link click anywhere on the grid."
          }
          data-tippos={"bottom"}
        >
          <Icon className="material-icons">arrow_forward</Icon>
        </IconButton>
        <IconButton
          style={styles.button}
          iconStyle={styles.icon}
          onClick={collapse}
          data-tip={"Collapse"}
          data-tippos={"bottom"}
        >
          <Icon className="material-icons">layers</Icon>
        </IconButton>
      </CardActions>
      <Corner adjustWidth={adjustWidth} updateWidth={updateWidth} />
    </Fragment>
  )
}

NodeFooter.propTypes = {
  id: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  current: PropTypes.bool.isRequired,
  collapse: PropTypes.func.isRequired,
  adjustWidth: PropTypes.func.isRequired,
  updateWidth: PropTypes.func.isRequired,
  setFocusedLink: PropTypes.func.isRequired,
  deleteAllLinks: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired
}
