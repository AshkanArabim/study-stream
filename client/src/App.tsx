import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import CreatePostPage from "./CreatePostPage";
import TextPostPage from "./TextPostPage";
import ImagePostPage from "./ImagePostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/text-post" element={<TextPostPage />} />
        <Route path="/image-post" element={<ImagePostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
