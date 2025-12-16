import { useState } from "react";

function DataExporter({ technologies }) {
  const [exportFormat, setExportFormat] = useState("json");
  const [includeUserData, setIncludeUserData] = useState(true);

  const exportData = () => {
    const exportData = {
      technologies,
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
    </div>
  );
}
export default DataExporter;
