import "../style/Progress.css"

function ProgressHeader({ totalCount, completedCount, inProgressCount, notStartedCount }) {
  return (
    <div className="progress">
      <div className="progress-info">
        <p> Общее количество технологий: {totalCount}</p>
        <p> Количество изученных технологий: {completedCount}</p>
        <p> Количество изучаемых технологий: {inProgressCount}</p>
        <p> Количество не изученных технологий: {notStartedCount}</p>
      </div>
    </div>
  );
}
export default ProgressHeader;
