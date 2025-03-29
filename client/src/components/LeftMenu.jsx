import React, { useState, useEffect } from "react";
import "../styles/LeftMenu.css";
import logoImage from "../assets/logoImage.png";
import { Menu } from "./Menu";
import { MenuList } from "./MenuList";
import { useLocation } from "react-router-dom"; // Importer le hook useLocation

function LeftMenu() {
  // Création d'un état pour suivre l'élément de menu actif
  const [activeIndex, setActiveIndex] = useState(null);

  // Utilisation de useLocation pour obtenir l'URL actuelle
  const location = useLocation();

  useEffect(() => {
    // Logique pour définir l'index de l'élément actif en fonction de l'URL actuelle
    if (location.pathname === "/add-demo") {
      setActiveIndex(2); // "Profil" (id: 2) est actif sur la page AddDemo
    } else if (location.pathname === "/") {
      setActiveIndex(2); // "Profil" (id: 2) est actif sur la page EditionPage
    } else if (location.pathname.startsWith("/edit-demo")) {
      setActiveIndex(2); // "Profil" (id: 2) est actif sur la page InfoDemo
    } else {
      setActiveIndex(null); // Si aucune condition ne correspond, aucun élément n'est surligné
    }
  }, [location]); // Mettre à jour l'index actif chaque fois que l'URL change

  return (
    <div className="leftMenu">
      <div className="logoContainer">
        <i>
          <img src={logoImage} alt="Logo" className="logoImage" />
        </i>
      </div>

      {/* Passer activeIndex et handleMenuClick aux menus supérieurs et inférieurs*/}
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