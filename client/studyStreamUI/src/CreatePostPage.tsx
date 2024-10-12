// CreatePostPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePostPage: React.FC = () => {
  const [crn, setCrn] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const navigate = useNavigate();

  const handleTextPost = () => {
    if (!crn || !startTime || !startDate) {
      alert("Please fill in all fields");
      return;
    }
    // Pass the data to the next page (you can also use context or localStorage)
    navigate("/text-post", { state: { crn, startTime, startDate } });
  };

  const handleImagePost = () => {
    if (!crn || !startTime || !startDate) {
      alert("Please fill in all fields");
      return;
    }
    // Pass the data to the next page (you can also use context or localStorage)
    navigate("/image-post", { state: { crn, startTime, startDate } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Create a Post</h1>
      <form style={{ display: "inline-block", textAlign: "left" }}>
        {/* CRN Input */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="crn">CRN</label>
          <input
            type="number"
            id="crn"
            value={crn}
            onChange={(e) => setCrn(e.target.value)}
            placeholder="Enter CRN"
            required
            style={{
              display: "block",
              marginTop: "5px",
              padding: "8px",
              width: "100%",
            }}
          />
        </div>

        {/* Start Time Input */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            style={{
              display: "block",
              marginTop: "5px",
              padding: "8px",
              width: "100%",
            }}
          />
        </div>

        {/* Start Date Picker */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{
              display: "block",
              marginTop: "5px",
              padding: "8px",
              width: "100%",
            }}
          />
        </div>

        {/* Buttons for Post Type */}
        <div style={{ marginTop: "20px" }}>
          <button
            type="button"
            onClick={handleTextPost}
            style={{ padding: "10px 20px", marginRight: "10px" }}
          >
            Input Text
          </button>
          <button
            type="button"
            onClick={handleImagePost}
            style={{ padding: "10px 20px" }}
          >
            Upload Picture
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
