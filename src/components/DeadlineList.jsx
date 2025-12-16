import "../style/DeadlineForm.css"
function DeadlineList({ deadlines, technologies, onDelete }) {
  const getTechWithDeadline = (techId) => {
    const tech = technologies.find(t => t.id === techId);
    const deadline = deadlines.find(d => d.technologyId === techId);
    
    if (!tech || !deadline) return null;
    
    return {
      ...tech,
      deadline: deadline.deadlineDate,
      deadlineId: deadline.id,
      deadlineStatus: getDeadlineStatus(deadline.deadlineDate)
    };
  };

  const techsWithDeadlines = deadlines
    .map(d => getTechWithDeadline(d.technologyId))
    .filter(Boolean); 

  if (techsWithDeadlines.length === 0) {
    return (
      <div className="deadline-list">
        <h3>Технологии с дедлайнами</h3>
        <p>Дедлайнов пока не установлено</p>
      </div>
    );
  }

  return (
    <div className="deadline-list">
      <h3>Технологии с дедлайнами ({techsWithDeadlines.length})</h3>
      
      <div className="tech-cards-grid">
        {techsWithDeadlines.map(tech => (
          <div key={tech.deadlineId} className="tech-card-with-deadline">
            <div className="tech-card-header">
              <h4>{tech.title}</h4>
              <span className={`status-badge ${tech.status}`}>
                {tech.status === 'completed' ? 'Завершено' :
                 tech.status === 'in-progress' ? 'В процессе' : 'Не начато'}
              </span>
            </div>
            
            <p className="tech-description">{tech.description}</p>
            
            <div className="deadline-info">
              <div className="deadline-label">
                <strong>Дедлайн:</strong>
                <span className={`deadline-date ${tech.deadlineStatus}`}>
                  {new Date(tech.deadline).toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="deadline-status">
                <span className={`status-indicator ${tech.deadlineStatus}`}>
                  {tech.deadlineStatus === 'expired' ? '⏰ Просрочен' :
                   tech.deadlineStatus === 'warning' ? '⚠️ Скоро истекает' : '✅ Активен'}
                </span>
                
                <button
                  onClick={() => onDelete(tech.deadlineId)}
                  className="delete-deadline-btn"
                  aria-label="Удалить дедлайн"
                  title="Удалить дедлайн"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const getDeadlineStatus = (deadlineDate) => {
  const today = new Date();
  const deadline = new Date(deadlineDate);
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);
  
  if (deadline < today) return 'expired';
  
  const daysDiff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  if (daysDiff <= 3) return 'warning';
  
  return 'active';
};

export default DeadlineList;