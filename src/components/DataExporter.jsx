import { useState } from "react";

function DataExporter({ technologies }) {
  const [exportFormat, setExportFormat] = useState("json");
  const [includeUserData, setIncludeUserData] = useState(true);

  const exportData = () => {
    const exportData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      technologies: includeUserData
        ? technologies.map((tech) => ({
            ...tech,
          }))
        : technologies.map(({ notes, status, deadline, ...tech }) => tech), // Исключаем пользовательские данные
    };

    let dataStr, fileType, fileName;

    if (exportFormat === "json") {
      dataStr = JSON.stringify(exportData, null, 2);
      fileType = "application/json";
      fileName = `technologies_export_${new Date().toISOString()}.json`;
    }

    const blob = new Blob([dataStr], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const canExport = true;

  return (
    <div className="data-exporter">
      <h3>Экспорт данных</h3>

      <div className="export-options">
        <div className="form-group">
          <label htmlFor="export-format">Формат экспорта</label>
          <select
            id="export-format"
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
          >
            <option value="json">JSON</option>
            <option value="csv" disabled>
              CSV (скоро)
            </option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={includeUserData}
              onChange={(e) => setIncludeUserData(e.target.checked)}
            />
            Включить мои заметки и прогресс
          </label>
          <span className="help-text">
            При включении будут экспортированы ваши личные заметки и статусы
            изучения
          </span>
        </div>
      </div>

      {!canExport && (
        <div className="export-warning" role="alert">
          Нет данных для экспорта. Добавьте технологии в трекер.
        </div>
      )}

      <button
        onClick={exportData}
        disabled={!canExport}
        className="btn-primary"
        aria-describedby={canExport ? "export-help" : "export-warning"}
      >
        Экспортировать данные
      </button>

      <div id="export-help" className="help-text">
        Данные будут сохранены в выбранном формате на вашем устройстве
      </div>
    </div>
  );
}
export default DataExporter;
