import React from 'react';
import '../styles/resultsDisplay.css';


function ResultsDisplay({ results }) {
  if (!results) {
    return <p>No results to display.</p>; // Simple fallback in case results are empty
  }

  return (
    <div>
      <h2>Grading Results</h2>
      <p>{results.totalA} students got A's</p>
      <p>{results.totalB} students got B's</p>
      
      {/* Loop through the list of students to show individual results */}
      {results.students.map((student, index) => (
        <div key={index} className="student-result">
          <h3>{student.name}</h3>
          <p>Score: {student.score}</p>
          <p>Feedback: {student.feedback}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ResultsDisplay;
