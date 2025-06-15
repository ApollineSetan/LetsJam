import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DemoConfirmationOverlay } from "./DemoConfirmationOverlay";
import "../styles/MusicCard.css";
import iconeplay from "../assets/iconeplay.png";
import { TbTrash, TbDotsVertical } from "react-icons/tb";
import { IoMdShare } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

function MusicCard({ demo, deleteDemo }) {
  const { id, title, duration, image } = demo;
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const backgroundImage = image ? `url(${image})` : null;
  const style = backgroundImage
    ? {
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  function formatDuration(seconds) {
    if (typeof seconds !== "number" || isNaN(seconds)) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

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
      <div
        className="musicCardContainer"
        style={style}
        role="group"
        aria-label={`Carte de la démo ${title}, durée ${formatDuration(
          duration
        )}`}
      >
        <div className="iconsMusicCard">
          <button
            className="iconButton"
            onClick={handleDeleteClick}
            aria-label={`Supprimer la démo ${title}`}
            type="button"
          >
            <TbTrash />
          </button>
          <button
            className="iconButton"
            onClick={toggleMenu}
            aria-label={`Afficher les options pour ${title}`}
            aria-expanded={isMenuVisible}
            aria-haspopup="true"
            type="button"
          >
            <TbDotsVertical />
          </button>
        </div>

        {isMenuVisible && (
          <div className="menuOptions" role="menu">
            <Link
              to="#"
              className="menuOptionShare"
              role="menuitem"
              tabIndex={0}
              aria-label={`Partager la démo ${title}`}
            >
              <IoMdShare />
              Partager
            </Link>
            <hr className="separator" />
            <Link
              to={`/edit-demo/${id}`}
              className="menuOptionEdit"
              role="menuitem"
              tabIndex={0}
              aria-label={`Modifier la démo ${title}`}
            >
              <MdOutlineEdit />
              Modifier
            </Link>
          </div>
        )}

        <button
          type="button"
          className="iconPlay"
          onClick={handlePlayClick}
          aria-label={`Lire la musique ${title}`}
        >
          <img src={iconeplay} alt="Play icon" />
        </button>

        <div className="infoMusic">
          <p className="songName">{title}</p>
          <span className="durationMusic">{formatDuration(duration)}</span>
        </div>
      </div>

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
