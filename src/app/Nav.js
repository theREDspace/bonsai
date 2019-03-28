import classNames from "classnames";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Toolbar, TextField, Fab, Icon, IconButton } from "@material-ui/core";
import { rnd } from "../lib/math";
import { gridSize } from "../lib/view";
import {
  toggleEditor,
  setFocusedNode,
  newNode,
  updateScene
} from "../store/actions";
import { saveState } from "../store/localStorage";
import { exportState } from "../store/export";
import { focusedStore } from "../app/Scene";
import { capitalize } from "@material-ui/core/utils/helpers";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
  directionLeft: {},
  list: {
    width: 200,
  },
  rows:{
    display: 'inline'
 }
};

const actions = [
  { icon: <Icon>chat</Icon>, name: "Node" },
  { icon: <Icon>question_answer</Icon>, name: "MCQ" },
  { icon: <Icon>scatter_plot</Icon>, name: "Branch" }
];

class Nav extends Component {
  static propTypes = {
    toggleEditor: PropTypes.func.isRequired,
    updateScene: PropTypes.func.isRequired,
    setFocusedNode: PropTypes.func.isRequired,
    newNode: PropTypes.func.isRequired,
    editor: PropTypes.bool.isRequired,
    scene: PropTypes.string.isRequired
  };

  state = {
    redirect: "",
    fileOpen: false,
    direction: "up",
    open: false,
    hidden: false,
    left: false,
    pages:{}
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
    const newId = rnd();
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

  handleSceneUpdate = e => {
    this.props.updateScene({ scene: e.target.value });
  };

  handleRequestClose = () => {
    this.setState({
      fileOpen: false
    });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  }

  render() {
    const { scene } = this.props;
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

    const sideList = (
      <div style={styles.list}>
        <div style={styles.rows}>
          <div style={styles.rows}>Add Chapter</div>
          <IconButton
            style={styles.rows}
            tooltip="Add Chapter"
            onClick={() => {
              saveState(focusedStore.getState());

              let len = Object.keys(this.state.pages).length;

              if(len == null) len = 0;
              
              this.setState(prevState => ({
              pages: {
                  ...prevState.pages,
                  [len]:"test" + len
              },
          }));
              console.log(this.state.pages)
            }}
          >
            <Icon className="material-icons">add_circle_outline</Icon>
          </IconButton>
        </div>
        <List>
          {
            Object.keys(this.state.pages).map((key, index) => (
              <ListItem button key={this.state.pages[key]}>
                <ListItemText primary={this.state.pages[key]} />
              </ListItem>
            ))
          }
        </List>
      </div>
    );

    return (
      <Fragment>
        <Toolbar style={styles.container}>
          <IconButton
            tooltip="Chapters"
            onClick={() => {
              saveState(focusedStore.getState());
              this.setState({ left: true });
            }}
          >
            <Icon className="material-icons">class</Icon>
          </IconButton>

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
            name="scene"
            fullWidth
            style={styles.textField}
            textareastyle={styles.textStyle}
            hinttext="Scene"
            onChange={this.handleSceneUpdate}
            value={scene}
          />
        </Toolbar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            {sideList}
        </Drawer>
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

const mapState = ({ scale, editor, scene }) => ({
  scale,
  editor,
  scene
});

export default connect(
  mapState,
  {
    toggleEditor,
    newNode,
    setFocusedNode,
    updateScene
  }
)(Nav);
