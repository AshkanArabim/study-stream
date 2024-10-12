import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    alert("Sign-up functionality not implemented yet");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
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
      <div style={{ marginTop: "20px" }}>
        <p>Already have an account?</p>
        <Link to="/">
          <button style={{ padding: "10px 20px" }}>Back to Login</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
