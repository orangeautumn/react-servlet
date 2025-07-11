import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeeReports from "./pages/EmployeeReports";
import BomUtility from "./pages/BomUtility";
import "./app.scss";

function getContextPath() {
  const parts = window.location.pathname.split('/');
  return parts.length > 1 ? '/' + parts[1] : '';
}

const App: React.FC = () => {
  const basename = getContextPath();
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/employeereports" element={<EmployeeReports />} />
        <Route path="/bomutility" element={<BomUtility />} />
        <Route path="/" element={<Navigate to="/employeereports" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

