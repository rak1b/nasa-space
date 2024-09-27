// src/components/Header.jsx
import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import videoBg from "../assets/video/video-bg.mp4";

import "../index.css";

const topics = [
  {
    title: "Introduction to React",
    description: "Learn the basics of React and how it works.",
  },
  {
    title: "React Components",
    description: "Understand what components are and how to use them.",
  },
  {
    title: "React State and Props",
    description: "Learn how to manage state and pass data via props.",
  },
  {
    title: "React Hooks",
    description: "Explore the power of React hooks for managing state and side effects.",
  },
  // Add more topics as needed
];

// Import the video file
function Description() {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // To control animation

  const currentTopic = topics[currentTopicIndex];

  // Handle the next topic with animation
  const handleNextTopic = () => {
    if (currentTopicIndex < topics.length - 1) {
      setIsAnimating(true); // Trigger exit animation
      setTimeout(() => {
        setCurrentTopicIndex(currentTopicIndex + 1); // Move to next topic
        setIsAnimating(false); // Reset animation
      }, 500); // Match animation duration
    } else {
      alert('You have finished all topics!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-500 ease-in-out ${
          isAnimating ? 'fade-out' : 'fade-in'
        }`}
      >
        <img
          src={currentTopic.imageUrl}
          alt={currentTopic.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{currentTopic.title}</h2>
          <p className="text-gray-600 mb-4">{currentTopic.description}</p>
          <button
            onClick={handleNextTopic}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
          >
            {currentTopicIndex < topics.length - 1 ? 'Next Topic' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Description;
