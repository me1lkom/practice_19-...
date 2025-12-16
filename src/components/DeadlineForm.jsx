import { useState } from "react";
import useTechnologies from "./useTechnologies";

function DeadlineForm({ onSave, existingDeadlines }) {
  const { technologies } = useTechnologies();
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [deadlineDate, setDeadlineDate] = useState("");
  const [errors, setErrors] = useState({});

  const availableTechnologies = technologies.filter((tech) => {
    return !existingDeadlines.some((d) => d.technologyId === tech.id);
  });

  const handleTechSelect = (techId) => {
    setSelectedTechIds((prev) => {
      if (prev.includes(techId)) {
        return prev.filter((id) => id !== techId);
      } else {
        return [...prev, techId];
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (selectedTechIds.length === 0) {
      newErrors.technologies = "Выберите хотя бы одну технологию";
    }

    if (!deadlineDate) {
      newErrors.deadlineDate = "Укажите дату дедлайна";
    } else {
      const selectedDate = new Date(deadlineDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.deadlineDate = "Дедлайн не может быть в прошлом";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const newDeadlines = selectedTechIds.map((techId) => ({
      id: Date.now() + techId,
      technologyId: techId,
      deadlineDate,
      createdAt: new Date().toISOString(),
      status: "active",
    }));

    newDeadlines.forEach((deadline) => onSave(deadline));

    setSelectedTechIds([]);
    setDeadlineDate("");
    setErrors({});
  };

  return (
    <div className="deadline-form">
      <h3>Установить дедлайн</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deadlineDate">Дата дедлайна:</label>
          <input
            id="deadlineDate"
            type="date"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.deadlineDate && (
            <div className="error">{errors.deadlineDate}</div>
          )}
        </div>
        <div className="form-group">
          <label>
            Выберите технологии ({availableTechnologies.length} доступно):
          </label>
          {availableTechnologies.length === 0 ? (
            <p className="no-techs">Все технологии уже имеют дедлайны</p>
          ) : (
            <div className="tech-checkboxes">
              {availableTechnologies.map((tech) => (
                <label key={tech.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedTechIds.includes(tech.id)}
                    onChange={() => handleTechSelect(tech.id)}
                  />
                  <span>{tech.title}</span>
                  <span className="tech-status">{tech.status}</span>
                </label>
              ))}
            </div>
          )}
          {errors.technologies && (
            <div className="error">{errors.technologies}</div>
          )}
        </div>

        <button type="submit" className="btn-primary">
          Установить дедлайн
        </button>
      </form>
    </div>
  );
}
export default DeadlineForm;
