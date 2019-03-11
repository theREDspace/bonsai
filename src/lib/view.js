const winWidth = window.innerWidth
const winHeight = window.innerHeight

export const gridSize = 30

export const layers = Object.freeze({
  GRID: 0,
  ARROWS: 3,
  TREE: 4,
  CURRENTTREEARROWS: 6,
  CURRENTTREE: 7,
  OVERLAY: 8,
  CURRENTARROW: 9,
  FocusedNode: 10
})

export function dimensions(nodes, scale) {
  let width = winWidth
  let height = winHeight
  let passagesWidth = 0
  let passagesHeight = 0
  nodes.forEach(n => {
    const right = n.pos[0] + winWidth // + width
    const bottom = n.pos[1] + winHeight // + height

    if (right > passagesWidth) {
      passagesWidth = right
    }
    if (bottom > passagesHeight) {
      passagesHeight = bottom
    }
  })

  width = Math.max(passagesWidth / scale, winWidth)
  height = Math.max(passagesHeight / scale, winHeight)
  width += winWidth
  height += winHeight
  return {
    width: width + "px",
    height: height + "px"
  }
}
