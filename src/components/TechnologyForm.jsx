import { useEffect, useState, useRef } from "react"; // Добавьте useRef
import "../style/TechnologyForm.css";
function TechnologyForm({ onSave, onCancel, initialData = {} }) {
  // состояние формы с начальными значениями
  const [formData, setFormData] = useState({
    title: initialData.title || "", // название технологии
    description: initialData.description || "", // описание
    category: initialData.category || "frontend", // категория
    difficulty: initialData.difficulty || "beginner", // сложность
    deadline: initialData.deadline || "", // дедлайн (необязательно)
    resources: initialData.resources || [""], // массив URL ресурсов
  });

  const statusRef = useRef(null); // Для озвучивания статуса

  // состояние для хранения ошибок валидации
  const [errors, setErrors] = useState({});

  // флаг валидности всей формы
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const newError = {};

    // Валидация названия
    if (formData.title.trim()) {
      if (formData.title.trim().length < 2) {
        newError.title = "Название должно содержать больше 2 символов";
      } else if (formData.title.trim().length > 30) {
        newError.title = "Название должно содержать меньше 30 символов";
      }
    }

    // Валидация описания
    if (formData.description.trim()) {
      if (formData.description.trim().length < 10) {
        newError.description = "Описание должно содержать больше 10 символов";
      }
    }

    // Валидация дедлайна
    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (deadlineDate < today) {
        newError.deadline = "Дедлайн не может быть в прошлом";
      }
    }

    formData.resources.forEach((resource, index) => {
      if (resource && !isValidUrl(resource)) {
        newError[`resource_${index}`] = "Некорректный URL";
      }
    });

    setErrors(newError);
    setIsFormValid(Object.keys(newError).length === 0);
  };

  // Проверка URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Запуск валидации при изменении любого input`а, отображение в реальном времени
  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;

    setFormData((prev) => ({
      ...prev,
      resources: newResources,
    }));
  };

  const addResourceField = () => {
    setFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, ""],
    }));
  };

  const removeResourceField = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i != index);
      setFormData((prev) => ({
        ...prev,
        resources: newResources,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submintErrors = {};

    if (!formData.title.trim()) submintErrors.title = "Название обязательно";
    if (!formData.description.trim())
      submintErrors.description = "Описание обязательно";

    const allErrors = { ...errors, ...submintErrors };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);

      if (statusRef.current) {
        statusRef.current.textContent =
          "Заполните все обязательные поля корректно";
      }

      const firstErrorField = document.querySelector(".error");
      if (firstErrorField) {
        firstErrorField.focus();
      }

      return;
    }

    const cleaedData = {
      ...formData,
      resources: formData.resources.filter(
        (resource) => resource.trim() !== ""
      ),
    };

    if (statusRef.current) {
      statusRef.current.textContent = "Форма успешно отправлена";
    }

    onSave(cleaedData);
  };

  return (
    <form onSubmit={handleSubmit} className="technology-form" noValidate>
      <div
        ref={statusRef}
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />

      <h2>
        {initialData.title
          ? "Редактирование технологии"
          : "Добавление новой технологии"}
      </h2>

      {/* Поле названия */}
      <div className="form-group">
        <label htmlFor="title" className="required">
          Название технологии
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? "error" : ""}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
          required
        />
        {errors.title && (
          <span id="title-error" className="error-message" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      {/* Поле описания */}
      <div className="form-group">
        <label htmlFor="description" className="required">
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={errors.description ? "error" : ""}
          placeholder="Опишите, что это за технология и зачем её изучать..."
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          required
        />
        {errors.description && (
          <span id="description-error" className="error-message" role="alert">
            {errors.description}
          </span>
        )}
      </div>

      {/* Выбор категории */}
      <div className="form-group">
        <label htmlFor="category">Категория</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="mobile">Mobile</option>
          <option value="devops">DevOps</option>
          <option value="database">Базы данных</option>
          <option value="tools">Инструменты</option>
        </select>
      </div>

      {/* Выбор сложности */}
      <div className="form-group">
        <label htmlFor="difficulty">Уровень сложности</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="beginner">Начинающий</option>
          <option value="intermediate">Средний</option>
          <option value="advanced">Продвинутый</option>
        </select>
      </div>

      {/* Поле дедлайна */}
      <div className="form-group">
        <label htmlFor="deadline">Планируемая дата освоения</label>
        <input
          id="deadline"
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          className={errors.deadline ? "error" : ""}
          aria-invalid={!!errors.deadline}
          aria-describedby={errors.deadline ? "deadline-error" : undefined}
        />
        {errors.deadline && (
          <span id="deadline-error" className="error-message" role="alert">
            {errors.deadline}
          </span>
        )}
      </div>

      {/* Поля ресурсов */}
      <div className="form-group">
        <label>Ресурсы для изучения</label>
        {formData.resources.map((resource, index) => (
          <div key={index} className="resource-field">
            <input
              type="url"
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              placeholder="https://example.com"
              className={errors[`resource_${index}`] ? "error" : ""}
              aria-invalid={!!errors[`resource_${index}`]}
              aria-describedby={
                errors[`resource_${index}`]
                  ? `resource-${index}-error`
                  : undefined
              }
            />
            {formData.resources.length > 1 && (
              <button
                type="button"
                onClick={() => removeResourceField(index)}
                className="remove-resource"
                aria-label="Удалить ресурс"
              >
                x
              </button>
            )}
            {errors[`resource_${index}`] && (
              <span
                id={`resource-${index}-error`}
                className="error-message"
                role="alert"
              >
                {errors[`resource_${index}`]}
              </span>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addResourceField}
          className="add-resource"
        >
          + Добавить ещё ресурс
        </button>
      </div>

      {/* Кнопки формы */}
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initialData.title ? "Обновить технологию" : "Добавить технологию"}
        </button>

        <button type="button" onClick={onCancel} className="btn-secondary">
          Отмена
        </button>
      </div>

      <div className="form-validation-info" role="status" aria-live="polite">
        {!isFormValid ? "⚠️ Заполните все обязательные поля корректно" : "Все поля заполнены корректно"}
      </div>
    </form>
  );
}

export default TechnologyForm;
