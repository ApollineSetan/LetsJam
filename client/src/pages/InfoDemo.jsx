import React, { useState, useEffect } from "react";
import { TopBar } from "../components/TopBar";
import { useNavigate, useParams } from "react-router-dom";
import { useDemoContext } from "../contexts/DemoContext";
import { RiImageEditFill } from "react-icons/ri";
import "../styles/InfoDemo.css";

// This component allows users to see and edit an existing demo's title, description, and image.
function InfoDemo() {
  const { demoId } = useParams();
  const { demos, updateDemo } = useDemoContext();
  const demo = demos.find((demo) => demo.id === parseInt(demoId));
  const navigate = useNavigate();

  // State variables to manage the demo's title, description, image, and image preview
  const [title, setTitle] = useState(demo?.title || "");
  const [description, setDescription] = useState(demo?.description || "");
  const [image, setImage] = useState(demo?.image || "");
  const [imagePreview, setImagePreview] = useState(
    typeof demo?.image === "string" ? demo.image : ""
  );

  useEffect(() => {
    if (demo) {
      setTitle(demo.title);
      setDescription(demo.description);
      setImage(demo.image);
      setImagePreview(
        demo.image instanceof File
          ? URL.createObjectURL(demo.image)
          : demo.image
      );
    }
  }, [demo]); // Update state when demo changes

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Function to handle form submission and update the demo, then navigate to the home page
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedDemo = {
      title,
      description,
      image,
      duration: demo?.duration || 0, // Assuming duration is not editable here
      sectionId: demo?.sectionId || null, // Assuming sectionId is not editable here
      audio: demo?.audio || null, // Assuming audio is not editable here
    };
    updateDemo(demoId, updatedDemo);
    navigate("/");
  };

  // Function to handle the click event for playing the music
  return (
    <div className="mainContainer">
      <TopBar />
      <div className="sectionTitle">
        <h2>Modifier la démo</h2>
      </div>

      {demo ? (
        <form onSubmit={handleSubmit} className="editForm">
          <div className="imageCard">
            {imagePreview ? (
              <img src={imagePreview} alt="Demo" className="demoImage" />
            ) : (
              <div className="noImagePlaceholder">Pas d'image disponible</div>
            )}
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
