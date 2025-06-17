import "../../styles/SectionDefault.css";
import { MusicCard } from "./MusicCard";

// This component renders a section for demos that do not belong to any specific section
function SectionDefault({ demos, deleteDemo }) {
  const demosWithoutSection = demos.filter((demo) => !demo.sectionId);

  if (demosWithoutSection.length === 0) {
    // If there are no demos without a section, return null
    return null;
  }

  return (
    <div className="sectionDefaultContainer">
      <div className="sectionDefaultHeader">
        <h1>Section par défaut</h1>
      </div>
      <div className="musicCardDefaultGrid">
        {demosWithoutSection.map((demo) => (
          <MusicCard key={demo.id} demo={demo} deleteDemo={deleteDemo} />
        ))}
      </div>
    </div>
  );
}

export { SectionDefault };
