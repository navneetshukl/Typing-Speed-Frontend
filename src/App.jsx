// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login"  element={<Login />} />

      <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
    </Routes>
  );
}

export default App;