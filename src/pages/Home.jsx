import "../style/App.css";
import { useState } from "react";
import TechnologyCard from "../components/TechnologyCard.jsx";
import ProgressHeader from "../components/ProgressHeader.jsx";
import QuickActions from "../components/QuickActions.jsx";
import FilterChange from "../components/FilterChange.jsx";
import useTechnologies from "../components/useTechnologies.jsx";
import ProgressBar from "../reusable/ProgressBar.jsx";

import RoadmapImporter from "../components/RoadmapImporter.jsx";
import SearchBar from "../components/SearchBar.jsx";
function Home() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    addTechnology,
    resetToInitial,
    progress,
    handleAllCompleted,
    handleReset,
    handleSelectRandom,
    totalCount,
    completedCount,
    inProgressCount,
    notStartedCount,
  } = useTechnologies();

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredTechnologies = technologies.filter((tech) => {
    if (selectedFilter !== "all" && tech.status !== selectedFilter) {
      return false;
    }

    if (!searchQuery) {
      return true;
    }

    const query = searchQuery.toLowerCase();
    return (
      tech.title.toLowerCase().includes(query) ||
      tech.description.toLowerCase().includes(query)
    );
  });

  const handleImportTechnology = (techData) => {
    addTechnology(techData);
    console.log("Импортируем:", techData);
  };
  const resetToStock = () => {
    resetToInitial();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Трекер изучения технологий</h1>
        <ProgressBar
          progress={progress}
          label="Общий прогресс"
          color="#4CAF50"
          animated={true}
          height={20}
        />
        <ProgressHeader
          totalCount={totalCount}
          completedCount={completedCount}
          inProgressCount={inProgressCount}
          notStartedCount={notStartedCount}
        />
      </header>
      <main className="app-main">
        <div className="actions-button">
          <RoadmapImporter
              onImport={handleImportTechnology}
              onReset={resetToStock}
              existingTechnologies={technologies}
            />
          <div className="quick-actions">
            <QuickActions
              allcompleted={handleAllCompleted}
              reset={handleReset}
              selectRandom={handleSelectRandom}
              technology={technologies}
            />
          </div>
          <FilterChange onFilterChange={setSelectedFilter} />
        </div>
        <div className="search-box">
          <SearchBar onSearchChange={handleSearchChange}/>
          <span>Найдено: {filteredTechnologies.length}</span>
        </div>
        <div className="technologies-grid">
          {filteredTechnologies.map((tech) => (
            <div key={tech.id}>
              <TechnologyCard
                key={tech.id}
                technology={tech}
                onStatusChange={() => updateStatus(tech.id)}
                onNotesChange={updateNotes}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default Home;
