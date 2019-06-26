import { pageActionTypes, createNewPage } from "../config/Config";

export function pageReducer (pages = { }, { type, payload }) {
    switch (type) {
        case pageActionTypes.NEW_PAGE:
            return createPage(pages, payload);

        case pageActionTypes.DELETE_PAGE:
            return deletePage(pages, payload);

        case pageActionTypes.UPDATE_PAGE:
            return updatePage(pages, payload);

        case pageActionTypes.NEW_PAGE_NODE:
            return createNewNodeOnPage(pages, payload);

        case pageActionTypes.DELETE_PAGE_NODE:
            return deleteNodeFromPage(pages, payload);

        case pageActionTypes.UPDATE_PAGE_NODE:
            return updateNodeInPage(pages, payload);

        case pageActionTypes.SET_FOCUSED_PAGE:
            return setFocusedPage(pages, payload);
    
        case pageActionTypes.SET_PAGE_FOCUSED_NODE:
            return setFocusedNodeOnPage(pages, payload);

        default:
            return pages;
    }
}

const getCurrentPage = (pages) => pages.map[pages.focusedPage];

const createPage = (pages, { id }) => {
    return { 
        ...pages,
        order: pages.order.concat(id),
        map: {
            ...pages.map,
            [id]: createNewPage(id)
        }
    };
};

const deletePage = (pages, { id }) => {
    if (pages.order.length === 1) {
        // Don't allow the deletion of the only page in the map.
        return { ...pages };
    }

    const i = pages.order.indexOf(id);
    const order = pages.order.slice();
    const map = { ...pages.map };

    order.splice(i, 1);
    delete map[id];

    let focusedPage = pages.focusedPage;
    if (id === focusedPage) {
        const j = i >= order.length ? order.length - 1 : i;
        focusedPage = order[j];
    }

    return { ...pages, focusedPage, order, map };
};

const updatePage = (pages, payload) => {
    const page = getCurrentPage(pages);
    return { 
        ...pages,
        map: {
            ...pages.map,
            [pages.focusedPage]: {
                ...page,
                ...payload
            }
        }
    };
};

const createNewNodeOnPage =(pages, payload) => {
    console.error("TODO - Implement " + "createNewNodeOnPage in PageReducer.js");
    return { ...pages };
};

const deleteNodeFromPage = (pages, payload) => {
    console.error("TODO - Implement " + "deleteNodeFromPage in PageReducer.js");
    return { ...pages };
};

const updateNodeInPage = (pages, payload) => {
    const page = getCurrentPage(pages);
    return {
        ...pages,
        map: {
            ...pages.map,
            [pages.focusedPage]: {
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

const setFocusedPage = (pages, payload) => {
    return { ...pages, ...payload };
};

const setFocusedNodeOnPage = (pages, payload) => {
    console.error("TODO - Implement " + "setFocusedNodeOnPage in PageReducer.js");
    return { ...pages };
};