import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DemoConfirmationOverlay } from "./DemoConfirmationOverlay"; // Garde l'import de l'overlay
import "../styles/MusicCard.css";
import iconeplay from "../assets/iconeplay.png";
import { TbTrash, TbDotsVertical } from "react-icons/tb";
import { IoMdShare } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

function MusicCard({ demo, deleteDemo }) {
  const { id, title, duration, image } = demo;
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Si une image est présente, créer une URL d'image pour l'utiliser comme fond
  const backgroundImage = image ? `url(${URL.createObjectURL(image)})` : null;

  // Applique le style en ligne pour définir l'image de fond
  const style = backgroundImage
    ? {
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  const handlePlayClick = () => {
    console.log("Lecture de la musique : ", title);
  };

  const handleDeleteClick = () => {
    setOverlayVisible(true); // Affiche l'overlay
  };

  const handleCancel = () => {
    setOverlayVisible(false); // Cache l'overlay si l'annulation est choisie
  };

  const handleConfirmDelete = () => {
    deleteDemo(demo.id); // Supprime la démo
    setOverlayVisible(false); // Cache l'overlay après suppression
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

        {/* Menu déroulant */}
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

        <div className="iconPlay" onClick={handlePlayClick}>
          <img src={iconeplay} alt="iconeplay" />
        </div>
        <div className="infoMusic">
          <p className="songName">{title}</p>
          <span className="durationMusic">{duration}</span>
        </div>
      </div>

      {/* Affichage de l'overlay ici, en dehors de la card */}
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