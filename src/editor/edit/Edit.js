import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Select, TextField, MenuItem, Chip } from "@material-ui/core"
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
    actors: PropTypes.arrayOf(PropTypes.object).isRequired,
    node: PropTypes.object,
    updateNode: PropTypes.func.isRequired
  }

  state = {
    node: {},
    tagsField: ""
  }

  handleTagsUpdate = event => {
    this.setState({ tagsField: this.state.tagsField + event.key })
    const { updateNode, node } = this.props
    const { tags } = node
    if (event.key === "Enter") {
      updateNode({
        id: node.id,
        payload: {
          tags: tags ? [...tags, event.target.value] : [event.target.value]
        }
      })
      this.setState({ tagsField: "" })
    }
  }

  handleDeleteTag = index => {
    const { updateNode, node } = this.props
    const { tags } = node
    updateNode({
      id: node.id,
      payload: {
        tags: tags.filter((tag, i) => i !== index)
      }
    })
  }

  handleActorUpdate = (event, index) => {
    const { updateNode, node } = this.props
    updateNode({
      id: node.id,
      payload: { actor: index }
    })
  }

  handleTextUpdate = (event, name) => {
    const { updateNode, node } = this.props
    updateNode({
      id: node.id,
      payload: { [name]: event.target.value }
    })
  }

  render() {
    const { node = {}, actors } = this.props
    const {
      type = "",
      title = "",
      actor = "",
      body = "",
      nextIntent = "",
      maxRetries = "0",
      errorMessage = "",
      tags = [],
      conditions = ""
    } = node
    const menuItems = actors.map((actor, i) => (
      <MenuItem key={actor.name + i} value={i} primaryText={actor.name} />
    ))

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
        <TextField
          label="conditions"
          id="conditions"
          style={styles.textStyle}
          fullWidth
          value={(node && conditions) || ""}
          onChange={e => this.handleTextUpdate(e, "conditions")}
        />
        <TextField
          label="body"
          id="body"
          multiLine
          fullWidth
          style={styles.textStyle}
          value={node && body}
          onChange={e => this.handleTextUpdate(e, "body")}
        />
        <TextField
          id="nextIntent"
          label="nextIntent"
          multiLine
          fullWidth
          style={styles.textStyle}
          value={node && nextIntent}
          onChange={e => this.handleTextUpdate(e, "nextIntent")}
        />
         <TextField
          id="maxRetries"
          label="maxRetries"
          multiLine
          fullWidth
          style={styles.textStyle}
          value={node && maxRetries}
          onChange={e => this.handleTextUpdate(e, "maxRetries")}
        />
        <TextField
          id="errorMessage"
          label="errorMessage"
          multiLine
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
  return ({ nodes, FocusedNode, actors }) => ({
    ...getNode({ nodes, FocusedNode }),
    actors
  })
}

export default connect(makeMapState, { updateNode })(EditTab)
