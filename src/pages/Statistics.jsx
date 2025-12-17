import useTechnologies from "../components/useTechnologies.jsx";
// import ProgressBar from "../reusable/ProgressBar.jsx";
import ProgressHeader from "../components/Progress.jsx";
import "../style/Statistics.css";

function Statistics() {
  const {
    technologies,
    // progress,
  } = useTechnologies();

  return (
    <div className="app">
      {/* <div className="statistic-page"> */}
        {/* <header>
        <h2>Статистика</h2>
      </header> */}
        <div className="statistic-container">
          {/* <ProgressBar
          progress={progress}
          label="Общий прогресс"
          color="#4CAF50"
          animated={true}
          height={20}
        /> */}
          <ProgressHeader technologies={technologies} />
        </div>
      {/* </div> */}
    </div>
  );
}

export default Statistics;
