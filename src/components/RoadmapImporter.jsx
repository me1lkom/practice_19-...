import { useState } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import "../style/RoadmapImporter.css";
function RoadmapImporter({ onImport, onReset, existingTechnologies }) {
  const [importing, setImporting] = useState(false);
  
  const { 
    technologies: catalog, 
    loading, 
    error, 
  } = useTechnologiesApi('https://693c74a8b762a4f15c40898b.mockapi.io/tech-tracker/technologies');

  const isDuplicate = (techTitle) => {
    return existingTechnologies.some(
      tech => tech.title.toLowerCase() === techTitle.toLowerCase()
    );
  };

  const handleImport = async () => {
  if (!catalog || catalog.length === 0) {
    alert('Каталог пуст или ещё не загружен');
    return;
  }

  setImporting(true);
  try {
    
    const importPromises = [];
    
    for (const tech of catalog) {      
      if (isDuplicate(tech.title)) {
        continue; 
      }
      
      const techToAdd = {
        title: tech.title,
        description: tech.description || `Изучение ${tech.title}`,
        notes: tech.notes || ''
      };
      
      importPromises.push(onImport(techToAdd));
    }
    
    if (importPromises.length > 0) {
      await Promise.all(importPromises);
    } else {
      alert('Все доступные технологии из каталога уже добавлены!');
    }
    
  } catch (err) {
    alert(`Ошибка импорта: ${err.message}`);
  } finally {
    setImporting(false);
  }
};

  return (
 
      <div className="import-controls">
        <div className="import-buttons">
          <button 
            onClick={handleImport}
            disabled={importing || loading}
            className="import-button"
          >
            {importing ? 'Импортирую...' : 'Импортировать технологию'}
          </button>
          
          <button 
            onClick={onReset}
            className="reset-button"
          >
            Сбросить к начальным данным
          </button>
        </div>

      {error && (
        <div className="error-message">
          Ошибка загрузки каталога: {error}
        </div>
      )}
    </div>
  );
}

export default RoadmapImporter;