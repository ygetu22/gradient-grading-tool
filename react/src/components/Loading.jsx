import React from 'react';
import './loading.css'; // Create a CSS file for loading animations

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div> {/* Loading spinner */}
      <h3>Loading... Please wait.</h3>
    </div>
  );
}

export default Loading;
