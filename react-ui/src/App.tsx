import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EmployeeReports from "./pages/EmployeeReports";

import "./app.scss";
import BomUtility from "./pages/BomUtility.page";
import SuccessPage from "./pages/SuccessPage.page";

function getContextPath() {
  const parts = window.location.pathname.split("/");
  return parts.length > 1 ? "/" + parts[1] : "";
}

const App: React.FC = () => {
  const basename = getContextPath();
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/employeereports" element={<EmployeeReports />} />
        <Route path="/bomutility" element={<BomUtility />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/" element={<Navigate to="/employeereports" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
