import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn,
  TableHeaderColumn,
  IconButton,
  FontIcon,
  FlatButton,
  Popover,
  TextField
} from "material-ui"

import { newKey, deleteKey } from "../../store/actions"

// const editIcon = <FontIcon className="material-icons">mode_edit</FontIcon>
const deleteIcon = <FontIcon className="material-icons">delete</FontIcon>

const styles = {
  textStyle: {
    fontFamily: "Roboto Mono",
    fontSize: 12
  },
  tabContent: {
    margin: "20px"
  },
  popover: {
    margin: "20px",
    width: "25vw"
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

class KeyTab extends Component {
  static propTypes = {
    newKey: PropTypes.func.isRequired,
    deleteKey: PropTypes.func.isRequired,
    keys: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    keys: []
  }
  state = {
    open: false,
    newKey: "",
    newDefault: ""
  }

  handleClick = event => {
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleNewKey = event => {
    this.props.newKey({
      key: this.state.newKey,
      default: this.state.newDefault
    })
    this.setState({ open: false, newKey: "", newDefault: "" })
  }

  handleKeyUpdate = event => {
    this.setState({ newKey: event.target.value })
  }
  handleDefaultUpdate = event => {
    this.setState({ newDefault: event.target.value })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
      newKey: "",
      newDefaut: ""
    })
  }

  render() {
    const { newKey, newDefault } = this.state
    return (
      <div style={styles.tabContent}>
        <FlatButton label="New" primary={true} onClick={this.handleClick} />

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
          onRequestClose={this.handleRequestClose}
        >
          <div style={styles.popover}>
            <TextField
              name="key"
              fullWidth
              textareaStyle={styles.textStyle}
              floatingLabelFixed
              floatingLabelText={<span>Key</span>}
              value={newKey}
              onChange={e => this.handleKeyUpdate(e)}
            />
            <TextField
              name="default"
              fullWidth
              textareaStyle={styles.textStyle}
              floatingLabelFixed
              floatingLabelText={<span>Default</span>}
              value={newDefault}
              onChange={e => this.handleDefaultUpdate(e)}
            />
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.handleNewKey}
            />
          </div>
        </Popover>
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Field</TableHeaderColumn>
              <TableHeaderColumn>Default</TableHeaderColumn>
              <TableHeaderColumn>Options</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.keys.map((data, i) => (
              <TableRow key={data.key}>
                <TableRowColumn>{data.key}</TableRowColumn>
                <TableRowColumn>{data.default}</TableRowColumn>
                <TableRowColumn>
                  <IconButton
                    style={styles.button}
                    iconStyle={styles.icon}
                    onClick={() => this.props.deleteKey(i)}
                  >
                    {deleteIcon}
                  </IconButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    keys: state.keys
  }
}

export default connect(mapStateToProps, { newKey, deleteKey })(KeyTab)
