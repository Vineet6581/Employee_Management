import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username: email.split("@")[0],
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Employee Management System</h1>

        {error && <div style={styles.alert}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleRegister}
              style={styles.buttonSecondary}
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>

        <p style={styles.hint}>
          Demo: Use register button to create an account, or login with existing
          credentials
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
  },
  title: {
    textAlign: "center",
    color: "#000000",
    marginBottom: "30px",
    fontSize: "24px",
  },
  alert: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "12px 15px",
    borderRadius: "4px",
    marginBottom: "15px",
    border: "1px solid #f5c6cb",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  button: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  buttonSecondary: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#333333",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  hint: {
    textAlign: "center",
    marginTop: "20px",
    color: "#666666",
    fontSize: "12px",
  },
};

export default Login;
