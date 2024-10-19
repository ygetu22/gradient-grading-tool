import React, { useState } from 'react';
import './App.css';
import AnswerKeyUpload from './components/AnswerKeyUpload';
import StudentSubmissionUpload from './components/StudentSubmissionUpload';
import Loading from './components/Loading';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [results, setResults] = useState(null);

  return (
    <div className="App">
      <h1>Gradient - Grader</h1>
      {loading && <Loading />}
      {!loading && !uploaded && <AnswerKeyUpload setLoading={setLoading} setUploaded={setUploaded} />}
      {!loading && uploaded && !results && <StudentSubmissionUpload setLoading={setLoading} setUploaded={setResults} />}
      {!loading && results && <ResultsDisplay results={results} />}
    </div>
  );
}

export default App;
