import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import CreatePostPage from "./CreatePostPage";
import TextPostPage from "./TextPostPage";
import ImagePostPage from "./ImagePostPage";
<<<<<<< HEAD
import MainPage from "./MainPage"; // Main page component
=======
import MainPage from "./MainPage"; // Import MainPage
>>>>>>> frontEnd

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for LoginPage */}
        <Route path="/" element={<LoginPage />} />

        {/* Route for SignUpPage */}
        <Route path="/signup" element={<SignUpPage />} />

        {/* Route for CreatePostPage */}
        <Route path="/create-post" element={<CreatePostPage />} />

        {/* Route for TextPostPage */}
        <Route path="/text-post" element={<TextPostPage />} />

        {/* Route for ImagePostPage */}
        <Route path="/image-post" element={<ImagePostPage />} />
<<<<<<< HEAD
=======

        {/* Route for MainPage */}
>>>>>>> frontEnd
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
