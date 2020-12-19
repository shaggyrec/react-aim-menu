"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInsideTriangle = exports.getTriangleZone = exports.getRectangle = exports.getMousePosition = exports.generateId = void 0;
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
exports.generateId = generateId;
var getMousePosition = function (mouseEvent) {
    var pos = { x: 0, y: 0 };
    if (mouseEvent.pageX || mouseEvent.pageY) {
        pos = { x: mouseEvent.pageX, y: mouseEvent.pageY };
    }
    else if (mouseEvent.clientX || mouseEvent.clientY) {
        pos = {
            x: mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
            y: mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop
        };
    }
    return pos;
};
exports.getMousePosition = getMousePosition;
var getRectangle = function (elem) {
    var boundingBox = elem.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        topLeft: {
            x: boundingBox.left + scrollLeft,
            y: boundingBox.top + scrollTop,
        },
        topRight: {
            x: boundingBox.left + scrollLeft + boundingBox.width,
            y: boundingBox.top + scrollTop
        },
        bottomLeft: {
            x: boundingBox.left + scrollLeft,
            y: boundingBox.top + scrollTop + boundingBox.height,
        },
        bottomRight: {
            x: boundingBox.left + scrollLeft + boundingBox.width,
            y: boundingBox.top + scrollTop + boundingBox.height,
        }
    };
};
exports.getRectangle = getRectangle;
var getTriangleZone = function (menuBox, point, direction) {
    if (direction === void 0) { direction = 'right'; }
    if (direction === 'right') {
        var width = menuBox.topRight.x - menuBox.topLeft.x;
        var height = menuBox.bottomRight.y - menuBox.topRight.y;
        return {
            A: {
                x: point.x,
                y: point.y
            },
            B: {
                x: menuBox.topRight.x + width,
                y: Math.min(0, menuBox.topRight.y - height)
            },
            C: {
                x: menuBox.bottomRight.x + width,
                y: menuBox.bottomRight.y + height
            },
        };
    }
    else if (direction === 'down') {
        return {
            A: point,
            B: menuBox.topRight,
            C: menuBox.bottomRight
        };
    }
};
exports.getTriangleZone = getTriangleZone;
var isInsideTriangle = function (triangle, point) {
    var A = triangle.A, B = triangle.B, C = triangle.C;
    return checkSameSide(toEdge(A, B), C, point)
        && checkSameSide(toEdge(A, C), B, point)
        && checkSameSide(toEdge(B, C), A, point);
};
exports.isInsideTriangle = isInsideTriangle;
var checkSameSide = function (edge, point1, point2) {
    return getPolarity(edge, point1) === getPolarity(edge, point2);
};
var getPolarity = function (edge, point) {
    var vectorA = toVector(edge.v1, edge.v2);
    var vectorB = toVector(edge.v1, point);
    var scalar = (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
    return scalar >= 0 ? 1 : -1;
};
var toEdge = function (pointA, pointB) {
    return {
        v1: __assign({}, pointA),
        v2: __assign({}, pointB),
    };
};
var toVector = function (pointA, pointB) {
    return {
        x: pointB.x - pointA.x,
        y: pointB.y - pointA.y
    };
};
//# sourceMappingURL=functions.js.map