// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import TypingTestUI from "./components/TypingTest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";


function App() {
  return (
    <>
          <Header user={"navneet"} />

    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login"  element={<Login />} />
      <Route path="/typing" element={<TypingTestUI/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/profile" element={<Profile/>}/>

      <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
    </Routes>
    <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </>
  );
}

export default App;