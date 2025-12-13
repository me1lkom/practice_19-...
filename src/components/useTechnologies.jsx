import useLocalStorage from "../reusable/useLocalStorage.jsx";
// Начальные данные для технологий
const initialTechnologies = [
  {
    id: 1,
    title: "React Components",
    description: "Изучение базовых компонентов",
    status: "completed",
    notes: "",
  },
  {
    id: 2,
    title: "JSX Syntax",
    description: "Освоение синтаксиса JSX",
    status: "in-progress",
    notes: "",
  },
  {
    id: 3,
    title: "State Management",
    description: "Работа с состоянием компонентов",
    status: "not-started",
    notes: "",
  },
  {
    id: 4,
    title: "State",
    description: "Работа компонентов",
    status: "not-started",
    notes: "",
  },
];
function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage(
    "technologies",
    initialTechnologies
  );

  const nextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "completed":
        return "in-progress";
      case "in-progress":
        return "not-started";
      case "not-started":
        return "completed";
      default:
        return currentStatus;
    }
  };

  // Функция для обновления статуса технологии
  const updateStatus = (techId) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, status: nextStatus(tech.status) } : tech
      )
    );
  };

  // Функция для обновления заметок
  const updateNotes = (techId, newNotes) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  // Функция для расчета общего прогресса
  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(
      (tech) => tech.status === "completed"
    ).length;
    return Math.round((completed / technologies.length) * 100);
  };

  // Функция для изменения статуса всех технологий на выпослнено
  const handleAllCompleted = () => {
    setTechnologies((prev) =>
      prev.map((tech) => ({ ...tech, status: "completed" }))
    );
  };

  // Функция для изменения статуса всех технологий на не начато
  const handleReset = () => {
    setTechnologies((prevTechs) =>
      prevTechs.map((tech) => ({ ...tech, status: "not-started" }))
    );
  };

  // Функция для изменения статуса рандомной технологий на в процессе
  const handleSelectRandom = () => {
    const availableTechs = technologies.filter(
      (tech) => tech.status !== "in-progress"
    );

    if (availableTechs.length === 0) {
      alert("Все технологии уже находяться в процессе.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableTechs.length);
    const randomTech = availableTechs[randomIndex];

    setTechnologies((prevTechs) =>
      prevTechs.map((tech) =>
        tech.id === randomTech.id ? { ...tech, status: "in-progress" } : tech
      )
    );
  };

  const totalCount = technologies.length;

  const completedCount = technologies.filter(
    (tech) => tech.status === "completed"
  ).length;

  const inProgressCount = technologies.filter(
    (tech) => tech.status === "in-progress"
  ).length;

  const notStartedCount = technologies.filter(
    (tech) => tech.status === "not-started"
  ).length;

  const addTechnology = (techData) => {
    // Если techData - массив, добавляем несколько технологий
    const techsToAdd = Array.isArray(techData) ? techData : [techData];

    const maxId = technologies.reduce((max, tech) => Math.max(max, tech.id), 0);

    const newTechs = techsToAdd.map((tech, index) => ({
      id: maxId + index + 1,
      title: tech.title,
      description: tech.description || "",
      status: "not-started",
      notes: tech.notes || "",
    }));

    setTechnologies((prev) => [...prev, ...newTechs]);
    return newTechs;
  };

  const resetToInitial = () => {
    setTechnologies(initialTechnologies);
    return initialTechnologies;
  };

  

  return {
    technologies,

    updateStatus,
    updateNotes,

    addTechnology,
    resetToInitial,
    handleAllCompleted,
    handleReset,
    handleSelectRandom,

    totalCount,
    completedCount,
    inProgressCount,
    notStartedCount,

    progress: calculateProgress(),
  };
}
export default useTechnologies;
