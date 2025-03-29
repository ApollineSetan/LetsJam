import React from "react";

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