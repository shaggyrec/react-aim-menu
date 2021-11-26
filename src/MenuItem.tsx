import React, { HTMLAttributes, ReactNode, Ref, useContext, useEffect, useState } from 'react';
import { MenuContext } from './Menu';
import { generateId } from './functions'

type MenuItemProps = {
    onHover?: () => any
    onLeave?: () => any
    children: ReactNode
} & HTMLAttributes<HTMLDivElement>

const MenuItem = React.forwardRef(function MenuItem(
    props: MenuItemProps,
    ref: Ref<HTMLDivElement>
) {
    const [id, setId] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const menu = useContext(MenuContext);

    useEffect(() => {
        setId(generateId());
    }, []);

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

    function handleMouseEnter(event: React.MouseEvent<HTMLDivElement>): void {
        menu.onItemEnter(id);
        props.onMouseEnter && props.onMouseEnter(event)
    }

    function handleMouseLeave(event: React.MouseEvent<HTMLDivElement>): void {
        menu.onItemLeave()
        props.onMouseLeave && props.onMouseLeave(event)
    }

    return (
        <div
            {...props}
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.children}
        </div>
    );
})

export default MenuItem;