import "../style/TechnologyCard.css";
import TechnologyNotes from "./TechnologyNotes.jsx";

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
 
  return (
    <div className={`technology-card ${technology.status}`}>
      <div className="technology-title">
        <h3>{technology.title}</h3>
      </div>
      <div className="technology-description">
        <div className="technology-status"  onClick={onStatusChange}>
          <span>Статус: {technology.status}</span>
        </div>
        <span>{technology.description}</span>
      </div>
      <div className="technology-notes">
        <TechnologyNotes 
          notes={technology.notes} 
          onNotesChange={onNotesChange} 
          techId={technology.id} 
        />
      </div>
    </div>
    
  );
}
export default TechnologyCard;
