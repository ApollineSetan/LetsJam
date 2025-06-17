import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HiHome, HiUserGroup } from "react-icons/hi";
import { TbUserFilled, TbLogout2 } from "react-icons/tb";
import { BiSolidMessageSquareDetail, BiNetworkChart } from "react-icons/bi";
import { IoBookmarks } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaFile } from "react-icons/fa6";
import logoImage from "../assets/logoImage.png";
import "../styles/LeftMenu.css";

function LeftMenu() {
  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();

  const MenuList = [
    { id: 1, icon: <HiHome />, name: "Accueil" },
    { id: 2, icon: <TbUserFilled />, name: "Profil" },
    { id: 3, icon: <BiSolidMessageSquareDetail />, name: "Messagerie" },
    { id: 4, icon: <BiNetworkChart />, name: "Réseau" },
    { id: 5, icon: <HiUserGroup />, name: "Groupes" },
    { id: 6, icon: <IoBookmarks />, name: "Enregistrements" },
    { id: 7, icon: <IoMdSettings />, name: "Paramètres" },
    { id: 8, icon: <FaFile />, name: "Conditions générales" },
    { id: 9, icon: <TbLogout2 />, name: "Se déconnecter" },
  ];

  useEffect(() => {
    if (
      location.pathname === "/add-demo" ||
      location.pathname === "/" ||
      location.pathname.startsWith("/edit-demo")
    ) {
      setActiveIndex(2);
    } else {
      setActiveIndex(null);
    }
  }, [location]);

  const renderMenu = (menuItems, className) => (
    <div className={`MenuContainer ${className}`}>
      <ul>
        {menuItems.map((menu) => (
          <li
            key={menu.id}
            className={menu.id === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(menu.id)}
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

  return (
    <div className="leftMenu">
      <div className="logoContainer">
        <i>
          <img src={logoImage} alt="Logo" className="logoImage" />
        </i>
      </div>
      {renderMenu(MenuList.slice(0, 6), "primaryMenu")}
      {renderMenu(MenuList.slice(6, 9), "secondaryMenu")}
    </div>
  );
}

export { LeftMenu };
