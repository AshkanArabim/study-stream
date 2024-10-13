import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header"; // Assuming you're using the Header component for the logo

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    alert("Login functionality not implemented yet");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Add the Header component here */}
      <Header />

      <h1>Login Page</h1>
      <form
        onSubmit={handleLogin}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            style={{
              display: "block",
              marginTop: "5px",
              padding: "8px",
              width: "100%",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              display: "block",
              marginTop: "5px",
              padding: "8px",
              width: "100%",
            }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px", width: "100%" }}>
          Login
        </button>
      </form>

      {/* Link to SignUp page */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <p>Don't have an account?</p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Link to="/signup">
          <button style={{ padding: "10px 20px" }}>Create an Account</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
