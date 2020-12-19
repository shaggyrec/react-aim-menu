import React, { ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import { MenuItem, Menu } from '../src';

const items = [0,1,2,3,4];

function generateBg (): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function renderSubmenus (active): ReactElement[] {
    return items.map(i => (
        <div
            key={`submenu${i}`}
            className={`react-aim-menu__submenu${active === i ? ' react-aim-menu__submenu--active' : ''}`}
            style={{ backgroundColor: generateBg() }}
        >
            submenu{i}
        </div>
    ));
}

function ExampleApp(): ReactElement {
    const [active, setActive] = useState(null);

    function setActiveElement(index): void {
        setActive(index);
    }

    function renderMenuItems (): ReactElement[] {
        return items.map(i => (
            <MenuItem key={i} onHover={() => setActiveElement(i)} className="react-aim-menu__item">
                item{i}
            </MenuItem>
        ));
    }

    return (
        <Menu onMouseLeave={() => setActiveElement(null)} className="react-aim-menu">
            {renderMenuItems()}
            {renderSubmenus(active)}
        </Menu>
    );
}

ReactDOM.render(
    <ExampleApp />,
    document.getElementById('react-aim-menu')
);

