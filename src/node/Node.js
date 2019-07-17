import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Typography, Icon } from "@material-ui/core";
import NodeHeader from "./fragments/NodeHeader";
import NodeFooter from "./fragments/NodeFooter";
import {connect} from "react-redux";
import {
  newLink,
  setFocusedLink
} from "../store/actions";

const styles = {
  body: {
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    padding: "2px 10px 5px",
    margin: "5px 0px 0px",
    fontSize: 11
  },
  divider: {
    margin: "5px 0px"
  }
};

class Node extends Component {
  static propTypes = {
    current: PropTypes.bool.isRequired,
    //id: PropTypes.string.isRequired,
    //type: PropTypes.string.isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
    prev: PropTypes.array,
    next: PropTypes.array,
    pos: PropTypes.array,
    bounds: PropTypes.array,
    updateNode: PropTypes.func.isRequired,
    setFocusedLink: PropTypes.func.isRequired,
    deleteAllLinks: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired
  };
  static defaultProps = {
    title: "",
    color: "FFFFFF",
    body: "",
    current: false
  };
  state = {
    expanded: true,
    collapsed: false,
    widthAdjustment: 0
  };

  handleExpandChange = expanded => {
    this.setState({ expanded });
  };

  adjustWidth = (event, data) => {
    this.setState({ widthAdjustment: data.x });
  };

  updateWidth = () => {
    const { bounds, updateNode, id } = this.props;
    updateNode({
      id,
      payload: { bounds: [bounds[0] + this.state.widthAdjustment] }
    });
    this.setState({ widthAdjustment: 0 });
  };

  componentWillReceiveProps(nextProps) {
    /*if (nextProps.page.focusedLink.status !== this.props.page.focusedLink.status) {
      const { id, updateNode, node } = this.props
      if (nextProps.node.id === nextProps.page.focusedLink.from) {
        nextProps.node.next.forEach(n => {
          updateNode({ id: n, payload: { linkable: false } })
        })
      }
      if (node.linkable === false) {
        updateNode({ id, payload: { linkable: true } })
      }
    }*/

    //updateNode({ id:nextProps.id, payload: { linkable: true } })
  }

  render() {
    const {
      id,
      type,
      title,
      body,
      color,
      bounds,
      setFocusedLink,
      deleteAllLinks,
      deleteNode
    } = this.props;
    const { widthAdjustment } = this.state;
    return (
      <Card
        style={{
          width: `calc(${bounds[0]}px + ${widthAdjustment}px)`
        }}
      >
        <NodeHeader
          {...{
            type,
            title,
            body,
            color
          }}
        />
        <div
          className="inNode"
          style={{ position: "absolute", left: -20, width: 25, height: 25 }}
          onClick={()=>{
            console.log("in node clicked");
            newLink({
              to: id
            });
          }}
        >
          <Icon className="material-icons">keyboard_arrow_left</Icon>
        </div>
        <div
          className="outNode"
          style={{ position: "absolute", left: 205, width: 25, height: 25 }}
          onClick={() => {
            setFocusedLink({
              status: true,
              from: id,
              outIndex: 0
            });
          }}
        >
          <Icon className="material-icons">keyboard_arrow_right</Icon>
        </div>
        {type !== "Node" && (
          <div
            className="outNode"
            style={{
              position: "absolute",
              left: 205,
              top: 75,
              width: 25,
              height: 25
            }}
            onClick={() => {
              console.log("node id: " + id);
              setFocusedLink({
                status: true,
                from: id,
                outIndex: 1
              });
            }}
          >
            <Icon className="material-icons">keyboard_arrow_right</Icon>
          </div>
        )}
        <Typography style={styles.body}>{body}</Typography>
        <NodeFooter
          {...{
            id,
            isFocusedNode: this.isFocusedNode,
            setFocusedLink,
            deleteAllLinks,
            deleteNode
          }}
        />
      </Card>
    );
  }
}
const mapState = ({ scale, editor, pages, focusedPage }) => ({
  scale,
  editor,
  page: { ...pages.map[pages.focusedPage] }
});

export default connect(
  mapState,
  {
    setFocusedLink,
    newLink
  }
)(Node);
