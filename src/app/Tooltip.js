import React, { Component } from "react"

const styles = {
  container: {
    backgroundColor: `rgba(0,0,0,0.6)`,
    position: "fixed",
    boxSizing: "border-box",
    borderRadius: "4px",
    zIndex: "99",
    margin: "0px",
    padding: "5px",
    color: "#FFFFFF",
    textAlign: "center",
    pointerEvents: "none"
  },
  tip: {
    display: "block",
    fontSize: "0.8em",
    whiteSpace: "pre-wrap"
  }
}

const positions = {
  top: bounds => {
    return {
      x: bounds.left + bounds.width / 2,
      y: bounds.top,
      transform: "translate(-50%, -120%)"
    }
  },
  bottom: bounds => {
    return {
      x: bounds.left + bounds.width / 2,
      y: bounds.bottom,
      transform: "translate(-50%, 5px)"
    }
  },
  left: bounds => {
    return {
      x: bounds.left,
      y: bounds.top + bounds.height / 2,
      transform: "translate(-120%, -50%)"
    }
  },
  right: bounds => {
    return {
      x: bounds.right,
      y: bounds.top + bounds.height / 2,
      transform: "translate(20%, -50%)"
    }
  }
}

export default class Tooltip extends Component {
  state = {
    position: "",
    tip: "",
    visible: false,
    x: 0,
    y: 0
  }

  componentDidMount() {
    const elems = document.querySelectorAll("[data-tip]")
    elems.forEach(elem => {
      elem.addEventListener("mouseenter", this.listener(elem))
      elem.addEventListener("mouseleave", this.listener(elem))
    })
  }

  componentWillUnmount() {
    const elems = document.querySelectorAll("[data-tip]")
    elems.forEach(elem => {
      elem.removeEventListener("mouseenter", this.listener(elem))
      elem.removeEventListener("mouseleave", this.listener(elem))
    })
  }

  listener = elem => {
    const handleVisibility = e => {
      const bounds = elem.getBoundingClientRect()
      const { x, y, transform } = elem.dataset.tippos
        ? positions[elem.dataset.tippos](bounds)
        : positions["top"](bounds)
      this.setState({
        visible: e.type === "mouseenter",
        tip: elem.dataset.tip,
        x,
        y,
        transform
      })
    }
    return handleVisibility
  }

  render() {
    const { tip, visible, x, y, transform } = this.state
    const fade = {
      transition: visible ? "opacity 600ms ease 200ms" : "none",
      opacity: visible ? 100 : 0,
      top: y,
      left: x,
      transform
    }

    return (
      <div
        style={{
          ...styles.container,
          ...fade
        }}
      >
        <div style={styles.tip}>{tip}</div>
        <div style={styles.arrow} />
      </div>
    )
  }
}
