import React, { useState, useEffect } from "react";
import "../styles/LeftMenu.css";
import logoImage from "../assets/logoImage.png";
import { Menu } from "./Menu";
import { MenuList } from "./MenuList";
import { useLocation } from "react-router-dom";

function LeftMenu() {

  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/add-demo") {
      setActiveIndex(2);
    } else if (location.pathname === "/") {
      setActiveIndex(2);
    } else if (location.pathname.startsWith("/edit-demo")) {
      setActiveIndex(2);
    } else {
      setActiveIndex(null);
    }
  }, [location]);

  return (
    <div className="leftMenu">
      <div className="logoContainer">
        <i>
          <img src={logoImage} alt="Logo" className="logoImage" />
        </i>
      </div>

      <Menu
        menuObject={MenuList.slice(0, 6)}
        className="primaryMenu"
        activeIndex={activeIndex}
        onMenuClick={setActiveIndex}
      />

      <Menu
        menuObject={MenuList.slice(6, 9)}
        className="secondaryMenu"
        activeIndex={activeIndex}
        onMenuClick={setActiveIndex}
      />
    </div>
  );
}

export { LeftMenu };