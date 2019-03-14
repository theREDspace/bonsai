import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { TextField } from "@material-ui/core"
import { makeGetNodeByCurrent } from "../../store/selectors"
import { updateNode } from "../../store/actions"

const styles = {
  textStyle: {
    fontFamily: "Roboto Mono",
    fontSize: 12,
    color:"#ff0000"
  },
  tabContent: {
    margin: "20px"
  }
}

class EditTab extends Component {
  static propTypes = {
    node: PropTypes.object,
    updateNode: PropTypes.func.isRequired
  }

  state = {
    node: {},
  }

  handleTextUpdate = (event, name) => {
    const { updateNode, node } = this.props
    updateNode({
      id: node.id,
      payload: { [name]: event.target.value }
    })
  }

  render() {
    const { node = {}  } = this.props
    const {
      type = "",
      title = "",
      body = "",
      nextIntent = "",
      maxRetries = "0",
      errorMessage = "",
      conditions = ""
    } = node

    return (
      <div style={styles.tabContent}>
        {type === "dialogue" && (
          <TextField
            label="title"
            id="title"
            style={styles.textStyle}
            value={node && title}
            onChange={e => this.handleTextUpdate(e, "title")}
            margin="normal"
            fullWidth
          />
        )}
        
        {type !== "dialogue" && (
        <TextField
          label="conditions"
          id="conditions"
          style={styles.textStyle}
          fullWidth
          value={(node && conditions) || ""}
          onChange={e => this.handleTextUpdate(e, "conditions")}
        />
        
        )}
        <TextField
          label="body"
          id="body"
          multiline
          fullWidth
          style={styles.textStyle}
          value={node && body}
          onChange={e => this.handleTextUpdate(e, "body")}
        />
        <TextField
          id="nextIntent"
          label="nextIntent"
          multiline
          fullWidth
          style={styles.textStyle}
          value={node && nextIntent}
          onChange={e => this.handleTextUpdate(e, "nextIntent")}
        />
         <TextField
          id="maxRetries"
          label="maxRetries"
          multiline
          fullWidth
          style={styles.textStyle}
          value={node && maxRetries}
          onChange={e => this.handleTextUpdate(e, "maxRetries")}
        />
        <TextField
          id="errorMessage"
          label="errorMessage"
          multiline
          fullWidth
          style={styles.textStyle}
          value={node && errorMessage}
          onChange={e => this.handleTextUpdate(e, "errorMessage")}
        />
      </div>
    )
  }
}

const makeMapState = () => {
  const getNode = makeGetNodeByCurrent()
  return ({ nodes, FocusedNode }) => ({
    ...getNode({ nodes, FocusedNode }),
  })
}

export default connect(makeMapState, { updateNode })(EditTab)
