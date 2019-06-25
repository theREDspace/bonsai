import React, { Component } from "react"
import {
  BottomNavigationAction,
  BottomNavigation,
  Paper,
  Icon,
  IconButton
} from "@material-ui/core"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import EditTab from "../editor/edit/Edit"
import HelpTab from "../editor/help/Help"
import KeyTab from "../editor/key/Key"
import { toggleEditor } from "../store/actions"
import SceneExplorer from "../editor/sceneExplorer/SceneExplorer";

const menuIcon = <Icon className="material-icons">menu</Icon>
const editIcon = <Icon className="material-icons">mode_edit</Icon>
const keyIcon = <Icon className="material-icons">vpn_key</Icon>
const helpIcon = <Icon className="material-icons">help</Icon>
const settingsIcon = <Icon className="material-icons">settings</Icon>

const styles = {
  paper: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "30vw",
    height: "100vh",
    overflow: "hidden",
    transition: "transform 900ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0ms"
  },
  container: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 70,
    width: "30vw",
    height: "100vh - 70px",
    overflowY: "scroll"
  },
  textStyle: {
    fontFamily: "Roboto Mono"
  },
  tabContent: {
    margin: "20px"
  },
  tabs: {
    position: "fixed",
    width: "30vw",
    bottom: "0px",
    right: "0px",
    zIndex: 4
  },
  menuButton: {
    left: "-25px",
    padding: 0
  }
}

class Editor extends Component {
  static propTypes = {
    editor: PropTypes.bool.isRequired,
    toggleEditor: PropTypes.func.isRequired
  }
  state = {
    editorTab: 0
  }

  select = index => this.setState({ editorTab: index })

  render() {
    const { editor, toggleEditor } = this.props
    const hideEditor = {
      transform: !editor ? "translateX(28vw)" : "translateX(0)"
    }
    const tabs = [
      <EditTab key={0} />,
      <KeyTab key={1} />,
      <HelpTab key={2} />,
      <div key={3} style={styles.tabContent}>
        <h1>Settings...</h1>
        <p>eventually</p>
      </div>,
      <SceneExplorer />
    ]

    return (
      <Paper style={{ ...styles.paper, ...hideEditor }}>
        <div style={styles.container}>{tabs[this.state.editorTab]}</div>
        <div style={styles.tabs}>
          <BottomNavigation selectedindex={this.state.editorTab}>
            <BottomNavigationAction
              icon={settingsIcon}
              onClick={() => this.select(4)}
              data-tip={"Scene Explorer"}
            />
            <BottomNavigationAction
              icon={editIcon}
              onClick={() => this.select(0)}
              data-tip={"Edit"}
            />
            <BottomNavigationAction
              icon={keyIcon}
              onClick={() => this.select(1)}
              data-tip={"Variables"}
            />
            <BottomNavigationAction
              icon={helpIcon}
              onClick={() => this.select(2)}
              data-tip={"Help"}
            />
            <BottomNavigationAction
              icon={settingsIcon}
              onClick={() => this.select(3)}
              data-tip={"Settings"}
            />
          </BottomNavigation>
        </div>
        <IconButton
        iconstyle={styles.menuButton}
          onClick={() => toggleEditor({ editor: !editor })}
        >
          {menuIcon}
        </IconButton>
      </Paper>
    )
  }
}

const mapState = ({ editor }) => ({ editor })

export default connect(mapState, { toggleEditor })(Editor)
