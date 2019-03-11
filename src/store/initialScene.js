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
        actor: 0,
        conditions: ""
      }
    },
    links: [],
    actors: [{ name: "Narrator", playable: false, color: "FFFFFF" }],
    colors: ["FFFFFF", "94E495", "85B7A1", "486B8D", "554A6E", "501D47"],
    keys: [],
    editor: true,
    scale: 1,
    warning: { status: false, warningMessage: "" }
  }
}
