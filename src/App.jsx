import "./style/App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Navigation from "./components/Navigation.jsx";
import Home from "./pages/Home.jsx";
import TechnologyList from "./pages/TechnologyList.jsx";
import Settings from "./pages/Settings.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TechnologyDetail from "./pages/TechnologyDetail.jsx";
import Statistics from "./pages/Statistics.jsx";
import AddTechnology from "./pages/AddTechnology.jsx";
import DeadlineManagement from "./pages/DeadlineManagement.jsx";

import { ThemeProvider } from './components/ThemeChange';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = localStorage.getItem("username") || "";
    setIsLoggedIn(loggedIn);
    setUsername(user);
  }, []);

  const handleLogin = (user) => {

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user);

    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <ThemeProvider>
    <Router>
      <div className="app">
        <Navigation 
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
        />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />} 
            />
            
            <Route path="/technologies" element={<TechnologyList />} />

            <Route path="/statistics" element={<Statistics />} />

            <Route path="/deadline" element={<DeadlineManagement />} />


            <Route path="/technologies/:techId" element={<TechnologyDetail />} />
            
            <Route
              path="/settings"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            
            <Route 
              path="/add-technology" 
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AddTechnology />
                </ProtectedRoute>
              } 
            />
            
          </Routes>
        </main>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;