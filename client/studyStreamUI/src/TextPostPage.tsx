// TextPostPage.tsx
import React from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "./Header"; // Import the Header component here

const TextPostPage: React.FC = () => {
  const location = useLocation();
  const { crn, startTime, startDate } = location.state || {};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Wrap the Header in a Link to make the logo clickable */}
      <Link to="/main">
        <Header />
      </Link>

      <h1>Create a Text Post</h1>
      <p>CRN: {crn}</p>
      <p>Start Time: {startTime}</p>
      <p>Start Date: {startDate}</p>

      {/* Form for adding text post */}
      <textarea
        placeholder="Enter your text here"
        style={{ width: "80%", height: "200px" }}
      />
      <button style={{ marginTop: "20px", padding: "10px 20px" }}>
        Submit Text Post
      </button>
    </div>
  );
};

export default TextPostPage;
