import { sceneActionTypes } from "../config/Config";

export function updateSceneTitle(payload) {
    return { type: sceneActionTypes.updateTitle, payload };
}

export function setWarning(payload){
    return { type: sceneActionTypes.warningMessage, payload };
}

export function toggleEditor(payload) {
  return { type: sceneActionTypes.toggleEditor, payload };
}