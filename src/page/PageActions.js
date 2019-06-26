import { pageActionTypes } from "../config/Config";

export function newPage(payload) {
    return { type: pageActionTypes.NEW_PAGE, payload };
}

export function deletePage(payload) {
    return { type: pageActionTypes.DELETE_PAGE, payload };
}

export function updatePage(payload) {
    return { type: pageActionTypes.UPDATE_PAGE, payload };
}

export function updateNode(payload) {
    return { type: pageActionTypes.UPDATE_PAGE_NODE, payload };
}

export function deleteNode(payload) {
    return { type: pageActionTypes.DELETE_PAGE_NODE, payload };
}

export function newNode(payload) {
    return { type: pageActionTypes.NEW_PAGE_NODE, payload };
}

export function setFocusedPage(payload) {
    return { type: pageActionTypes.SET_FOCUSED_PAGE, payload };
}

export function setFocusedNode(payload) {
    return { type: pageActionTypes.SET_PAGE_FOCUSED_NODE, payload };
}