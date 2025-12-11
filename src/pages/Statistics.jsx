import useTechnologies from "../components/useTechnologies.jsx";
import ProgressBar from "../reusable/ProgressBar.jsx";
import ProgressHeader from "../components/ProgressHeader.jsx";
import "../style/Statistics.css";

function Statistics() {
  const {
    progress,
    totalCount,
    completedCount,
    inProgressCount,
    notStartedCount,
  } = useTechnologies();

  return (
    <div className="statistic-page">
      <header>
        <h2>Статистика</h2>
      </header>
      <div className="statistic-container">
        <ProgressBar
          progress={progress}
          label="Общий прогресс"
          color="#4CAF50"
          animated={true}
          height={20}
        />
        <ProgressHeader
          totalCount={totalCount}
          completedCount={completedCount}
          inProgressCount={inProgressCount}
          notStartedCount={notStartedCount}
        />
      </div>
    </div>
  );
}

export default Statistics;
