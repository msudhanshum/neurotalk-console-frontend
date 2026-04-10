import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../component/Profile";
import Contacts from "../pages/Contacts";
import GroupManagement from "../pages/GroupManagement";
 

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

        <Route
          path="/contact-management"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Contacts />} />
        </Route>

        <Route
          path="/dashboard/contacts"
          element={<Navigate to="/contact-management" replace />}
        />

        <Route
          path="/group-management"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<GroupManagement />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
