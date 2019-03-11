import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import {
  Toolbar,
  TextField,
  Fab,
  Icon,
  Typography,
  IconButton
} from "@material-ui/core"
import { rnd } from "../lib/math"
import { gridSize } from "../lib/view"
import {
  toggleEditor,
  setFocusedNode,
  newNode,
  updateScene
} from "../store/actions"
import { saveState } from "../store/localStorage"
import { exportState } from "../store/export"
import { focusedStore } from "../app/Scene"

const download = require("downloadjs");

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "30vw",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  textField: {
    marginRight: "30px",
    width: "30vw"
  },
  textStyle: {
    fontFamily: "Roboto Mono"
  },
  icon: {
    width: 30,
    height: 30,
    stroke: "green",
    color: "green"
  },
  buttonContainer: {
    position: "fixed",
    left: "calc(70vw - 140px)",
    top: "calc(100vh - 100px)",
    transition: "transform 900ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0ms",
    display: "inline",
    margin: 0
  },
  saveButtonContainer: {
    position: "fixed",
    left: "calc(70vw - 140px)",
    top: "10px",
    transition: "transform 900ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0ms",
    display: "inline",
    margin: 0
  },
  button: {
    margin: "5px"
  },
  title: {
    color: "#558b2f"
  }
}

class Nav extends Component {
  static propTypes = {
    toggleEditor: PropTypes.func.isRequired,
    updateScene: PropTypes.func.isRequired,
    setFocusedNode: PropTypes.func.isRequired,
    newNode: PropTypes.func.isRequired,
    editor: PropTypes.bool.isRequired,
    scale: PropTypes.number.isRequired,
    scene: PropTypes.string.isRequired
  }

  state = {
    redirect: "",
    fileOpen: false
  }

  handleZoomSlider = (e, v) => {
    this.setState({ scale: v })
  }

  handleJSONDown = () =>{
    download(exportState(focusedStore.getState()), "file.json", "text/plain")
  }

  handleProjectDown = () =>{
    download(JSON.stringify(focusedStore.getState()), "file.bonsai", "text/plain")
  }

  handleNewNode = type => {
    const { newNode, setFocusedNode, scale } = this.props
    const newId = rnd()
    const diffs =
      type === "dialogue"
        ? { actor: 0, body: "new dialogue" }
        : { body: "new choice" }
    const newPos = [
      Math.round(
        (window.pageXOffset + window.innerWidth / 2 - 100) / gridSize
      ) *
        gridSize *
        scale,
      Math.round(
        (window.pageYOffset + window.innerHeight / 2 - 50) / gridSize
      ) *
        gridSize *
        scale
    ]
    newNode({
      id: newId,
      payload: {
        id: newId,
        type,
        title: "untitled",
        tags: [],
        pos: newPos,
        linkable: true,
        collapsed: false,
        bounds: [210],
        ...diffs
      }
    })
    setFocusedNode({ id: newId })
  }

  handleSceneUpdate = e => {
    this.props.updateScene({ scene: e.target.value })
  }

  handleRequestClose = () => {
    this.setState({
      fileOpen: false
    })
  }

  render() {
    const { scale, scene } = this.props
    const hideEditor = {
      transform: !this.props.editor ? "translateX(28vw)" : "translateX(0)"
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <Fragment>
        <Toolbar style={styles.container}>
          
            <IconButton
              tooltip="Home"
              onClick={() => {
                saveState(focusedStore.getState())
                this.setState({ redirect: "/" })
              }}
            >
              <Icon className="material-icons">home</Icon>
            </IconButton>
            <Typography text="bonsai" style={styles.title} />
            <TextField
              name="scene"
              fullWidth
              style={styles.textField}
              textareaStyle={styles.textStyle}
              hintText="Scene"
              onChange={this.handleSceneUpdate}
              value={scene}
            />
          
        </Toolbar>
        <div style={{ ...styles.saveButtonContainer, ...hideEditor }}>
        <Fab
            mini={true}
            onClick={() => this.handleJSONDown()}
            style={styles.button}
            secondary
            data-tip={"Export JSON"}
          >
            <Icon className="material-icons">save_alt</Icon>
          </Fab>

          <Fab
            mini={true}
            onClick={() => this.handleProjectDown()}
            style={styles.button}
            secondary
            data-tip={"Export PROJECT"}
          >
            <Icon className="material-icons">save</Icon>
          </Fab>
        </div>
        <div style={{ ...styles.buttonContainer, ...hideEditor }}>
          <Fab
            mini={true}
            onClick={() => this.handleNewNode("choice")}
            style={styles.button}
            secondary
            data-tip={"New Choice"}
          >
            <Icon className="material-icons">question_answer</Icon>
          </Fab>
          <Fab
            style={styles.button}
            onClick={() => this.handleNewNode("dialogue")}
            secondary
            data-tip={"New Dialogue"}
          >
            <Icon className="material-icons md-48">chat</Icon>
          </Fab>
          <br />
        </div>
      </Fragment>
    )
  }
}

const mapState = ({ scale, editor, scene }) => ({
  scale,
  editor,
  scene
})

export default connect(mapState, {
  toggleEditor,
  newNode,
  setFocusedNode,
  updateScene
})(Nav)
