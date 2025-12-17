import { useState, useEffect } from "react";
import DeadlineForm from "../components/DeadlineForm.jsx";
import DeadlineList from "../components/DeadlineList.jsx";
import useTechnologies from "../components/useTechnologies.jsx";
import "../style/DeadlineManagement.css";

function DeadlineManagement() {
  const { technologies } = useTechnologies();
  const [deadlines, setDeadlines] = useState(() => {
    const saved = localStorage.getItem("deadlines");
    return saved ? JSON.parse(saved) : [];
  });

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
    <div className="app">
      <div className="deadlines-page">
        <header className="page-header">
          <h1>Управление дедлайнами</h1>
        </header>

        <main className="deadlines-content">
          <div className="deadline-section">
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
