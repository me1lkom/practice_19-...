// function DeadlineManagement() {

//     return(
//         <div className="page">
//         <h2>Управление дедлайнами изучения</h2>
//         <div className="deadline-content">

//         </div>
//         </div>
//     )
// }

// export default DeadlineManagement;

import { useState, useEffect } from "react";
import DeadlineForm from "../components/DeadlineForm.jsx";
import DeadlineList from "../components/DeadlineList.jsx";
import useTechnologies from "../components/useTechnologies.jsx";
import "../style/DeadlineManagement.css";

function DeadlineManagement() {
  const { technologies } = useTechnologies();
  const [deadlines, setDeadlines] = useState(() => {
    // Инициализация из localStorage при создании состояния
    const saved = localStorage.getItem("deadlines");
    return saved ? JSON.parse(saved) : [];
  });

  // Сохраняем в localStorage ПРИ КАЖДОМ изменении deadlines
  useEffect(() => {
    localStorage.setItem("deadlines", JSON.stringify(deadlines));
  }, [deadlines]);

  const handleSaveDeadline = (newDeadline) => {
    setDeadlines((prev) => [...prev, newDeadline]);
  };

  const handleDeleteDeadline = (deadlineId) => {
    if (window.confirm("Удалить этот дедлайн?")) {
      setDeadlines((prev) => prev.filter((d) => d.id !== deadlineId));
    }
  };

  return (
    <div className="page">
      <div className="deadlines-page">
        <header className="page-header">
          <h1>📅 Управление дедлайнами</h1>
          <p>Устанавливайте сроки изучения для выбранных технологий</p>
        </header>

        <main className="deadlines-content">
          <div className="deadline-section">
            {/* Передаём existingDeadlines в форму для фильтрации */}
            <DeadlineForm
              onSave={handleSaveDeadline}
              existingDeadlines={deadlines}
            />
          </div>

          <div className="deadline-section">
            <DeadlineList
              deadlines={deadlines}
              technologies={technologies}
              onDelete={handleDeleteDeadline}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DeadlineManagement;
