import React from "react"
import PropTypes from "prop-types"
import { determineEdge } from "../lib/math"

export default function Link({
  from,
  to,
  linking,
  mouse,
  FocusedNode,
  deleteLink,
  setFocusedLink,
  setFocusedNode
}) {
  const fromBounds = document.getElementById(from).getBoundingClientRect()
  let toBounds
  const start = {
    x: fromBounds.left + window.scrollX + fromBounds.width / 2,
    y: fromBounds.top + window.scrollY + fromBounds.height / 2
  }
  let end
  if (linking) {
    end = { x: mouse.pageX, y: mouse.pageY }
  } else {
    toBounds = document.getElementById(to).getBoundingClientRect()
    end = {
      x: toBounds.left + window.scrollX + toBounds.width / 2,
      y: toBounds.top + window.scrollY + toBounds.height / 2
    }
    const TL = {
      x: toBounds.left + window.scrollX,
      y: toBounds.top + window.scrollY
    }
    const TR = {
      x: toBounds.left + window.scrollX + toBounds.width,
      y: toBounds.top + window.scrollY
    }
    const BL = {
      x: toBounds.left + window.scrollX,
      y: toBounds.top + window.scrollY + toBounds.height
    }
    const BR = {
      x: toBounds.left + window.scrollX + toBounds.width,
      y: toBounds.top + window.scrollY + toBounds.height
    }
    const top = determineEdge(start, end, TL, TR)
    const bottom = determineEdge(start, end, BL, BR)
    const left = determineEdge(start, end, TL, BL)
    const right = determineEdge(start, end, TR, BR)
    end = top || bottom || left || right
  }
  let dStr
  if (start && end) {
    dStr = `M${start.x} ${start.y} L ${end.x} ${end.y}`
  }
  return (
    <path
      d={dStr}
      markerEnd="url(#arrowhead)"
      stroke={FocusedNode ? "#558b2f" : "black"}
      strokeWidth="2px"
      fill="none"
      onClick={() => {
        setFocusedNode({ id: from })
        deleteLink({ from, to })
        setFocusedLink({ status: true, from })
      }}
    />
  )
}

Link.propTypes = {
  FocusedNode: PropTypes.bool.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string,
  linking: PropTypes.bool,
  mouse: PropTypes.object,
  deleteLink: PropTypes.func.isRequired,
  setFocusedLink: PropTypes.func.isRequired,
  setFocusedNode: PropTypes.func.isRequired
}
