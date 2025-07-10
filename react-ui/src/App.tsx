import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeeReports from "./pages/EmployeeReports";

const App: React.FC = () => {
  return (
    <Router basename="/react-servlets">
      <Routes>
        <Route path="/employeereports" element={<EmployeeReports />} />
        <Route path="/" element={<Navigate to="/employeereports" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
 
