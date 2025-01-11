// ImagePostPage.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header"; // Import the Header component here

const ImagePostPage: React.FC = () => {
  const location = useLocation();
  const { crn, startTime, startDate } = location.state || {};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Header />
      <h1>Upload an Image Post</h1>
      <p>CRN: {crn}</p>
      <p>Start Time: {startTime}</p>
      <p>Start Date: {startDate}</p>

      {/* Form for uploading an image */}
      <input type="file" accept="image/*" style={{ marginTop: "20px" }} />
      <button style={{ marginTop: "20px", padding: "10px 20px" }}>
        Submit Image Post
      </button>
    </div>
  );
};

export default ImagePostPage;
