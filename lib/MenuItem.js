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
var react_1 = __importStar(require("react"));
var Menu_1 = require("./Menu");
var functions_1 = require("./functions");
function MenuItem(props) {
    var _a = react_1.useState(null), id = _a[0], setId = _a[1];
    var _b = react_1.useState(false), expanded = _b[0], setExpanded = _b[1];
    react_1.useEffect(function () {
        setId(functions_1.generateId());
    }, []);
    var menu = react_1.useContext(Menu_1.MenuContext);
    react_1.useEffect(function () {
        if (menu.expandedItem && menu.expandedItem === id && !expanded) {
            setExpanded(true);
            props.onHover && props.onHover();
        }
        if (menu.expandedItem !== id && expanded) {
            setExpanded(false);
            props.onLeave && props.onLeave();
        }
    }, [menu.expandedItem]);
    function handleMouseEnter() {
        menu.onItemEnter(id);
    }
    return react_1.default.createElement("div", { className: props.className, onMouseEnter: handleMouseEnter, onMouseLeave: menu.onItemLeave }, props.children);
}
exports.default = MenuItem;
//# sourceMappingURL=MenuItem.js.map