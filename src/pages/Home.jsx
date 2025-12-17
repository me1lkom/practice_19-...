import "../style/App.css";
import { useState } from "react";
import TechnologyCard from "../components/TechnologyCard.jsx";
import ProgressHeader from "../components/Progress.jsx";
import QuickActions from "../components/QuickActions.jsx";
import FilterChange from "../components/FilterChange.jsx";
import useTechnologies from "../components/useTechnologies.jsx";
// import ProgressBar from "../reusable/ProgressBar.jsx";

import RoadmapImporter from "../components/RoadmapImporter.jsx";
import SearchBar from "../components/SearchBar.jsx";

import DataExporter from "../components/DataExporter.jsx";
import DataImporter from "../components/DataImporter.jsx";

import { Grid } from "@mui/material";
function Home() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    addTechnology,
    resetToInitial,
    // progress,
    handleAllCompleted,
    handleReset,
    handleSelectRandom,
    totalCount,
    completedCount,
    inProgressCount,
    notStartedCount,

    isBulkMode,
    selectedTechIds,
    setIsBulkMode,
    toggleTechSelection,
    updateStatusBulk,
    clearSelection,
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
        {/* <h1>Трекер изучения технологий</h1> */}
        {/* <ProgressBar
          progress={progress}
          label="Общий прогресс"
          color="#4CAF50"
          animated={true}
          height={20}
        /> */}
        <ProgressHeader
          technologies={technologies}
          totalCount={totalCount}
          completedCount={completedCount}
          inProgressCount={inProgressCount}
          notStartedCount={notStartedCount}
        />
      </header>
      <main className="app-main">
        <div className="actions-button">
          <DataExporter technologies={technologies} />
          <DataImporter onImport={addTechnology} />
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

          <button onClick={() => setIsBulkMode(!isBulkMode)}>
            {isBulkMode
              ? "Завершить редактирвоание"
              : "Массовое редактивароние"}
          </button>

          {isBulkMode && (
            <div className="bulk-controls">
              <span> Выбрано: {selectedTechIds.length}</span>
              <select onChange={(e) => updateStatusBulk(e.target.value)}>
                <option value="">Выберите статус...</option>
                <option value="completed">Завершено</option>
                <option value="in-progress">В процессе</option>
                <option value="not-started">Не начато</option>
              </select>
              <button onClick={clearSelection}>Сбросить выбор</button>
            </div>
          )}
        </div>
        <div className="search-box">
          <SearchBar onSearchChange={handleSearchChange} />
          <span>Найдено: {filteredTechnologies.length}</span>
        </div>

        <Grid
          container
          spacing={3}
          justifyContent="space-around"
          alignItems="stretch"
        >
          {filteredTechnologies.map((tech) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={tech.id}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TechnologyCard
                key={tech.id}
                technology={tech}
                onStatusChange={() => updateStatus(tech.id)}
                onNotesChange={updateNotes}
                isBulkMode={isBulkMode}
                isSelected={selectedTechIds.includes(tech.id)}
                onSelect={() => toggleTechSelection(tech.id)}
              />
            </Grid>
          ))}
        </Grid>

        {/* <div className="technologies-grid"></div> */}
      </main>
    </div>
  );
}
export default Home;
