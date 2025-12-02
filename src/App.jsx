import "./App.css";
import { useState, useEffect } from "react";
import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";
import QuickActions from "./components/QuickActions.jsx";
import FilterChange from "./components/FilterChange.jsx";
import TechnologyNotes from "./components/TechnologyNotes.jsx";
import SaveLoadActions from "./components/SaveLoadActions.jsx";

function App() {
  const [technologies, setTechnologies] = useState(() => {
    try {
      const saved = localStorage.getItem("techTrackerData");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Ошибка при загрузке начальных данных:", error);
    }

    return [
      {
        id: 1,
        title: "React Components",
        description: "Изучение базовых компонентов",
        status: "completed",
        notes: "",
      },
      {
        id: 2,
        title: "JSX Syntax",
        description: "Освоение синтаксиса JSX",
        status: "in-progress",
        notes: "",
      },
      {
        id: 3,
        title: "State Management",
        description: "Работа с состоянием компонентов",
        status: "not-started",
        notes: "",
      },
      {
        id: 4,
        title: "State",
        description: "Работа компонентов",
        status: "not-started",
        notes: "",
      },
    ];
  });

  // const [technologies, setTechnologies] = useState([
  //   {
  //     id: 1,
  //     title: "React Components",
  //     description: "Изучение базовых компонентов",
  //     status: "completed",
  //     notes: "",
  //   },
  //   {
  //     id: 2,
  //     title: "JSX Syntax",
  //     description: "Освоение синтаксиса JSX",
  //     status: "in-progress",
  //     notes: "",
  //   },
  //   {
  //     id: 3,
  //     title: "State Management",
  //     description: "Работа с состоянием компонентов",
  //     status: "not-started",
  //     notes: "",
  //   },
  //   {
  //     id: 4,
  //     title: "State",
  //     description: "Работа компонентов",
  //     status: "not-started",
  //     notes: "",
  //   },
  // ]);

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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTechnologies = technologies.filter((tech) => {
    // Сначала проверяем статус
    if (selectedFilter !== "all" && tech.status !== selectedFilter) {
      return false;
    }

    // Затем проверяем поиск (если статус прошел)
    if (!searchQuery) {
      return true; // Поиска нет - всё проходит
    }

    // Есть поиск - проверяем текст
    const query = searchQuery.toLowerCase();
    return (
      tech.title.toLowerCase().includes(query) ||
      tech.description.toLowerCase().includes(query)
    );
  });


  useEffect(() => {
    localStorage.setItem("techTrackerData", JSON.stringify(technologies));
    console.log("Данные сохранены в localStorage");
  }, [technologies]);

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies((prevTech) =>
      prevTech.map((tech) =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  // Фильтрация технологий

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
        <div className="actions-button">
          <div className="quick-actions">
            <QuickActions
              allcompleted={handleAllCompleted}
              reset={handleReset}
              selectRandom={handleSelectRandom}
            />
          </div>
          <FilterChange onFilterChange={setSelectedFilter} />
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span>Найдено: {filteredTechnologies.length}</span>
        </div>
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
                <TechnologyNotes
                  notes={technology.notes}
                  onNotesChange={updateTechnologyNotes}
                  techId={technology.id}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
