import React, { ReactElement } from 'react';
interface ContextState {
    onItemEnter?: (item: string) => void;
    onItemLeave?: () => void;
    expandedItem?: string;
}
export declare const MenuContext: React.Context<ContextState>;
declare function Menu(props: {
    children: any;
    onMouseLeave?: () => any;
    className?: string;
    hoverDelay?: number;
}): ReactElement;
export default Menu;
