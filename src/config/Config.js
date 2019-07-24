import { uuid } from "../lib/math";
import * as PageReducer from "../page/PageReducers";
import * as SceneReducers from "../scene/SceneReducers";
import * as LinkReducers from "../link/LinkReducers";

export const sceneActionTypes = {
    UPDATE_SCENE_TITLE: "UPDATE_SCENE_TITLE",
    DELETE_SCENE_TITLE: "DELETE_SCENE_TITLE",
    UPDATE_SCENE_SCALE: "UPDATE_SCENE_SCALE",
    TOGGLE_EDITOR: "TOGGLE_EDITOR",
    WARNING_MESSAGE: "WARNING_MESSAGE"
};

export const pageActionTypes = {
    NEW_PAGE: "NEW_PAGE",
    DELETE_PAGE: "DELETE_PAGE",
    UPDATE_PAGE: "UPDATE_PAGE",
    UPDATE_PAGE_NODE: "UPDATE_PAGE_NODE",
    DELETE_PAGE_NODE: "DELETE_PAGE_NODE",
    NEW_PAGE_NODE: "NEW_PAGE_NODE",
    SET_FOCUSED_PAGE: "SET_FOCUSED_PAGE",
    SET_PAGE_FOCUSED_NODE: "SET_PAGE_FOCUSED_NODE"
};

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
    return {
        id: id || uuid(),
        title: null,
        editor: true,
        scale: 1,
        warning: { },
        pages: {
            focusedPage: pageId,
            order: [pageId],
            map: {
                [pageId]: { ...createNewPage(pageId), isIndex: true, allowDelete: false, allowTitleChange: false, title: "Index"}
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
        isIndex: false,
        allowDelete: true,
        allowTitleChange: true,
        links: [],
        nodes: {
            [nodeId]: createNewNode(nodeId)
        }
    };
}

export function createNewNode(id, type) {
    return {
        id: id || uuid(),
        type: type || "dialogue",
        title: "Start",
        tags: ["Intro", "test"],
        body: "And so our adventure begins...",
        pos: [100, 100],
        bounds: [210],
        linkable: true,
        collapsed: false,
        conditions: ""
    }
}

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