import React, { useState, useEffect } from "react";
import { TopBar } from "../components/TopBar";
import { useNavigate, useParams } from "react-router-dom";
import { useDemoContext } from "../contexts/DemoContext";
import { RiImageEditFill } from "react-icons/ri";
import "../styles/InfoDemo.css"; // Assurez-vous d'ajouter les nouveaux styles ici

function InfoDemo() {
  const { demoId } = useParams();
  const { demos, updateDemo } = useDemoContext();
  const demo = demos.find((demo) => demo.id === demoId);
  const navigate = useNavigate();

  const [title, setTitle] = useState(demo?.title || "");
  const [description, setDescription] = useState(demo?.description || "");
  const [image, setImage] = useState(demo?.image || "");
  const [imagePreview, setImagePreview] = useState(
    demo?.image ? URL.createObjectURL(demo?.image) : ""
  );

  useEffect(() => {
    if (demo) {
      setTitle(demo.title);
      setDescription(demo.description);
      setImage(demo.image);
      setImagePreview(demo.image ? URL.createObjectURL(demo.image) : "");
    }
  }, [demo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Ici on récupère le fichier
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // On met à jour l'aperçu de l'image
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedDemo = {
      title,
      description,
      image,
    };
    updateDemo(demoId, updatedDemo);
    navigate("/");
  };

  return (
    <div className="mainContainer">
      <TopBar />
      <div className="sectionTitle">
        <h2>Modifier la démo</h2>
      </div>
      {demo ? (
        <form onSubmit={handleSubmit} className="editForm">
          {/* Image Card */}
          <div className="imageCard">
            <img src={imagePreview} alt="Demo" className="demoImage" />
            <label className="editIconLabel">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="imageInput"
              />
              <span className="editIcon">
                <RiImageEditFill />
              </span>
            </label>
          </div>

          {/* Title and Description fields */}
          <div className="inputGroup">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="inputField"
            />
          </div>

          <div className="inputGroup">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textareaField"
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="submitButton">
            Enregistrer
          </button>
        </form>
      ) : (
        <p>Démo non trouvée</p>
      )}
    </div>
  );
}

export { InfoDemo };