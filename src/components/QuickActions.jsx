function QuickActions({ allcompleted, reset, selectRandom }) {
  return (
    <div className="quickActions">
      <button className="action-allcompleted btn" onClick={allcompleted}>
        <span>Отметить все как выполненные</span>
      </button>
      <button className="action-reset btn" onClick={reset}>
        <span>Сбросить все статусы</span>
      </button>
      <button className="action-selectRandom btn" onClick={selectRandom}>
        <span>Случайный выбор следующей технологии</span>
      </button>
    </div>
  );
}

export default QuickActions;
