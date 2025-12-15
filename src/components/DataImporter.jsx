import { useState } from "react";
function DataImporter({ onImport }) {
  const [importError, setImportError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateImportData = (data) => {
    if (!data.technologies || !Array.isArray(data.technologies)) {
      throw new Error(`Неверный формат файла: отсутствует массив technologies`);
    }
    data.technologies.forEach((tech, index) => {
      if (!tech.title || !tech.description) {
        throw new Error(
          `Технологий #${index + 1}: отсутствует название или описание`
        );
      }
      if (tech.title.length > 50) {
        throw new Error(
          `Технология #${
            index + 1
          }: название слишком длинное (макс. 50 символов)`
        );
      }
    });

    return true;
  };

  const handleFileUpload = (file) => {
    setImportError("");

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const importedData = JSON.parse(fileContent);

        validateImportData(importedData);
        onImport(importedData.technologies);
      } catch (error) {
        setImportError(`Ошибка импорта: ${error.message}`);
      }
    };

    reader.onerror = () => {
      setImportError(`Ошибка чтения файла`);
    };
    reader.readAsText(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/json") {
        handleFileUpload(file);
      } else {
        setImportError(`Поддерживаются только JSON файлы`);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="data-importer">
      <h3>Импорт дорожной карты</h3>

      <div
        className={`drop-zone ${isDragging ? "dragging" : ""} ${
          importError ? "error" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="drop-zone-content">
          <p>Перетащите JSON файл сюда или</p>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            id="file-input"
            className="file-input"
          />
          <label htmlFor="file-input" className="btn-secondary">
            Выберите файл
          </label>
        </div>
      </div>

      {importError && (
        <div className="import-error" role="alert">
          ❌ {importError}
        </div>
      )}
    </div>
  );
}

export default DataImporter;
