import TechnologyForm from "../components/TechnologyForm.jsx";
import Modal from "../reusable/Modal.jsx";
import useTechnologies from "../components/useTechnologies.jsx";

import { useState } from "react";
import {
  Card,
  Typography
} from "@mui/material";

function AddTechnology() {
  const { 
    technologies, 
    addTechnology, 
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
    <div className="app">
      <div className="technology-manager">
        <div className="manager-header">
          <h2>Управление технологиями</h2>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            + Добавить технологию
          </button>
        </div>

        <div className="technologies-list">
          {technologies.map((tech) => (
            <Card key={tech.id} className="technology-item">
              <Typography variant="h5" component="h2" gutterBottom>{tech.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{tech.description}</Typography>
              <div className="tech-actions">
                <button onClick={() => handleEdit(tech)}>Редактировать</button>
              </div>
            </Card>
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
