import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import "../style/TechnologyList.css";
import useTechnologies from "../components/useTechnologies.jsx";
import TechnologyCard from "../components/TechnologyCard.jsx";


import {
  Card,
} from "@mui/material";

function TechnologyList() {
  const { technologies } = useTechnologies();

 const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Завершено";
      case "in-progress":
        return "В процессе";
      default:
        return "Не начато";
    }
  };


  return (
    <div className="app">
      <div className="page-header">
        <h1>Все технологии</h1>
        
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      <div className="technologies-grid">
        {technologies.map((tech) => (
          <Card key={tech.id} className="technology-item">
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <div className="technology-meta">
              <span className={`status status-${tech.status}`}>
                {getStatusText(tech.status)}
              </span>
              <Link to={`/technologies/${tech.id}`} className="btn-link">
                Подробнее →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default TechnologyList;
