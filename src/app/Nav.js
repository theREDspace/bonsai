import classNames from "classnames";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Toolbar, TextField, Fab, Icon, IconButton } from "@material-ui/core";
import { uuid } from "../lib/math";
import { gridSize } from "../lib/view";
import {
  toggleEditor,
  setFocusedNode,
  newNode,
  updateSceneTitle,
  updatePage
} from "../store/actions";
import { saveState } from "../store/localStorage";
import { exportState } from "../store/export";
import { focusedStore } from "../app/Scene";
import { capitalize } from "@material-ui/core/utils/helpers";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

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
    left: "calc(70vw - 70px)",
    bottom: 8,
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
  },
  controls: {
    margin: 8 * 3
  },
  exampleWrapper: {
    position: "relative",
    height: 380
  },
  radioGroup: {
    margin: `${8}px 0`
  },
  speedDial: {
    position: "absolute",
    "&$directionUp, &$directionLeft": {
      bottom: 8 * 2,
      right: 8 * 3
    },
    "&$directionDown, &$directionRight": {
      top: 8 * 2,
      left: 8 * 3
    }
  },
  directionUp: {},
  directionRight: {},
  directionDown: {},
  directionLeft: {}
};

const actions = [
  { icon: <Icon>chat</Icon>, name: "Node" },
  { icon: <Icon>question_answer</Icon>, name: "MCQ" },
  { icon: <Icon>scatter_plot</Icon>, name: "Branch" }
];

class Nav extends Component {
  static propTypes = {
    toggleEditor: PropTypes.func.isRequired,
    updateSceneTitle: PropTypes.func.isRequired,
    setFocusedNode: PropTypes.func.isRequired,
    newNode: PropTypes.func.isRequired,
    editor: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  };

  state = {
    redirect: "",
    fileOpen: false,
    direction: "up",
    open: false,
    hidden: false
  };

  handleZoomSlider = (e, v) => {
    this.setState({ scale: v });
  };

  handleJSONDown = () => {
    download(exportState(focusedStore.getState()), "file.json", "text/plain");
  };

  handleProjectDown = () => {
    download(
      JSON.stringify(focusedStore.getState()),
      "file.bonsai",
      "text/plain"
    );
  };

  handleClick = actionName => {
    this.setState(state => ({
      open: !state.open
    }));

    console.log(actionName);
    this.handleNewNode(actionName);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleNewNode = type => {
    console.log(type);
    const { newNode, setFocusedNode, scale } = this.props;
    const newId = uuid();
    const diffs =
      type === "Node" ? { body: "new dialogue" } : { body: "new choice" };
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
    ];
    newNode({
      id: newId,
      payload: {
        id: newId,
        type,
        title: "untitled",
        pos: newPos,
        linkable: true,
        collapsed: false,
        bounds: [210],
        ...diffs
      }
    });
    setFocusedNode({ id: newId });
  };

  handleSceneTitleUpdate = e => {
    this.props.updateSceneTitle({ title: e.target.value });
  };

  handlePageTitleUpdate = e => {
    this.props.updatePage({ title: e.target.value });
  };

  handleRequestClose = () => {
    this.setState({
      fileOpen: false
    });
  };

  render() {
    const { title, page } = this.props;
    const hideEditor = {
      transform: !this.props.editor ? "translateX(28vw)" : "translateX(0)"
    };
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { classes } = this.props;
    const { direction, hidden, open } = this.state;

    const speedDialClassName = classNames(
      styles.speedDial,
      styles[`direction${capitalize(direction)}`]
    );

    return (
      <Fragment>
        <Toolbar style={styles.container}>
          <IconButton
            tooltip="Home"
            onClick={() => {
              saveState(focusedStore.getState());
              this.setState({ redirect: "/" });
            }}
          >
            <Icon className="material-icons">home</Icon>
          </IconButton>
          <TextField
            name="sceneTitle"
            fullWidth
            style={styles.textField}
            textareastyle={styles.textStyle}
            hinttext="Scene Title"
            onChange={this.handleSceneTitleUpdate}
            value={title}
            label="Scene Title"
          />
          <TextField
            name="pageTitle"
            fullWidth
            style={styles.textField}
            textareastyle={styles.textStyle}
            hinttext="Page Title"
            onChange={this.handlePageTitleUpdate}
            value={page.title || ""}
            disabled={!page.allowTitleChange}
            label="Page Title"
          />
        </Toolbar>
        <div style={{ ...styles.saveButtonContainer, ...hideEditor }}>
          <Fab
            onClick={() => this.handleJSONDown()}
            style={styles.button}
            data-tip={"Export JSON"}
          >
            <Icon className="material-icons">save_alt</Icon>
          </Fab>

          <Fab
            onClick={() => this.handleProjectDown()}
            style={styles.button}
            data-tip={"Export PROJECT"}
          >
            <Icon className="material-icons">save</Icon>
          </Fab>
        </div>
        <div style={{ ...styles.buttonContainer, ...hideEditor }}>
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={speedDialClassName}
            hidden={hidden}
            icon={<SpeedDialIcon />}
            onBlur={this.handleClose}
            onClick={this.handleClick}
            onClose={this.handleClose}
            onFocus={this.handleOpen}
            onMouseEnter={this.handleOpen}
            onMouseLeave={this.handleClose}
            open={open}
            direction={direction}
          >
            {actions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => {
                  this.handleClick(action.name);
                }}
              />
            ))}
          </SpeedDial>
        </div>
      </Fragment>
    );
  }
}

const mapState = ({ scale, editor, title, pages, focusedPage }) => ({
  scale,
  editor,
  title,
  page: { ...pages.map[pages.focusedPage] }
});

export default connect(
  mapState,
  {
    toggleEditor,
    newNode,
    setFocusedNode,
    updateSceneTitle,
    updatePage
  }
)(Nav);
