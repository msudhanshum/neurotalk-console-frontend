import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Payment from "../pages/Payment";
import InvoiceView from "../pages/InvoiceView";
import InvoiceCreate from "../pages/InvoiceCreate.jsx";
import Login from "../pages/Login.jsx";
import Chat from "../pages/Chat.jsx";
import ProtectedRoute from "./ProtectedRoute";

/* Company Module */
import CompanyList from "../pages/CompanyList.jsx";
import AddCompany from "../pages/AddCompany.jsx";
import EditCompany from "../pages/EditCompany.jsx";
import CompanyStats from "../pages/CompanyStats.jsx";

const AppRoutes = () => {

  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          {/* Dashboard Home */}
          <Route index element={<Dashboard />} />

          {/* Applications */}
          <Route path="chat" element={<Chat />} />

          {/* Payment */}
          <Route path="payment" element={<Payment />} />

          {/* Invoice */}
          <Route path="invoice-view" element={<InvoiceView />} />
          <Route path="invoice-create" element={<InvoiceCreate />} />

          {/* Company Management */}

          <Route path="company-list" element={<CompanyList />} />
          <Route path="add-company" element={<AddCompany />} />
          <Route path="edit-company/:id" element={<EditCompany />} />
          <Route path="company-stats/:id" element={<CompanyStats />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );

};

export default AppRoutes;