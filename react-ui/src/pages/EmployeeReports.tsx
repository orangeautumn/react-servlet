import React, { useState } from "react";

function getContextPath() {
  const parts = window.location.pathname.split('/');
  return parts.length > 1 ? '/' + parts[1] : '';
}

interface EmployeeNode {
  id: string;
  name: string;
  title: string;
  reports?: EmployeeNode[];
}

// Helper to flatten the hierarchy into a list with level
const flattenEmployees = (node: EmployeeNode, manager?: string, level: number = 1, list: any[] = []): any[] => {
  list.push({ id: node.id, name: node.name, title: node.title, manager: manager || "-", level });
  if (node.reports) {
    node.reports.forEach((emp) => flattenEmployees(emp, node.name, level + 1, list));
  }
  return list;
};

const EmployeeReports: React.FC = () => {
  const [hierarchy, setHierarchy] = useState<EmployeeNode | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchFromMock = async () => {
    setLoading(true);
    setError("");
    try {
      const contextPath = getContextPath();
      const response = await fetch(`${contextPath}/employee-hierarchy.json`);
      const data = await response.json();
      if (data && data.id) {
        setHierarchy(data);
      } else {
        setError(data.error || "Invalid data format");
      }
    } catch (err) {
      setError("Failed to load mock data");
    } finally {
      setLoading(false);
    }
  };

  const fetchFromServlet = async () => {
    setLoading(true);
    setError("");
    try {
      const contextPath = getContextPath();
      const response = await fetch(`${contextPath}/api`);
      const data = await response.json();
      if (data && data.id) {
        setHierarchy(data);
      } else {
        setError(data.error || "Invalid data format");
      }
    } catch (err) {
      setError("Failed to load data from servlet");
    } finally {
      setLoading(false);
    }
  };

  // Helper to add a reportee to an employee by id
  const addReportee = (parentId: string) => {
    if (!hierarchy) return;
    const newId = Date.now().toString();
    const newReportee: EmployeeNode = {
      id: newId,
      name: "New Employee",
      title: "Title",
      reports: []
    };
    const addToNode = (node: EmployeeNode): EmployeeNode => {
      if (node.id === parentId) {
        return {
          ...node,
          reports: node.reports ? [...node.reports, newReportee] : [newReportee]
        };
      }
      return {
        ...node,
        reports: node.reports ? node.reports.map(addToNode) : undefined
      };
    };
    setHierarchy(addToNode(hierarchy));
  };

  // Helper to delete an employee by id
  const deleteEmployee = (empId: string) => {
    if (!hierarchy) return;
    const removeFromNode = (node: EmployeeNode): EmployeeNode | null => {
      if (node.id === empId) return null;
      return {
        ...node,
        reports: node.reports
          ? node.reports.map(removeFromNode).filter(Boolean) as EmployeeNode[]
          : undefined
      };
    };
    const updated = removeFromNode(hierarchy);
    setHierarchy(updated);
  };

  const employees = hierarchy ? flattenEmployees(hierarchy) : [];

  return (
    <div style={{ padding: 40 }}>
      <h1>Employee Reporting Hierarchy</h1>
      <button onClick={fetchFromMock} disabled={loading} style={{ marginRight: 12 }}>
        {loading ? "Loading..." : "Load from Mock"}
      </button>
      <button onClick={fetchFromServlet} disabled={loading}>
        {loading ? "Loading..." : "Load from Servlet"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {employees.length > 0 && (
        <table style={{ marginTop: 24, borderCollapse: "collapse", width: "100%" }} border={1}>
          <thead>
            <tr>
              <th>Actions</th>
              <th>Level</th>
              <th>Name</th>
              <th>Title</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>
                  <button onClick={() => addReportee(emp.id)} style={{ marginRight: 8 }}>Add Reportee</button>
                  <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                </td>
                <td>{emp.level}</td>
                <td>{'\u00A0'.repeat((emp.level - 1) * 4)}{emp.name}</td>
                <td>{emp.title}</td>
                <td>{emp.manager}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeReports;
