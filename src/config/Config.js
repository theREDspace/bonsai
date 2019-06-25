import { uuid } from "../lib/math";
import * as PageReducer from "../page/PageReducers";
import * as SceneReducers from "../scene/SceneReducers";

export const sceneActionTypes = {
    updateTitle: "UPDATE_SCENE_TITLE",
    updateScale: "UPDATE_SCENE_SCALE",
    toggleEditor: "TOGGLE_EDITOR",
    warningMessage: "WARNING_MESSAGE"
};

export const pageActionTypes = {
    newPage: "NEW_PAGE",
    updatePage: "UPDATE_PAGE",
    updateNode: "UPDATE_PAGE_NODE",
    deleteNode: "DELETE_PAGE_NODE",
    newNode: "NEW_PAGE_NODE",
    setFocusedPage: "SET_FOCUSED_PAGE",
    setFocusedNode: "SET_PAGE_FOCUSED_NODE"
};

// OLD - {
//     id,
//     scene: "",
//     FocusedNode: nodeId,
//     FocusedLink: { status: false, from: "", to: "" },
//     nodes: {
//         [nodeId]: {
//             id: nodeId,
//             type: "dialogue",
//             title: "Start",
//             tags: ["Intro", "test"],
//             body: "And so our adventure begins...",
//             pos: [910, 90],
//             bounds: [210],
//             linkable: true,
//             collapsed: false,
//             conditions: ""
//         }
//     },
//     links: [],
//     keys: [],
//     editor: true,
//     scale: 1,
//     warning: { status: false, warningMessage: "" },
// }

export function createReducers() {
    return {
        id: SceneReducers.idReducer,
        title: SceneReducers.titleReducer,
        scale: SceneReducers.scaleReducer,
        warning: SceneReducers.warningReducer,
        editor: SceneReducers.editorToggleReducer,
        pages: PageReducer.pageReducer
    };
}

export function createNewScene(id) {
    const pageId = uuid();
    const testId = uuid();
    return {
        id: id || uuid(),
        title: null,
        editor: true,
        scale: 1,
        pages: {
            focusedPage: pageId,
            map: {
                [pageId]: createNewPage(pageId),
                [testId]: createNewPage(testId)
            }
        }
    };
}

export function createNewPage(id) {
    const nodeId = uuid();
    return {
        id: id || uuid(),
        focusedNode: nodeId,
        focusedLink: { status: false, from: "", to: "" },
        title: null,
        nodes: { 
            [nodeId]: createNewNode(nodeId) 
        }
    };
}

export function createNewNode(id) {
    return {
        id: id || uuid(),
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
}