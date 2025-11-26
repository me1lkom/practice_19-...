import "./App.css";
import { useState } from "react";
import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";
import QuickActions from "./components/QuickActions.jsx";
import FilterChange from "./components/FilterChange.jsx";

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: "React Components",
      description: "Изучение базовых компонентов",
      status: "completed",
    },
    {
      id: 2,
      title: "JSX Syntax",
      description: "Освоение синтаксиса JSX",
      status: "in-progress",
    },
    {
      id: 3,
      title: "State Management",
      description: "Работа с состоянием компонентов",
      status: "not-started",
    },
    {
      id: 4,
      title: "State",
      description: "Работа компонентов",
      status: "not-started",
    },
  ]);

  const totalCount = technologies.length;
  const completedCount = technologies.filter(
    (technology) => technology.status === "completed"
  ).length;
  const inProgressCount = technologies.filter(
    (technology) => technology.status === "in-progress"
  ).length;
  const notStartedCount = technologies.filter(
    (technology) => technology.status === "not-started"
  ).length;

  function handleStatusChange(id) {
    setTechnologies((prevTechs) =>
      prevTechs.map((tech) =>
        tech.id === id ? { ...tech, status: nextStatus(tech.status) } : tech
      )
    );
  }

  function nextStatus(currentStatus) {
    switch (currentStatus) {
      case "completed":
        return "in-progress";
      case "in-progress":
        return "not-started";
      case "not-started":
        return "completed";
      default:
        return currentStatus;
    }
  }

  const handleAllCompleted = () => {
    setTechnologies((prevTechs) =>
      prevTechs.map((tech) => ({ ...tech, status: "completed" }))
    );
  };

  const handleReset = () => {
    setTechnologies((prevTechs) =>
      prevTechs.map((tech) => ({ ...tech, status: "not-started" }))
    );
  };

  const handleSelectRandom = () => {
    const availableTechs = technologies.filter(
      (tech) => tech.status !== "in-progress"
    );

    if (availableTechs.length === 0) {
      alert("Все технологии уже находяться в процессе.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableTechs.length);
    const randomTech = availableTechs[randomIndex];

    setTechnologies((prevTechs) =>
      prevTechs.map((tech) =>
        tech.id === randomTech.id ? { ...tech, status: "in-progress" } : tech
      )
    );
  };

  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTechnologies = technologies.filter((tech) => {
    if (selectedFilter === "all") return true;
    return tech.status === selectedFilter;
  });
  return (
    <div className="App">
      <div className="progress">
        <ProgressHeader
          totalCount={totalCount}
          completedCount={completedCount}
          inProgressCount={inProgressCount}
          notStartedCount={notStartedCount}
        />
      </div>
      <div className="technology-list">
        <h1>RoadMap</h1>
        <FilterChange onFilterChange={setSelectedFilter} />
        <div className="technology__grid">
          {filteredTechnologies.map((technology) => (
            <div key={technology.id}>
              <button>
                <TechnologyCard
                  title={technology.title}
                  description={technology.description}
                  status={technology.status}
                  onClick={() => handleStatusChange(technology.id)}
                />
              </button>
            </div>
          ))}
        </div>
        <QuickActions
          allcompleted={handleAllCompleted}
          reset={handleReset}
          selectRandom={handleSelectRandom}
        />
      </div>
    </div>
  );
}
export default App;
