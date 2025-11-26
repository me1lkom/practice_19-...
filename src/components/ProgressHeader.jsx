import "./ProgressHeader.css";

function ProgressHeader({ totalCount, completedCount, inProgressCount, notStartedCount }) {
  return (
    <div className="progress">
      <div className="progress-info">
        <p> Общее количество технологий: {totalCount}</p>
        <p> Количество изученных технологий: {completedCount}</p>
        <p> Количество изучаемых технологий: {inProgressCount}</p>
        <p> Количество не изученных технологий: {notStartedCount}</p>
      </div>
      <div className="progress-bar">
        <progress
          className="progress-bar__completed"
          max="100"
          value={(completedCount / totalCount) * 100}
        ></progress>
      </div>
    </div>
  );
}
export default ProgressHeader;
