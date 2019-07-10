import React from "react"
import PropTypes from "prop-types"
import { CardHeader } from "@material-ui/core"

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
  color
}) {
  return (
    <CardHeader
      title={type === "dialogue" ? title :  body}
      subtitlestyle={styles.subtitle}
      style={{
        fontWeight: "bold",
        padding: 10,
        backgroundColor: `#${color}`,
        width: "100%"
      }}
      titlestyle={type === "choice" ? styles.choicesTitle : styles.title}
      textstyle={{ display: "block", padding: 0 }}
      className={"draggable"}
    />
  )
}

NodeHeader.propTypes = {
  title: PropTypes.string.isRequired,
  //type: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,

}
