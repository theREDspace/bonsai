import { rnd } from "../lib/math"

const nodeId = rnd()
export default function(id) {
  return {
    id,
    scene: "",
    FocusedNode: nodeId,
    FocusedLink: { status: false, from: "", to: "" },
    nodes: {
      [nodeId]: {
        id: nodeId,
        type: "dialogue",
        title: "Start",
        tags: ["Intro", "test"],
        body: "And so our adventure begins...",
        pos: [910, 90],
        bounds: [210],
        linkable: true,
        collapsed: false,
        conditions: ""
      }
    },
    links: [],
    keys: [],
    editor: true,
    scale: 1,
    warning: { status: false, warningMessage: "" },
  }
}
