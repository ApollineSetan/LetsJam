import { useNavigate } from "react-router-dom";
import "../styles/TopBar.css";
import { BiSearchAlt, BiSolidBell } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

function TopBar() {
  const navigate = useNavigate();

  // Function to handle the click event for the return button
  const handleReturnClick = () => {
    navigate(-1);
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
