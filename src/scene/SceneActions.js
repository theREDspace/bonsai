import { sceneActionTypes } from "../config/Config";

export function updateSceneTitle(payload) {
    return { type: sceneActionTypes.UPDATE_SCENE_TITLE, payload };
}

export function setWarning(payload){
    return { type: sceneActionTypes.WARNING_MESSAGE, payload };
}

export function toggleEditor(payload) {
  return { type: sceneActionTypes.TOGGLE_EDITOR, payload };
}

export function updateScale(payload) {
  return { type: sceneActionTypes.UPDATE_SCENE_SCALE, payload };
}