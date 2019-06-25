import { pageActionTypes } from "../config/Config";

export function newPage(payload) {
    return { type: pageActionTypes.newPage, payload };
}

export function updatePage(payload) {
    return { type: pageActionTypes.updatePage, payload };
}

export function updateNode(payload) {
    return { type: pageActionTypes.updateNode, payload };
}

export function deleteNode(payload) {
    return { type: pageActionTypes.deleteNode, payload };
}

export function newNode(payload) {
    return { type: pageActionTypes.newNode, payload };
}

export function setFocusedPage(payload) {
    return { type: pageActionTypes.setFocusedPage, payload };
}

export function setFocusedNode(payload) {
    return { type: pageActionTypes.setFocusedNode, payload };
}