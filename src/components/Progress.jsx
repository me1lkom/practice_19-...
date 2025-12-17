// import "../style/Progress.css"

// function ProgressHeader({ totalCount, completedCount, inProgressCount, notStartedCount }) {
//   return (
//     <div className="progress">
//       <div className="progress-info">
//         <p> Общее количество технологий: {totalCount}</p>
//         <p> Количество изученных технологий: {completedCount}</p>
//         <p> Количество изучаемых технологий: {inProgressCount}</p>
//         <p> Количество не изученных технологий: {notStartedCount}</p>
//       </div>
//     </div>
//   );
// }
// export default ProgressHeader;

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from "@mui/icons-material";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Dashboard({ technologies }) {
  // const [tabValue, setTabValue] = React.useState(0);

  // Статистика
  const stats = {
    total: technologies.length,
    completed: technologies.filter((t) => t.status === "completed").length,
    inProgress: technologies.filter((t) => t.status === "in-progress").length,
    notStarted: technologies.filter((t) => t.status === "not-started").length,
    progress:
      technologies.length > 0
        ? Math.round(
            (technologies.filter((t) => t.status === "completed").length /
              technologies.length) *
              100
          )
        : 0,
  };

  // const handleTabChange = (event, newValue) => {
  //   setTabValue(newValue);
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography color="text.secondary" variant="h1" gutterBottom sx={{
        display: 'flex',
        justifyContent: 'center', 
      }}>
        Трекер изучения технологий
      </Typography>

      <Grid
        container
        spacing={3}
        gap={3}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Статистические карточки */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Всего технологий
              </Typography>
              <Typography variant="h4" component="div">
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Завершено
              </Typography>
              <Typography variant="h4" component="div" color="success.main">
                {stats.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                В процессе
              </Typography>
              <Typography variant="h4" component="div" color="warning.main">
                {stats.inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Не начато
              </Typography>
              <Typography variant="h4" component="div" color="text.secondary">
                {stats.notStarted}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Прогресс */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Общий прогресс
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Box flex={1}>
                  <LinearProgress
                    variant="determinate"
                    value={stats.progress}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Typography variant="h6" color="primary">
                  {stats.progress}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
        }}
      >
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Распределение по статусам
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Завершено</Typography>
                  <Typography>
                    {stats.completed} ({stats.progress}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stats.progress}
                  color="success"
                />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt={2}
                  mb={1}
                >
                  <Typography>В процессе</Typography>
                  <Typography>{stats.inProgress}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.inProgress / stats.total) * 100}
                  color="warning"
                />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt={2}
                  mb={1}
                >
                  <Typography>Не начато</Typography>
                  <Typography>{stats.notStarted}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.notStarted / stats.total) * 100}
                  color="inherit"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
