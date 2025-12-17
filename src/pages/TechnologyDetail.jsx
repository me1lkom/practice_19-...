import { useParams, Link, useNavigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/TechnologyDetail.css";
import useTechnologies from "../components/useTechnologies";

import {
  Card,
} from "@mui/material";

function TechnologyDetail() {
  
  const { 
    deleteTechnology,  
  } = useTechnologies();

  

  const { techId } = useParams();

  const navigate = useNavigate();
  const [technology, setTechnology] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("technologies");
    if (saved) {
      const technologies = JSON.parse(saved);
      const tech = technologies.find((t) => t.id === parseInt(techId));
      setTechnology(tech);
    }
  }, [techId]);

  const updateStatus = (newStatus) => {
    const saved = localStorage.getItem("technologies");
    if (saved) {
      const technologies = JSON.parse(saved);
      const updated = technologies.map((tech) =>
        tech.id === parseInt(techId) ? { ...tech, status: newStatus } : tech
      );
      localStorage.setItem("technologies", JSON.stringify(updated));
      setTechnology({ ...technology, status: newStatus });
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Удалить технологию "${technology.title}"?`)) {
      deleteTechnology(technology.id);
      navigate(-1);
    }
  };


  if (!technology) {
    return (
      <div className="app">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }


  return (
    <div className="app">
        {console.log(technology.id)}
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>{technology.title}</h1>
      </div>
      <Card className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>
        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            <button
              onClick={() => updateStatus("not-started")}
              className={technology.status === "not-started" ? "status-not-started active" : "status-not-started"}
            >
              Не начато
            </button>
            <button
              onClick={() => updateStatus("in-progress")}
              className={technology.status === "in-progress" ? "status-in-progress active" : "status-in-progress"}
            >
              В процессе
            </button>
            <button
              onClick={() => updateStatus("completed")}
              className={technology.status === "completed" ? "status-completed active" : "status-completed"}
            >
              Завершено
            </button>
          </div>
        </div>
        {technology.notes && (
          <div className="detail-section">
            <h3>Мои заметки</h3>
            <p>{technology.notes}</p>
          </div>
        )}
      </Card>

      <div>
        <button onClick={handleDelete}> Удалить технологию </button>
      </div>
    </div>
  );
}
export default TechnologyDetail;
