import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { DemoConfirmationOverlay } from "../Overlays/DemoConfirmationOverlay";
import "../../styles/MusicCard.css";
import iconeplay from "../../assets/iconeplay.png";
import { TbTrash, TbDotsVertical } from "react-icons/tb";
import { IoMdShare } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

function formatDuration(seconds) {
  if (typeof seconds !== "number" || isNaN(seconds)) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function MusicCard({ demo, deleteDemo }) {
  const { id, title, duration, image_url, image, audio } = demo;
  const imageSrc = demo.image || demo.image_url || "";
  const audioSrc = demo.audio || demo.audio_url || demo.audioUrl || "";
  const audioRef = useRef(null);
  const cardRef = useRef(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const backgroundImage = imageSrc ? `url(${imageSrc})` : null;
  const style = backgroundImage
    ? {
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  const handlePlayClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleDeleteClick = () => {
    setOverlayVisible(true);
  };

  const handleCancel = () => {
    setOverlayVisible(false);
  };

  const handleConfirmDelete = () => {
    deleteDemo(id);
    setOverlayVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    }

    function handleScroll() {
      setMenuVisible(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuVisible(false);
      }
    }

    if (isMenuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuVisible]);

  return (
    <>
      <div
        className={`musicCardContainer ${isMenuVisible ? "menuActive" : ""}`}
        style={style}
        ref={cardRef}
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

      <audio
        ref={audioRef}
        src={audioSrc}
        preload="none"
        style={{ display: "none" }}
      />

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
