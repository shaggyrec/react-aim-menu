import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { MenuContext } from './Menu';
import { generateId } from './functions'

function MenuItem(props: { children: any, className?: string, onHover?: () => any, onLeave?: () => any }): ReactElement {
    const [id, setId] = useState(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setId(generateId());
    }, []);
    const menu = useContext(MenuContext);

    useEffect(() => {
        if (menu.expandedItem && menu.expandedItem === id && !expanded) {
            setExpanded(true);
            props.onHover && props.onHover();
        }
        if (menu.expandedItem !== id && expanded) {
            setExpanded(false);
            props.onLeave && props.onLeave();
        }
    }, [menu.expandedItem])

    function handleMouseEnter(): void {
        menu.onItemEnter(id);
    }

    return <div className={props.className} onMouseEnter={handleMouseEnter} onMouseLeave={menu.onItemLeave}>{props.children}</div>;
}

export default MenuItem;