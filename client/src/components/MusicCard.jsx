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


  const backgroundImage = image ? `url(${URL.createObjectURL(image)})` : null;
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