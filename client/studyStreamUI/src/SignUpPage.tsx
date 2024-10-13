import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate and Link
import Header from "./Header"; // Assuming you're using the Header component for the logo

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Create the navigate instance

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Handle sign-up logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Sign-up successful!");

    // Redirect to MainPage upon successful sign-up
    navigate("/main"); // Navigate to the main page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Add the Header component here with Link to MainPage */}
      <Link to="/main">
        {" "}
        {/* Wrap Header in Link to make it clickable */}
        <Header />
      </Link>

      <h1>Sign Up</h1>
      <form
        onSubmit={handleSignUp}
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
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
          Sign Up
        </button>
      </form>

      {/* Link to go back to Login Page */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <p>Already have an account?</p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Link to="/">
          <button style={{ padding: "10px 20px" }}>Back to Login</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
