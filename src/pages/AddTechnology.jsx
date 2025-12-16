import TechnologyForm from "../components/TechnologyForm.jsx";
import Modal from "../reusable/Modal.jsx"; // Импортируем готовую модалку
import useTechnologies from "../components/useTechnologies.jsx"; // 👈 Импортируем хук!

import { useState } from "react";
function AddTechnology() {
  const { 
    technologies, 
    addTechnology, 
    deleteTechnology,  
  } = useTechnologies();
  
  const [showForm, setShowForm] = useState(false);
  const [editingTech, setEditingTech] = useState(null);

  const handleSaveTechnology = (techData) => {

    addTechnology(techData)

    setShowForm(false);
    setEditingTech(null);
  };

  const handleEdit = (technology) => {
    setEditingTech(technology);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTech(null);
  };

  return (
    <div className="page">
      <div className="technology-manager">
        <div className="manager-header">
          <h2>Управление технологиями</h2>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            + Добавить технологию
          </button>
        </div>

        <div className="technologies-list">
          {technologies.map((tech) => (
            <div key={tech.id} className="technology-item">
              <h3>{tech.title}</h3>
              <p>{tech.description}</p>
              <div className="tech-actions">
                <button onClick={() => handleEdit(tech)}>Редактировать</button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={showForm}
          onClose={handleCancel}
          title={editingTech ? "Редактирование технологии" : "Добавление новой технологии"}
        >
          <TechnologyForm
            onSave={handleSaveTechnology}
            onCancel={handleCancel}
            initialData={editingTech || {}}
          />
        </Modal>
      </div>
    </div>
  );
}

export default AddTechnology;
