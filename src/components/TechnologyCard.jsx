import "../style/TechnologyCard.css";
import TechnologyNotes from "./TechnologyNotes.jsx";

function TechnologyCard({
  technology,
  onStatusChange,
  onNotesChange,
  isBulkMode = false,
  isSelected = false,
  onSelect = null,
}) {
  const handleClick = () => {
    if (isBulkMode) {
      // В режиме выбора - выбираем карточку
      onSelect();
    } else {
      // В обычном режиме - меняем статус
      onStatusChange();
    }
  };

  return (
    <div
      className={`technology-card ${technology.status} ${
        isSelected ? "selected" : ""
      }`}
      onClick={handleClick}
    >
      {isBulkMode && (
        <div className="selected-indicator">
            {isSelected ? '+' : '-'}
          </div>
      )}
      <div className="technology-title">
        <h3>{technology.title}</h3>
      </div>
      <div className="technology-description">
        <div className="technology-status" onClick={onStatusChange}>
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
