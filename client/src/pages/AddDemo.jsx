import { useState } from "react";
import "../styles/AddDemo.css";
import { TopBar } from "../components/TopBar";
import { MdOutlineLink } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaImages } from "react-icons/fa";
import { useDemoContext } from "../contexts/DemoContext";

function getAudioDuration(file) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(URL.createObjectURL(file));
    audio.oncanplaythrough = () => {
      resolve(Math.floor(audio.duration));
    };
    audio.onerror = () => {
      reject("Impossible de récupérer la durée de l'audio");
    };
  });
}

function AddDemo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [sectionId, setSectionId] = useState("");
  const { createDemo, sections } = useDemoContext();
  const navigate = useNavigate();

  const [audioButtonText, setAudioButtonText] = useState(
    "Ajouter un fichier audio"
  );
  const [imageButtonText, setImageButtonText] = useState("Ajouter une image");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !file) {
      alert("Le titre et le fichier sont obligatoires !");
      return;
    }

    const validExtensions = [
      "mp3",
      "flac",
      "wav",
      "aac",
      "ogg",
      "aiff",
      "m4a",
      "wma",
    ];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      alert(
        "Format de fichier audio invalide ! Veuillez télécharger un fichier MP3, FLAC, WAV, AAC, OGG, AIFF, M4A ou WMA."
      );
      return;
    }

    try {
      const duration = await getAudioDuration(file);

      if (duration > 3600) {
        alert("La durée du fichier audio ne doit pas dépasser 1 heure.");
        return;
      }

      const demo = {
        title,
        description,
        file,
        image,
        sectionId: sectionId || null,
        duration,
      };

      await createDemo(demo);

      setTitle("");
      setDescription("");
      setFile(null);
      setImage(null);
      setAudioButtonText("Ajouter un fichier audio");
      setImageButtonText("Ajouter une image");

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const handleAudioClick = () => {
    document.getElementById("audioFile").click();
  };

  const handleAudioChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAudioButtonText(selectedFile.name);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageFile").click();
  };

  return (
    <div className="mainContainer">
      <TopBar />
      <div className="title">
        <p>Ajouter une nouvelle démo audio</p>
      </div>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="firstContainer">
          <div className="addTitle">
            <label htmlFor="titleInput">Titre *</label>
            <input
              id="titleInput"
              type="text"
              placeholder="Ajouter un titre..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div className="addSection">
            <label htmlFor="sectionSelect" className="sr-only">
              Section
            </label>
            <select
              id="sectionSelect"
              value={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
            >
              <option value="" disabled hidden>
                Ranger dans une section
              </option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="secondContainer">
          <label htmlFor="descriptionInput" className="sr-only">
            Description
          </label>
          <textarea
            id="descriptionInput"
            placeholder="Ajouter une description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="thirdContainer">
          <div className="addFile">
            <button
              type="button"
              onClick={handleAudioClick}
              aria-label={
                file
                  ? `Changer le fichier audio, fichier actuel : ${file.name}`
                  : "Ajouter un fichier audio"
              }
            >
              <span className="file-name">{audioButtonText}</span>
              <MdOutlineLink />
            </button>
            <input
              type="file"
              id="audioFile"
              style={{ display: "none" }}
              accept="audio/*"
              onChange={handleAudioChange}
              required
              aria-required="true"
            />
          </div>
          <div className="addImage">
            <button
              type="button"
              onClick={handleImageClick}
              aria-label={
                image
                  ? `Changer l'image, image actuelle : ${image.name}`
                  : "Ajouter une image"
              }
            >
              <span className="file-name">{imageButtonText}</span>
              <FaImages />
            </button>
            <input
              type="file"
              id="imageFile"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => {
                const selectedImage = e.target.files[0];
                if (selectedImage) {
                  setImage(selectedImage);
                  setImageButtonText(selectedImage.name);
                }
              }}
            />
          </div>
          <div className="submit">
            <button type="submit">Valider</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export { AddDemo };
