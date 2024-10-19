import React from 'react';

function ResultsDisplay({ results }) {
  return (
    <div>
      <h2>Grading Results</h2>
      <p>{results.totalA} students got A's</p>
      <p>{results.totalB} students got B's</p>
      {/* Display student-specific results */}
      {results.students.map((student, index) => (
        <div key={index}>
          <h3>{student.name}</h3>
          <p>Score: {student.score}</p>
          <p>Feedback: {student.feedback}</p>
        </div>
      ))}
    </div>
  );
}

export default ResultsDisplay;
