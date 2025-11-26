import "./TechnologyCard.css";

function TechnologyCard({ title, description, status, onClick }) {
  const cardClass =
      status === "completed"
      ? "completed"
      : status === "in-progress"
      ? "in-progress"
      : "not-started";
  return (
    <div className={`technology-card ${cardClass}`} onClick={onClick}>
      <div className="technology-title">
        <h3>{title}</h3>
      </div>
      <div className="technology-description">
        <div className="technology-status">
          <span>Статус: {status}</span>
        </div>
        <span>{description}</span>
      </div>
    </div>
  );
}
export default TechnologyCard;
