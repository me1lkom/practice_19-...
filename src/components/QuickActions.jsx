import { useState } from "react";
import Modal from "../reusable/Modal.jsx";
import "../style/QuickActions.css"
function QuickActions({ allcompleted, reset, selectRandom, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false);
  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies,
    };
    const dataStr = JSON.stringify(data, null, 2);
    // Здесь можно добавить логику для скачивания файла
    console.log("Данные для экспорта:", dataStr);
    setShowExportModal(true);
  };

  return (
    <div className="quickActions">
      <button className="action-allcompleted btn" onClick={allcompleted}>
        <span>Отметить все как выполненные</span>
      </button>
      <button className="action-reset btn" onClick={reset}>
        <span>Сбросить все статусы</span>
      </button>
      <button className="action-selectRandom btn" onClick={selectRandom}>
        <span>Случайный выбор следующей технологии</span>
      </button>
      <button className="action-selectRandom btn" onClick={handleExport}>
        <span>📤 Экспорт данных</span>
      </button>
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <p>Данные успешно подготовлены для экспорта!</p>
        <p>Проверьте консоль разработчика для просмотра данных.</p>
        <button onClick={() => setShowExportModal(false)}>Закрыть</button>
      </Modal>
    </div>
  );
}

export default QuickActions;
