import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../component/Profile";
 

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested Route */}
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;