import React, { createContext, ReactElement, useRef, useState } from 'react';
import { getMousePosition, getRectangle, getTriangleZone, isInsideTriangle } from './functions';

const state: { pendingExpand: { item: string|null, timeoutId?: any }, mouseHistory: any[]} = {
    pendingExpand: {
        item: null,
        timeoutId: null
    },
    mouseHistory: []
}

function clearPendingExpand (): void {
    if (state.pendingExpand && state.pendingExpand.timeoutId) {
        clearTimeout(state.pendingExpand.timeoutId);
    }
    state.pendingExpand = null;
}

function checkAim (menuElem): boolean {
    if (state.mouseHistory.length < 2) return false;
    const currentPosition = state.mouseHistory[state.mouseHistory.length - 1];
    const prevPosition = state.mouseHistory[0];
    const menuBox = getRectangle(menuElem);
    const triangle = getTriangleZone(menuBox, prevPosition);

    return isInsideTriangle(triangle, currentPosition);
}

interface ContextState {
    onItemEnter?: (item: string) => void;
    onItemLeave?: () => void;
    expandedItem?: string;
}

const defaultState: ContextState = {}

const DEFAULT_HOVER_DELAY = 450;
const MOUSE_HISTORY_SIZE = 3;

export const MenuContext = createContext(defaultState);

function Menu (props: { children: any, onMouseLeave: () => any, className?: string, hoverDelay?: number }): ReactElement {
    const hoverDelay = props.hoverDelay || DEFAULT_HOVER_DELAY;
    const menuRef = useRef();
    const [expandedItem, setExpandedItem] = useState(null);

    function updateExpand (): void {
        if (!state.pendingExpand || expandedItem === state.pendingExpand.item) {
            return;
        }
        setExpandedItem(state.pendingExpand.item);
        state.mouseHistory = [];
        clearPendingExpand();
    }
    function onItemEnter (item: string): void {
        clearPendingExpand();
        state.pendingExpand = { item };
        if (!expandedItem || !checkAim(menuRef.current)) {
            return updateExpand();
        }
        state.pendingExpand.timeoutId = setTimeout(() => updateExpand(), hoverDelay);
    }
    function onItemLeave(): void {
        state.pendingExpand = {
            item: null,
            timeoutId: setTimeout(() => updateExpand(), hoverDelay + 100)
        };
    }
    function onMouseMove ({ nativeEvent }): void {
        state.mouseHistory.push(getMousePosition(nativeEvent));
        if (state.mouseHistory.length > MOUSE_HISTORY_SIZE) {
            state.mouseHistory.shift();
        }
    }
    function handleMenuLeave (): void {
        props.onMouseLeave();
        clearPendingExpand();
        setExpandedItem(null);
    }
    return (
        <MenuContext.Provider value={{ onItemEnter, onItemLeave, expandedItem }}>
            <div ref={menuRef} className={props.className} onMouseLeave={handleMenuLeave} onMouseMove={onMouseMove}>
                {props.children}
            </div>
        </MenuContext.Provider>
    );
}
export default Menu;