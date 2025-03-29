import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TopBar.css";
import { BiSearchAlt, BiSolidBell } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

function TopBar() {
  const navigate = useNavigate();

  const handleReturnClick = () => {
    navigate(-1); // Cela va revenir à la page précédente dans l'historique
  };

  return (
    <div className="containerTopBar">
      <button className="returnButton" onClick={handleReturnClick}>
        <i className="return">
          <IoIosArrowBack />
        </i>
      </button>
      <div className="searchBox">
        <input type="text" placeholder="Rechercher..." />
        <i className="searchIcon">
          <BiSearchAlt />
        </i>
      </div>
      <button className="notificationButton">
        <i className="notification">
          <BiSolidBell />
        </i>
      </button>
    </div>
  );
}

export { TopBar };