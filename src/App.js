import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./store/authContext";
import HomeComponent from "./components/HomeComponent"
import LoginComponent from "./components/LoginComponent"


function ProtectedRoute({ children }) {
  const { authed } = useAuth();
  return authed === true ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeComponent />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </div>
  );
}
