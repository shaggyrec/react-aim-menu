# ReactAimMenu

React implementation of Amazon's jQuery-menu-aim.

![Build Status](https://travis-ci.org/shaggyrec/react-aim-menu.svg?branch=main)

## Installation

    npm i react-aim-menu

## Usage

    import React from 'react';
    import { MenuItem, Menu } from 'react-aim-menu';

    function ExampleApp() {

        const [showSubmenu, setShowSubmenu] = useState(null);

        function getStyleForSubmenu (i) {
            return { display: showSubmenu === i ? 'block': 'none' };
        }

        return (
            <Menu onMouseLeave={() => setShowSubmenu(null)} className="react-aim-menu">
                <MenuItem onHover={() => setShowSubmenu(0)}>item 0</MenuItem>
                <MenuItem onHover={() => setShowSubmenu(1)}>item 1</MenuItem>
                {/* ... */}
                <MenuItem onHover={() => setShowSubmenu('n')}>item n</MenuItem>
                <>
                    <div style={getStyleForSubmenu(0)}>submenu 0</div>
                    <div style={getStyleForSubmenu(1)}>submenu 1</div>
                    {/* ... */}
                    <div style={getStyleForSubmenu('n')}>submenu n</div>
                </>
            </Menu>
        );
    }

## API

### Menu

Container for a menu. Menu items must located inside this component. 

* className (string, optional) - class name for styling by CSS
* onMouseLeave (function, optional) - triggered when mouse leave the menu container
* hoverDelay (number, optional) - delay for calling next submenu

### MenuItem

Container for menu items. Menu items must located inside the Menu component.

* className (string, optional) - class name for styling by CSS
* onHover (function, optional) - triggered when mouse on the current menu item
* onLeave (function, optional) - triggered when mouse leave t the current menu item


