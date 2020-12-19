export declare function generateId(): string;
export declare const getMousePosition: (mouseEvent: MouseEvent) => {
    x: number;
    y: number;
};
export declare const getRectangle: (elem: Element) => {
    topLeft: {
        x: number;
        y: number;
    };
    topRight: {
        x: number;
        y: number;
    };
    bottomLeft: {
        x: number;
        y: number;
    };
    bottomRight: {
        x: number;
        y: number;
    };
};
export declare const getTriangleZone: (menuBox: any, point: {
    x: number;
    y: number;
}, direction?: string) => {
    A: {
        x: number;
        y: number;
    };
    B: any;
    C: any;
};
export declare const isInsideTriangle: (triangle: any, point: any) => boolean;
