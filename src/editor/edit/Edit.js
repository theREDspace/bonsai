import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Select, TextField, MenuItem, Chip } from "@material-ui/core"
import { makeGetNodeByCurrent } from "../../store/selectors"
import { updateNode } from "../../store/actions"

const styles = {
  textStyle: {
    fontFamily: "Roboto Mono",
    fontSize: 12
  },
  tabContent: {
    margin: "20px"
  },
  tagWrapper: {
    // display: "inline-flex",
    // flexWrap: "wrap",
    width: "100%"
  },
  tagChip: {
    display: "inline-flex",
    flexWrap: "wrap",
    margin: "5px"
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

    const chipTags =
      node &&
      tags.map((tag, i) => (
        <Chip
          key={tag}
          style={styles.tagChip}
          onRequestDelete={() => this.handleDeleteTag(i)}
        >
          {tag}
        </Chip>
      ))
    return (
      <div style={styles.tabContent}>
        {type === "dialogue" && (
          <TextField
            name="title"
            fullWidth
            textareaStyle={styles.textStyle}
            floatingLabelFixed
            floatingLabelText={<span>Title</span>}
            value={node && title}
            onChange={e => this.handleTextUpdate(e, "title")}
          />
        )}
        {type === "dialogues" && (
          <Select
            name="actor"
            fullWidth
            floatingLabelFixed
            floatingLabelText={<span>Actor</span>}
            value={node && actor}
            onChange={this.handleActorUpdate}
          >
            {menuItems}
          </Select>
        )}
        <TextField
          name="tags"
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Tags</span>}
          value={this.state.tagsField}
          onKeyPress={this.handleTagsUpdate}
        />
        <div style={styles.tagsWrapper}>{chipTags}</div>
        <TextField
          name="conditions"
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Conditions</span>}
          value={(node && conditions) || ""}
          onChange={e => this.handleTextUpdate(e, "conditions")}
        />
        <TextField
          name="body"
          multiLine
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Body</span>}
          value={node && body}
          onChange={e => this.handleTextUpdate(e, "body")}
        />
        <TextField
          name="nextIntent"
          multiLine
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Next Intent</span>}
          value={node && nextIntent}
          onChange={e => this.handleTextUpdate(e, "nextIntent")}
        />
         <TextField
          name="maxRetries"
          multiLine
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Max Retries</span>}
          value={node && maxRetries}
          onChange={e => this.handleTextUpdate(e, "maxRetries")}
        />
        <TextField
          name="errorMessage"
          multiLine
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Error Message</span>}
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
