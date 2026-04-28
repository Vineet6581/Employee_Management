import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";

function Dashboard({ onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [admin, setAdmin] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
    fetchEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [searchTerm, employees]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    } catch (err) {
      setMessage("Error fetching employees");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = () => {
    const filtered = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredEmployees(filtered);
  };

  const handleAddEmployee = async (formData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/employees`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Employee added successfully");
      setShowForm(false);
      fetchEmployees();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding employee");
    }
  };

  const handleUpdateEmployee = async (formData) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/employees/${editingEmployee._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Employee updated successfully");
      setEditingEmployee(null);
      setShowForm(false);
      fetchEmployees();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating employee");
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Employee deleted successfully");
        fetchEmployees();
        setTimeout(() => setMessage(""), 3000);
      } catch (err) {
        setMessage("Error deleting employee");
      }
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  const getStatusBadgeStyle = (status) => {
    const baseStyle = {
      padding: "4px 8px",
      borderRadius: "3px",
      fontSize: "12px",
      fontWeight: "bold",
    };

    if (status === "Active") {
      return { ...baseStyle, backgroundColor: "#d4edda", color: "#155724" };
    } else if (status === "Inactive") {
      return { ...baseStyle, backgroundColor: "#f8d7da", color: "#721c24" };
    } else {
      return { ...baseStyle, backgroundColor: "#fff3cd", color: "#856404" };
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Employee Management System</h1>
          {admin && <p style={styles.welcome}>Welcome, {admin.username}</p>}
        </div>
        <button onClick={handleLogoutClick} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Message Alert */}
      {message && <div style={styles.messageAlert}>{message}</div>}

      {/* Search and Add Button */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={() => setShowForm(true)} style={styles.addButton}>
          + Add Employee
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2>{editingEmployee ? "Edit Employee" : "Add New Employee"}</h2>
              <button onClick={handleCloseForm} style={styles.closeButton}>
                ✕
              </button>
            </div>
            <EmployeeForm
              onSubmit={
                editingEmployee ? handleUpdateEmployee : handleAddEmployee
              }
              employee={editingEmployee}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}

      {/* Employee Table */}
      {loading ? (
        <div style={styles.loading}>Loading employees...</div>
      ) : (
        <div style={styles.tableWrapper}>
          {filteredEmployees.length === 0 ? (
            <div style={styles.noData}>No employees found</div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Joining Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td>${emp.salary}</td>
                    <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
                    <td>
                      <span style={getStatusBadgeStyle(emp.status)}>
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <div style={styles.actionButtons}>
                        <button
                          onClick={() => handleEditEmployee(emp)}
                          style={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(emp._id)}
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #cccccc",
    paddingBottom: "15px",
  },
  title: {
    fontSize: "28px",
    color: "#000000",
    margin: "0 0 5px 0",
  },
  welcome: {
    fontSize: "14px",
    color: "#666666",
    margin: "0",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  messageAlert: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "12px 15px",
    borderRadius: "4px",
    marginBottom: "20px",
    border: "1px solid #c3e6cb",
  },
  controls: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  searchInput: {
    flex: 1,
    padding: "10px",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    padding: "30px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #cccccc",
    paddingBottom: "10px",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    color: "#666",
  },
  noData: {
    textAlign: "center",
    padding: "40px",
    color: "#666",
  },
  tableWrapper: {
    overflowX: "auto",
    border: "1px solid #cccccc",
    borderRadius: "4px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  actionButtons: {
    display: "flex",
    gap: "5px",
  },
  editButton: {
    padding: "6px 12px",
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "12px",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#cccccc",
    color: "#000000",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default Dashboard;
