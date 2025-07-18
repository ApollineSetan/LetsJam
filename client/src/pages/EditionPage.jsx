import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/EditionPage.css";
import { MdOutlineLink } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

import { PageLayout } from "../components/PageLayout";
import { SectionDefault } from "../components/demos/SectionDefault";
import { Section } from "../components/demos/Section";
import { useDemoContext } from "../contexts/DemoContext";
import { NewSectionOverlay } from "../components/overlays/NewSectionOverlay";

function EditionPage() {
  // Consumes global state and methods from DemoContext
  const { demos, deleteDemo, addSection, sections, refreshData } =
    useDemoContext();
  const [isNewSectionOverlayVisible, setNewSectionOverlayVisible] =
    useState(false);

  const handleShowNewSectionOverlay = (e) => {
    e.preventDefault();
    setNewSectionOverlayVisible(true);
  };

  const handleCancelNewSection = () => {
    setNewSectionOverlayVisible(false);
  };

  const handleConfirmNewSection = async (sectionName) => {
    try {
      await addSection(sectionName);
      setNewSectionOverlayVisible(false);
    } catch (error) {
      throw error;
    }
  };

  const isAnyDemoPresent =
    demos.length > 0 || sections.some((section) => section.demos?.length > 0);

  useEffect(() => {
    refreshData(); // Fetch latest demos and sections from backend on component mount
  }, []);

  return (
    <PageLayout>
      <div className="mainContainer">
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
    </PageLayout>
  );
}

export { EditionPage };
