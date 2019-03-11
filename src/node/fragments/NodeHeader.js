import React from "react"
import PropTypes from "prop-types"
import { CardHeader, FontIcon } from "material-ui"

const styles = {
  title: {
    paddingRight: 20
  },
  subtitle: {
    fontSize: 11
  },
  choicesTitle: {
    display: "block",
    width: "80%",
    padding: 0,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  expand: {
    position: "absolute",
    right: "10px",
    top: "10px"
  }
}

export default function NodeHeader({
  type,
  title,
  body,
  actor,
  color,
  expanded,
  expand
}) {
  return (
    <CardHeader
      title={type === "dialogue" ? title : expanded ? "" : body}
      subtitle={actor}
      subtitleStyle={styles.subtitle}
      showExpandableButton
      actAsExpander
      style={{
        fontWeight: "bold",
        padding: 10,
        backgroundColor: `#${color}`,
        width: "100%"
      }}
      titleStyle={type === "choice" ? styles.choicesTitle : styles.title}
      textStyle={{ display: "block", padding: 0 }}
      className={"draggable"}
    >
      {/* Placing header in seperate file requires handling and create expand button manually   */}
      <FontIcon
        style={styles.expand}
        onClick={() => expand(!expanded)}
        className="material-icons"
      >
        {expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
      </FontIcon>
    </CardHeader>
  )
}

NodeHeader.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  actor: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  expand: PropTypes.func.isRequired
}
