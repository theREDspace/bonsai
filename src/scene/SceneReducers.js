import { sceneActionTypes } from "../config/Config";

/** Scene id cannot be updated, just returns the current id. */
export function idReducer(id = "") {
    return id;
}

export function titleReducer(state = "", { type, payload }) {
    if (type === sceneActionTypes.UPDATE_SCENE_TITLE) {
        return payload.title;
    }
    return state;
}

export function scaleReducer(state = 1, { type, payload }) {
    if (type === sceneActionTypes.UPDATE_SCENE_SCALE) {
        return payload.scale;
    }
    return state;
}

export function warningReducer(state = { }, { type, payload }) {
    if (type === sceneActionTypes.WARNING_MESSAGE) {
        return payload;
    }
    return state;
}

export function editorToggleReducer(state = true, { type, payload }) {
    if (type === sceneActionTypes.TOGGLE_EDITOR) {
        return payload.editor;
    }
    return state;
}