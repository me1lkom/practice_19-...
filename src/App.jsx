import "./App.css";
import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";

function App() {
  const technologies = [
    {
      id: 1,
      title: "React Components",
      description: "Изучение базовых компонентов",
      status: "completed",
    },
    {
      id: 2,
      title: "JSX Syntax",
      description: "Освоение синтаксиса JSX",
      status: "in-progress",
    },
    {
      id: 3,
      title: "State Management",
      description: "Работа с состоянием компонентов",
      status: "not-started",
    },
  ];

  const totalCount = technologies.length;
  const completedCount = technologies.filter(
    technology => technology.status === "completed"
  ).length;

  return (
    <div className="App">
      <div className="progress">
          <ProgressHeader 
            totalCount={totalCount}
            completedCount={completedCount}
          />
      </div>
      <div className="task-list">
        <h1>RoadMap</h1>
        <ul>
          {technologies.map((technology) => (
            <li key={technology.id}>
              <TechnologyCard
                title={technology.title}
                description={technology.description}
                status={technology.status}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
