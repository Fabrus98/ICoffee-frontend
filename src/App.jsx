import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState } from "react";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Prenotazione from "./pages/Prenotazione";
import ListaPrenotazioni from "./pages/ListaPrenotazioni";
import Developing from "./pages/Developing";
import Test from "./pages/test";
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const hideHeader = location.pathname === "/login";

  return (
    <>
      {!hideHeader && <Header onLogout={() => setIsLoggedIn(false)} />}
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />

        {/* Home */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home onLogout={() => setIsLoggedIn(false)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* prenotazione */}
        <Route
          path="/prenotazione"
          element={
            isLoggedIn ? (
              <Prenotazione />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* lista-prenotazioni */}
        <Route
          path="/lista-prenotazioni"
          element={
            isLoggedIn ? (
              <ListaPrenotazioni />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* sviluppo */}
        <Route
          path="/developing"
          element={
            isLoggedIn ? (
              <Developing />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* sviluppo */}
        <Route
          path="/test"
          element={
            isLoggedIn ? (
              <Test />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default: reindirizza */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;