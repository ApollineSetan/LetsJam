import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/TopBar.css";
import { BiSearchAlt, BiSolidBell } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

function TopBar() {
  const navigate = useNavigate();
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 500);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to handle the click event for the return button
  const handleReturnClick = () => {
    navigate(-1);
  };

  const handleCompactSearchClick = () => {
    alert("Ouvrir la recherche (modale, overlay, etc.)");
  };

  return (
    <>
      <div className="containerTopBar">
        <button
          className="returnButton"
          onClick={handleReturnClick}
          aria-label="Retour"
        >
          <i className="return">
            <IoIosArrowBack />
          </i>
        </button>

        {!isCompact && (
          <div className="searchBox">
            <input type="text" placeholder="Rechercher..." />
            <i className="searchIcon">
              <BiSearchAlt />
            </i>
          </div>
        )}

        <button className="notificationButton" aria-label="Notifications">
          <i className="notification">
            <BiSolidBell />
          </i>
        </button>
      </div>

      {isCompact && (
        <div className="compactSearchIcon" onClick={handleCompactSearchClick}>
          <BiSearchAlt />
        </div>
      )}
    </>
  );
}

export { TopBar };
