import React from "react"
import Draggable from "react-draggable"
import PropTypes from "prop-types"

const styles = {
  corner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 0,
    padding: 0,
    transition: `transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms`,
    cursor: "pointer"
  }
}

export default function Corner({ adjustWidth, updateWidth }) {
  return (
    <Draggable
      axis="x"
      grid={[30, 30]}
      onDrag={(e, d) => adjustWidth(e, d)}
      onStop={updateWidth}
    >
      <svg
        style={styles.corner}
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-labelledby="corner"
        data-tip={"Resize"}
        data-tippos={"bottom"}
      >
        <polygon
          points="10 0, 10 10, 0 10"
          stroke="black"
          fill="black"
          strokeWidth="1"
        />
      </svg>
    </Draggable>
  )
}

Corner.propTypes = {
  adjustWidth: PropTypes.func.isRequired,
  updateWidth: PropTypes.func.isRequired
}
