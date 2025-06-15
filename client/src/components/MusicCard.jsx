import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DemoConfirmationOverlay } from "./DemoConfirmationOverlay";
import "../styles/MusicCard.css";
import iconeplay from "../assets/iconeplay.png";
import { TbTrash, TbDotsVertical } from "react-icons/tb";
import { IoMdShare } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

// This component represents a music card that displays information about a demo, including its title, duration, and image.
// The component uses states to manage the visibility of an overlay for confirming deletion and a menu for additional options.
function MusicCard({ demo, deleteDemo }) {
  const { id, title, duration, image } = demo;
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  // The background image is set using the image prop passed to the component. If no image is provided, it defaults to null.
  const backgroundImage = image ? `url(${image})` : null;
  const style = backgroundImage
    ? {
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  console.log("Duration reçue dans MusicCard:", duration);
  function formatDuration(seconds) {
    if (typeof seconds !== "number" || isNaN(seconds)) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  // Functions to handle the click event for playing the music, deleting the demo, and toggling the menu
  const handlePlayClick = () => {
    console.log("Lecture de la musique : ", title);
  };

  const handleDeleteClick = () => {
    setOverlayVisible(true);
  };

  const handleCancel = () => {
    setOverlayVisible(false);
  };

  const handleConfirmDelete = () => {
    deleteDemo(demo.id);
    setOverlayVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <div className="musicCardContainer" style={style}>
        <div className="iconsMusicCard">
          <i>
            <TbTrash onClick={handleDeleteClick} />
            <TbDotsVertical onClick={toggleMenu} />
          </i>
        </div>

        {/* The menu options are conditionally rendered based on the isMenuVisible state. */}
        {isMenuVisible && (
          <div className="menuOptions">
            <Link to="#" className="menuOptionShare">
              <IoMdShare />
              Partager
            </Link>
            <hr className="separator" />
            <Link to={`/edit-demo/${id}`} className="menuOptionEdit">
              <MdOutlineEdit />
              Modifier
            </Link>
          </div>
        )}

        {/* The Link component is used to navigate to the edit page of the demo. */}
        <div className="iconPlay" onClick={handlePlayClick}>
          <img src={iconeplay} alt="iconeplay" />
        </div>
        <div className="infoMusic">
          <p className="songName">{title}</p>
          <span className="durationMusic">{formatDuration(duration)}</span>
        </div>
      </div>

      {/* The DemoConfirmationOverlay component is conditionally rendered based on the isOverlayVisible state. */}
      {/* It displays a confirmation message for deleting the demo. */}
      {isOverlayVisible && (
        <DemoConfirmationOverlay
          demoTitle={title}
          onCancel={handleCancel}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

export { MusicCard };
