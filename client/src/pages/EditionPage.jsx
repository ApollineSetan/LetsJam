import { useState } from "react";
import "../styles/EditionPage.css";
import { TopBar } from "../components/TopBar";
import { SectionDefault } from "../components/demos/SectionDefault";
import { Section } from "../components/demos/Section";
import { Link } from "react-router-dom";
import { MdOutlineLink } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { useDemoContext } from "../contexts/DemoContext";
import { NewSectionOverlay } from "../components/overlays/NewSectionOverlay";

function EditionPage() {
  const { demos, deleteDemo, addSection, sections } = useDemoContext();
  const [isNewSectionOverlayVisible, setNewSectionOverlayVisible] =
    useState(false);

  const handleShowNewSectionOverlay = (e) => {
    e.preventDefault();
    setNewSectionOverlayVisible(true);
  };

  const handleCancelNewSection = () => {
    setNewSectionOverlayVisible(false);
  };

  const handleConfirmNewSection = (sectionName) => {
    addSection(sectionName);
    setNewSectionOverlayVisible(false);
  };

  const isAnyDemoPresent =
    demos.length > 0 || sections.some((section) => section.demos?.length > 0);

  return (
    <div className="mainContainer">
      <TopBar />
      <div className="buttonsContainer">
        <div className="addDemoButton">
          <Link to="/add-demo">
            Ajouter une nouvelle démo
            <i>
              <MdOutlineLink />
            </i>
          </Link>
        </div>
        <div className="addSectionDemo">
          <a href="#" onClick={handleShowNewSectionOverlay}>
            Ajouter une nouvelle section
            <i>
              <IoIosAddCircle />
            </i>
          </a>
        </div>
      </div>

      {isNewSectionOverlayVisible && (
        <NewSectionOverlay
          onCancel={handleCancelNewSection}
          onConfirm={handleConfirmNewSection}
        />
      )}

      <div className="sectionsDefault">
        {!isAnyDemoPresent && !isNewSectionOverlayVisible && (
          <div className="emptyState">
            <h1>Aucune démo n'a été ajoutée pour le moment.</h1>
          </div>
        )}

        <SectionDefault demos={demos} deleteDemo={deleteDemo} />

        {sections.map((section) => (
          <Section key={section.id} demos={demos} sectionId={section.id} />
        ))}
      </div>
    </div>
  );
}

export { EditionPage };
