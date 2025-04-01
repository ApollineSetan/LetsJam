import React from "react";

// This component renders a menu with a list of items.
// Each item can be clicked to trigger a callback function.
function Menu({ menuObject, className, activeIndex, onMenuClick }) {
  return (
    <div className={`MenuContainer ${className}`}>
      <ul>
        {menuObject?.map((menu, index) => (
          <li
            key={menu.id}
            className={menu.id === activeIndex ? "active" : ""}
            onClick={() => onMenuClick(menu.id)}
          >
            <a href="#">
              <i>{menu.icon}</i>
              <span>{menu.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Menu };