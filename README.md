# ReactAimMenu

React implementation of Amazon's jQuery-menu-aim.

![Build Status](https://travis-ci.org/shaggyrec/react-aim-menu.svg?branch=main)

## Installation

    npm i react-aim-menu

## Usage

```jsx
import React from 'react';
import { MenuItem, Menu } from 'react-aim-menu';

function ExampleApp() {
    const [showSubmenu, setShowSubmenu] = useState(null);

    return (
        <Menu
            className="react-aim-menu"
            onMouseLeave={() => setShowSubmenu(null)}
        >
            <MenuItem onHover={() => setShowSubmenu(0)}>Item 0</MenuItem>
            <MenuItem onHover={() => setShowSubmenu(1)}>Item 1</MenuItem>
            {/* ... */}
            <MenuItem onHover={() => setShowSubmenu('n')}>item n</MenuItem>
        </Menu>
    );
}
```

## API

### Menu

Container for a menu. Menu items must located inside this component. 

* hoverDelay (number, optional) - delay for calling next submenu

### MenuItem

Container for menu items. Menu items must located inside the Menu component.

* onHover (function, optional) - triggered when mouse on the current menu item
* onLeave (function, optional) - triggered when mouse leave the current menu item


