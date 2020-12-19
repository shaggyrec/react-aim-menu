"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuContext = void 0;
var react_1 = __importStar(require("react"));
var functions_1 = require("./functions");
var state = {
    pendingExpand: {
        item: null,
        timeoutId: null
    },
    mouseHistory: []
};
function clearPendingExpand() {
    if (state.pendingExpand && state.pendingExpand.timeoutId) {
        clearTimeout(state.pendingExpand.timeoutId);
    }
    state.pendingExpand = null;
}
function checkAim(menuElem) {
    if (state.mouseHistory.length < 2)
        return false;
    var currentPosition = state.mouseHistory[state.mouseHistory.length - 1];
    var prevPosition = state.mouseHistory[0];
    var menuBox = functions_1.getRectangle(menuElem);
    var triangle = functions_1.getTriangleZone(menuBox, prevPosition);
    return functions_1.isInsideTriangle(triangle, currentPosition);
}
var defaultState = {};
var DEFAULT_HOVER_DELAY = 450;
var MOUSE_HISTORY_SIZE = 3;
exports.MenuContext = react_1.createContext(defaultState);
function Menu(props) {
    var hoverDelay = props.hoverDelay || DEFAULT_HOVER_DELAY;
    var menuRef = react_1.useRef();
    var _a = react_1.useState(null), expandedItem = _a[0], setExpandedItem = _a[1];
    function updateExpand() {
        if (!state.pendingExpand || expandedItem === state.pendingExpand.item) {
            return;
        }
        setExpandedItem(state.pendingExpand.item);
        state.mouseHistory = [];
        clearPendingExpand();
    }
    function onItemEnter(item) {
        clearPendingExpand();
        state.pendingExpand = { item: item };
        if (!expandedItem || !checkAim(menuRef.current)) {
            return updateExpand();
        }
        state.pendingExpand.timeoutId = setTimeout(function () { return updateExpand(); }, hoverDelay);
    }
    function onItemLeave() {
        state.pendingExpand = {
            item: null,
            timeoutId: setTimeout(function () { return updateExpand(); }, hoverDelay + 100)
        };
    }
    function onMouseMove(_a) {
        var nativeEvent = _a.nativeEvent;
        state.mouseHistory.push(functions_1.getMousePosition(nativeEvent));
        if (state.mouseHistory.length > MOUSE_HISTORY_SIZE) {
            state.mouseHistory.shift();
        }
    }
    function handleMenuLeave() {
        props.onMouseLeave && props.onMouseLeave();
        clearPendingExpand();
        setExpandedItem(null);
    }
    return (react_1.default.createElement(exports.MenuContext.Provider, { value: { onItemEnter: onItemEnter, onItemLeave: onItemLeave, expandedItem: expandedItem } },
        react_1.default.createElement("div", { ref: menuRef, className: props.className, onMouseLeave: handleMenuLeave, onMouseMove: onMouseMove }, props.children)));
}
exports.default = Menu;
//# sourceMappingURL=Menu.js.map