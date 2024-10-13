import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "./Header"; // Assuming you're using the Header component for the logo

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = { username, password };

    try {
      const response = await fetch("http://localhost:5173/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Successful:", data);
        alert(`Welcome ${data.username}!`);
      } else {
        console.error("Login Failed:", data);
        alert(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Wrap the logo in a Link component */}
      <Link to="/main">
        {" "}
        {/* This will make the logo clickable and redirect to MainPage */}
        <Header />
      </Link>

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
