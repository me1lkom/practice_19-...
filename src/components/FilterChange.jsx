import "../style/FilterChange.css"
function FilterChange({ onFilterChange }) {
  return (
    <div className="FilterChange">
      <button className="action-all btn" onClick = {() => onFilterChange("all")}>
        <span>Все технологии</span>
      </button>
      <button className="action-completed btn" onClick = {() => onFilterChange("completed")}>
        <span>Только выполненные</span>
      </button>
      <button className="action-inProgress btn" onClick = {() => onFilterChange("in-progress")}>
        <span>Только начатые</span>
      </button>
      <button className="action-notStarted btn" onClick = {() => onFilterChange("not-started")}>
        <span>Только не выполненные</span>
      </button>
      
    </div>
  );
}

export default FilterChange;
