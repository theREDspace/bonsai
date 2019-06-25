import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Icon,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import { uuid } from "../lib/math";
import { createNewScene } from "../config/Config";

const styles = {
  name: {
    fontSize: 62,
    margin: "5vh auto 5vh auto",
    textAlign: "center",
    color: "#558b2f"
  },
  space: {
    textAlign: "center"
  },
  option: {
    textAlign: "center",
    padding: "16px",
    textDecoration: "none"
  },
  trash: {
    position: "absolute",
    right: "20vw"
  },
  input: {
    display: "none"
  },
  button: {
    margin: 0
  }
};

export default class Landing extends Component {
  state = {
    scenes: [],
    usedSpace: 0,
    remainigSpace: 0,
    redirect: ""
  };
  newScene = () => {
    const id = uuid();
    localStorage.setItem(id, JSON.stringify(createNewScene(id)));
    this.setState({ redirect: id });
  };

  deleteScene = i => {
    localStorage.removeItem(i);
    this.setState({ scenes: this.renderScenes() });
  };

  handleChange = files => {
    this.setState({
      files: files
    });
  };

  uploadFile = () => {
    var files = document.getElementById("selectFiles").files;
    console.log(files);
    if (files.length <= 0) {
      return false;
    }

    var fr = new FileReader();

    let _this = this;
    fr.onload = function(e) {
      var result = JSON.parse(e.target.result);
      var formatted = JSON.stringify(result, null, 2);
      console.log(formatted);

      const id = uuid();
      localStorage.setItem(id, formatted);
      _this.setState({ redirect: id });
    };

    fr.readAsText(files.item(0));
  };

  renderScenes = () => {
    let existingScenes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const sceneTitle = JSON.parse(localStorage.getItem(localStorage.key(i))).title;
      existingScenes.push(
        <ListItem
          button
          key={sceneTitle || `untitled${i}`}
          innerdivstyle={styles.option}
          onClick={() => this.setState({ redirect: localStorage.key(i) })}
          righticonbutton={
            <IconButton
              style={styles.trash}
              iconstyle={styles.icon}
              onClick={() => this.deleteScene(localStorage.key(i))}
            >
              <Icon className="material-icons">delete</Icon>
            </IconButton>
          }
        >
          <ListItemText primary={sceneTitle || "untitled scene"} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Delete"
              onClick={() => this.deleteScene(localStorage.key(i))}
            >
              <Icon className="material-icons">delete</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    }
    return existingScenes.sort((a, b) => a.key > b.key);
  };

  componentWillMount() {
    // TODO: Get this working properly
    window.navigator.webkitTemporaryStorage.queryUsageAndQuota(
      (used, remaining) => {
        this.setState({
          usedSpace: (used / 1024 ** 3).toFixed(2) + "mb",
          remainingSpace: (remaining / 1024 ** 3).toFixed(2) + "mb"
        });
      }
    );
    return this.setState({ scenes: this.renderScenes() });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/scene/${this.state.redirect}`} />;
    }
    return (
      <div>
        <div style={styles.name}> bonsai </div>
        <div style={styles.space}>
          {`Used: ${this.state.usedSpace} | Remaining: ${
            this.state.remainingSpace
          }`}
        </div>
        <input type="file" id="selectFiles" />
        <br />
        <button id="import" onClick={this.uploadFile}>
          Import
        </button>

        <List>
          <ListItem button onClick={this.newScene}>
            <ListItemText primary="New" />
          </ListItem>
          {this.state.scenes}
        </List>
      </div>
    );
  }
}
