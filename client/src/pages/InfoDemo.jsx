import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDemoContext } from "../contexts/DemoContext";
import { RiImageEditFill } from "react-icons/ri";
import "../styles/InfoDemo.css";
import { AlertOverlay } from "../components/overlays/AlertOverlay";
import { PageLayout } from "../components/PageLayout";

function InfoDemo() {
  const { demoId } = useParams();
  const { demos, updateDemo } = useDemoContext();
  const demo = demos.find((demo) => demo.id === parseInt(demoId));
  const navigate = useNavigate();

  const [title, setTitle] = useState(demo?.title || "");
  const [description, setDescription] = useState(demo?.description || "");
  const [image, setImage] = useState(demo?.image || "");
  const [imagePreview, setImagePreview] = useState(
    typeof demo?.image === "string" ? demo.image : ""
  );
  const [alertMessage, setAlertMessage] = useState("");

  const imageUrlRef = useRef(null);

  useEffect(() => {
    if (demo) {
      setTitle(demo.title);
      setDescription(demo.description);
      setImage(demo.image);

      if (demo.image instanceof File) {
        if (imageUrlRef.current) {
          URL.revokeObjectURL(imageUrlRef.current);
        }
        imageUrlRef.current = URL.createObjectURL(demo.image);
        setImagePreview(imageUrlRef.current);
      } else {
        setImagePreview(demo.image);
      }
    }
    return () => {
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current);
        imageUrlRef.current = null;
      }
    };
  }, [demo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
    }
    imageUrlRef.current = URL.createObjectURL(file);
    setImagePreview(imageUrlRef.current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setAlertMessage("Le titre est obligatoire");
      return;
    }
    const updatedDemo = {
      title,
      description,
      image,
      duration: demo?.duration || 0,
      sectionId: demo?.sectionId || null,
      audio: demo?.audio || null,
    };
    updateDemo(demoId, updatedDemo);
    navigate("/");
  };

  return (
    <PageLayout>
      <div className="mainContainer">
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
              <label className="visually-hidden" htmlFor="demo-title">
                Titre de la démo
              </label>
              <input
                id="demo-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="inputField"
              />
            </div>

            <div className="inputGroup">
              <label className="visually-hidden" htmlFor="demo-description">
                Description de la démo
              </label>
              <textarea
                id="demo-description"
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

export { InfoDemo };
