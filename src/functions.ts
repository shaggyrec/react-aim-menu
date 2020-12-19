export function generateId (): string {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const getMousePosition = function(mouseEvent: MouseEvent): { x: number, y: number } {
    let pos = { x: 0, y: 0 };
    if (mouseEvent.pageX || mouseEvent.pageY) {
        pos = { x: mouseEvent.pageX, y: mouseEvent.pageY }
    } else if (mouseEvent.clientX || mouseEvent.clientY) {
        pos = {
            x: mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
            y: mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
    }
    return pos;
}

export const getRectangle = function(elem: Element) {
    const boundingBox = elem.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
    }
}

export const getTriangleZone = function(menuBox: any, point: { x: number, y: number }, direction = 'right') {
    if (direction === 'right') {
        const width = menuBox.topRight.x - menuBox.topLeft.x;
        const height = menuBox.bottomRight.y - menuBox.topRight.y;
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
        }
    } else if (direction === 'down') {
        return {
            A: point,
            B: menuBox.topRight,
            C: menuBox.bottomRight
        }
    }
}

export const isInsideTriangle = function(triangle, point): boolean {
    const { A, B, C } = triangle;
    return checkSameSide(toEdge(A,B), C, point)
        && checkSameSide(toEdge(A,C), B, point)
        && checkSameSide(toEdge(B,C), A, point)
}


const checkSameSide = function(edge, point1, point2): boolean {
    return getPolarity(edge, point1) === getPolarity(edge, point2);
}

const getPolarity = function(edge, point) {
    const vectorA = toVector(edge.v1, edge.v2);
    const vectorB = toVector(edge.v1, point);
    const scalar = (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x)

    return scalar >= 0 ? 1 : -1;
}

const toEdge = function(pointA, pointB) {
    return {
        v1: { ...pointA },
        v2: { ...pointB },
    }
}

const toVector = function(pointA, pointB) {
    return {
        x: pointB.x - pointA.x,
        y: pointB.y - pointA.y
    }
}