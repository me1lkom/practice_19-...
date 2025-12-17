import "../style/TechnologyCard.css";
import TechnologyNotes from "./TechnologyNotes.jsx";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  CardActions,
} from "@mui/material";

function TechnologyCard({
  technology,
  onStatusChange,
  onNotesChange,
  isBulkMode = false,
  isSelected = false,
  onSelect = null,
}) {
  const handleClick = () => {
    onSelect();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "warning";
      default:
        return "default";
    }
  };
  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Завершено";
      case "in-progress":
        return "В процессе";
      default:
        return "Не начато";
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <div
        // className={`technology-card ${
        //   isSelected ? "selected" : ""
        // }`}
      >
        <CardContent>
          {isBulkMode && (
            <Button onClick={handleClick}>
              {isSelected ? "Убрать" : "Выбрать"}
            </Button>
          )}
          <Typography variant="h5" component="h2" gutterBottom>
            {technology.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {technology.description}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {/* <Chip label={technology.category} variant="outlined" size="small" /> */}
            <Chip
              label={getStatusText(technology.status)}
              color={getStatusColor(technology.status)}
              size="small"
            />
          </Box>
          <Box sx={{ margin: 1 }}>
            <TechnologyNotes
              notes={technology.notes}
              onNotesChange={onNotesChange}
              techId={technology.id}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onStatusChange(technology.id)}
          >
            {technology.status === "completed" ? "Сброс" : ""}
            {technology.status === "in-progress" ? "Закончить" : ""}
            {technology.status === "not-started" ? "Начать" : ""}
          </Button>
        </CardActions>
      </div>
    </Card>

    // <div
    // className={`technology-card ${technology.status} ${
    //   isSelected ? "selected" : ""
    // }`}
    // onClick={handleClick}
    // >
    //   {isBulkMode && (
    //     <div className="selected-indicator">{isSelected ? "+" : "-"}</div>
    //   )}
    //   <div className="technology-title">
    //     <h3>{technology.title}</h3>
    //   </div>
    //   <div className="technology-description">
    //     <div className="technology-status" onClick={onStatusChange}>
    //       <span>Статус: {technology.status}</span>
    //     </div>
    //     <span>{technology.description}</span>
    //   </div>
    //   <div className="technology-notes">
    // <TechnologyNotes
    //   notes={technology.notes}
    //   onNotesChange={onNotesChange}
    //   techId={technology.id}
    // />
    //   </div>
    // </div>
  );
}
export default TechnologyCard;
