import { sceneActionTypes } from "../config/Config";

/** Scene id cannot be updated, just returns the current id. */
export function idReducer(id = "") {
    return id;
}

export function titleReducer(state = "", { type, payload }) {
    if (type === sceneActionTypes.updateTitle) {
        return payload.title;
    }
    return state;
}

export function scaleReducer(state = 1, { type, payload }) {
    if (type === sceneActionTypes.updateScale) {
        return payload.scale;
    }
    return state;
}

export function warningReducer(state = { }, { type, payload }) {
    if (type === sceneActionTypes.warningMessage) {
        return payload;
    }
    return state;
}

export function editorToggleReducer(state = true, { type, payload }) {
    if (type === sceneActionTypes.toggleEditor) {
        return payload.editor;
    }
    return state;
}