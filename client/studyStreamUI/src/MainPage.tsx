// src/MainPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css"; // For styling the page
import logo from "./assets/logo.png"; // Import your logo

const MainPage: React.FC = () => {
  const [crn, setCrn] = useState("");
  const [startDate, setStartDate] = useState("");
  const navigate = useNavigate();

  // Handle search logic here
  const handleSearch = () => {
    console.log("Search for CRN:", crn, "and Date:", startDate);
    // Filter logic will go here
  };

  // Redirect to CreatePostPage.tsx
  const handleCreate = () => {
    navigate("/create-post");
  };

  return (
    <div className="main-page">
      <header className="main-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Study Stream</h1>
      </header>

      <div className="search-section">
        <input
          type="number"
          placeholder="Enter CRN"
          value={crn}
          onChange={(e) => setCrn(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Area to display posts */}
      <div className="posts-section">
        <p>Here will be the posts displayed...</p>
        {/* Add the logic to display the posts dynamically */}
      </div>

      {/* Create button */}
      <div className="create-button-container">
        <button className="create-button" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default MainPage;
