import React from "react";
import "../styles/SectionDefault.css";
import { MusicCard } from "./MusicCard";

function SectionDefault({ demos, deleteDemo }) {
  const demosWithoutSection = demos.filter((demo) => !demo.sectionId);

  if (demosWithoutSection.length === 0) {
    return null;
  }

  return (
    <div className="sectionDefault">
      <h1>Section par défaut</h1>
      <div className="musicCardGrid">
        {demosWithoutSection.map((demo) => (
          <MusicCard
            key={demo.id} // Utilise l'id ici pour la clé
            demo={demo}
            deleteDemo={deleteDemo} // Passer deleteDemo
          />
        ))}
      </div>
    </div>
  );
}

export { SectionDefault };