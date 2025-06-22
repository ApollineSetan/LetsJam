import { useState } from "react";
import "../styles/AddDemo.css";
import { MdOutlineLink } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaImages } from "react-icons/fa";

import { isValidAudioFile, isValidImageFile } from "../utils/filesValidation";
import { PageLayout } from "../components/PageLayout";
import { useDemoContext } from "../contexts/DemoContext";
import { AlertOverlay } from "../components/overlays/AlertOverlay";

// Utility function to get the duration of an audio file in seconds asynchronously
function getAudioDuration(file) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(URL.createObjectURL(file));
    audio.oncanplaythrough = () => resolve(Math.floor(audio.duration));
    audio.onerror = () => reject("Impossible de récupérer la durée de l'audio");
  });
}

function AddDemo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [sectionId, setSectionId] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // Button text states to display selected file names or default text
  const [audioButtonText, setAudioButtonText] = useState(
    "Ajouter un fichier audio"
  );
  const [imageButtonText, setImageButtonText] = useState("Ajouter une image");

  // Access createDemo function and sections list from context
  const { createDemo, sections } = useDemoContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!title || !file) {
    //   setAlertMessage("Le titre et le fichier audio sont obligatoires !");
    //   return;
    // }

    if (!isValidAudioFile(file)) {
      setAlertMessage("Le fichier audio est invalide ou dépasse 10 Mo.");
      return;
    }

    try {
      const duration = await getAudioDuration(file);
      if (duration > 3600) {
        setAlertMessage(
          "La durée du fichier audio ne doit pas dépasser 1 heure."
        );
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

      // Reset state
      setTitle("");
      setDescription("");
      setFile(null);
      setImage(null);
      setAudioButtonText("Ajouter un fichier audio");
      setImageButtonText("Ajouter une image");

      navigate("/");
    } catch (error) {
      if (error.validationErrors?.length > 0) {
        setAlertMessage(
          error.validationErrors[0].msg || "Erreur de validation."
        );
      } else {
        setAlertMessage(
          error?.message?.toString() || "Une erreur inattendue est survenue."
        );
      }
    }
  };

  const handleAudioClick = () => document.getElementById("audioFile").click();

  const handleAudioChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!isValidAudioFile(selectedFile)) {
        setAlertMessage("Fichier audio invalide ou trop volumineux.");
        return;
      }
      setFile(selectedFile);
      setAudioButtonText(selectedFile.name);
    }
  };

  const handleImageClick = () => document.getElementById("imageFile").click();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      if (!isValidImageFile(selectedImage)) {
        setAlertMessage("L'image ne doit pas dépasser 5 Mo.");
        return;
      }
      setImage(selectedImage);
      setImageButtonText(selectedImage.name);
    }
  };

  return (
    <PageLayout>
      <div className="mainContainer">
        <div className="title">
          <p>Ajouter une nouvelle démo audio</p>
        </div>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="firstContainer">
            <div className="addTitle">
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
                aria-label={audioButtonText}
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
                aria-label={imageButtonText}
              >
                <span className="file-name">{imageButtonText}</span>
                <FaImages />
              </button>
              <input
                type="file"
                id="imageFile"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="submit">
              <button type="submit">Valider</button>
            </div>
          </div>
        </form>

        {alertMessage && (
          <AlertOverlay
            message={alertMessage}
            onClose={() => setAlertMessage("")}
          />
        )}
      </div>
    </PageLayout>
  );
}

export { AddDemo };
