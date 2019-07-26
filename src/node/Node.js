import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Card, Typography, Icon } from "@material-ui/core";
import NodeHeader from "./fragments/NodeHeader";
import NodeFooter from "./fragments/NodeFooter";

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
    page: PropTypes.object.isRequired,
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
    widthAdjustment: 0,
    cardHeight: 0
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

  getInArrows() {
    const {
      id,
      page
    } = this.props;
    let arrows = [];
    let arrowStyle = { position: "absolute", left: -14, width: 25, height: 25 }
    let linkCount = 1;
    for(let i = 0; i < page.links.length; i++) {
      if(page.links.to === id)
      {
        linkCount++;
      }
    }
    for(let i = 0; i < 1; i++)
    {
      arrows.push(
        <div
          className="inNode"
          key={i}
          style={{
            ...arrowStyle,
            top:((this.state.cardHeight - (arrowStyle.height * linkCount)) / 2) + (arrowStyle.height * i)
          }}
        >
          <Icon className="material-icons">keyboard_arrow_left</Icon>
        </div>
      )
    }

    return arrows;
  }

  getOutArrows() {
    const {
      id,
      setFocusedLink,
      page
    } = this.props;
    let arrows = [];
    let arrowStyle = { position: "absolute", left: 205, width: 25, height: 25 };
    let linkCount = 1;
    for(let i = 0; i < page.links.length; i++) {
      if(page.links.from === id)
      {
        linkCount++;
      }
    }

    for (let i = 0; i < linkCount; i++)
    {
      arrows.push(
        <div
          className="outNode"
          key={i}
          style={{
            ...arrowStyle,
            top:((this.state.cardHeight - (arrowStyle.height * linkCount)) / 2) + (arrowStyle.height * i)
          }}
          onClick={() => {
            console.log("node id: " + id);
            setFocusedLink({
              status: true,
              from: id,
              outIndex: i
            });
          }}
        >
          <Icon className="material-icons">keyboard_arrow_right</Icon>
        </div>
      )
    }
    return arrows;
  }

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
        ref="card"
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
        {this.getInArrows()}
        {this.getOutArrows()}
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

  componentDidMount()
  {
    this.setState({
      cardHeight: ReactDOM.findDOMNode(this.refs.card).getBoundingClientRect().height
    })
  }
}

export default Node;
