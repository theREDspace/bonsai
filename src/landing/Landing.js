import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { List, ListItem, FontIcon, IconButton } from "material-ui"
import initialScene from "../store/initialScene"
import { rnd } from "../lib/math"

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
  }
}

export default class Landing extends Component {
  state = {
    scenes: [],
    usedSpace: 0,
    remainigSpace: 0,
    redirect: ""
  }
  newScene = () => {
    const id = rnd()
    localStorage.setItem(id, JSON.stringify(initialScene(id)))
    this.setState({ redirect: id })
  }

  deleteScene = i => {
    localStorage.removeItem(i)
    this.setState({ scenes: this.renderScenes() })
  }

  renderScenes = () => {
    let existingScenes = []
    for (let i = 0; i < localStorage.length; i++) {
      const scene = JSON.parse(localStorage.getItem(localStorage.key(i))).scene
      existingScenes.push(
        <ListItem
          key={scene || `untitled${i}`}
          primaryText={scene || "untitled scene"}
          innerDivStyle={styles.option}
          onClick={() => this.setState({ redirect: localStorage.key(i) })}
          rightIconButton={
            <IconButton
              style={styles.trash}
              iconStyle={styles.icon}
              onClick={() => this.deleteScene(localStorage.key(i))}
            >
              <FontIcon className="material-icons">delete</FontIcon>
            </IconButton>
          }
        />
      )
    }
    return existingScenes.sort((a, b) => a.key > b.key)
  }
  componentWillMount() {
    // TODO: Get this working properly
    window.navigator.webkitTemporaryStorage.queryUsageAndQuota(
      (used, remaining) => {
        this.setState({
          usedSpace: (used / 1024 ** 3).toFixed(2) + "mb",
          remainingSpace: (remaining / 1024 ** 3).toFixed(2) + "mb"
        })
      }
    )
    return this.setState({ scenes: this.renderScenes() })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/scene/${this.state.redirect}`} />
    }
    return (
      <div>
        <div style={styles.name}> bonsai </div>
        <div style={styles.space}>
          {`Used: ${this.state.usedSpace} | Remaining: ${
            this.state.remainingSpace
          }`}
        </div>
        <List>
          <ListItem
            primaryText="new"
            innerDivStyle={styles.option}
            onClick={this.newScene}
          />
          {this.state.scenes}
        </List>
      </div>
    )
  }
}
