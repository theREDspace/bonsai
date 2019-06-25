import { pageActionTypes } from "../config/Config";

export function pageReducer (state = { }, { type, payload }) {
    switch (type) {
        case pageActionTypes.newPage:
            return createPage(state, payload);

        case pageActionTypes.updatePage:
            return updatePage(state, payload);

        case pageActionTypes.newNode:
            return createNewNodeOnPage(state, payload);

        case pageActionTypes.deleteNode:
            return deleteNodeFromPage(state, payload);

        case pageActionTypes.updateNode:
            return updateNodeInPage(state, payload);

        case pageActionTypes.setFocusedPage:
            return setFocusedPage(state, payload);
    
        case pageActionTypes.setFocusedNode:
            return setFocusedNodeOnPage(state, payload);

        default:
            return state;
    }
}

const getCurrentPage = (state) => state.map[state.focusedPage];

const createPage = (state, payload) => {
    console.error("TODO - Implement " + "createPage in PageReducer.js");
    return { ...state };
};

const updatePage = (state, payload) => {
    const page = getCurrentPage(state);
    return { 
        ...state,
        map: {
            ...state.map,
            [state.focusedPage]: {
                ...page,
                ...payload
            }
        }
    };
};

const createNewNodeOnPage =(state, payload) => {
    console.error("TODO - Implement " + "createNewNodeOnPage in PageReducer.js");
    return { ...state };
};

const deleteNodeFromPage = (state, payload) => {
    console.error("TODO - Implement " + "deleteNodeFromPage in PageReducer.js");
    return { ...state };
};

const updateNodeInPage = (state, payload) => {
    const page = getCurrentPage(state);
    return {
        ...state,
        map: {
            ...state.map,
            [state.focusedPage]: {
                ...page,
                nodes: {
                    ...page.nodes,
                    [payload.id]: {
                        ...page.nodes[payload.id],
                        ...payload
                    }
                }
            }
        }
    };
};

const setFocusedPage = (state, payload) => {
    return { ...state, ...payload };
};

const setFocusedNodeOnPage = (state, payload) => {
    console.error("TODO - Implement " + "setFocusedNodeOnPage in PageReducer.js");
    return { ...state };
};