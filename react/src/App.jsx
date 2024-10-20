import React, { useState } from 'react';
import './App.css';
import AnswerKeyUpload from './components/AnswerKeyUpload';
import StudentSubmissionUpload from './components/StudentSubmissionUpload';
import Loading from './components/Loading';
import ResultsDisplay from './components/ResultsDisplay';
import MessageDisplay from './components/MessageDisplay'; 
import { uploadAnswerKey, uploadStudentSubmissions, fetchResults } from './utils/api'; // Updated imports

function App() {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [results, setResults] = useState(null);

  const handleUploadAnswerKey = async (file) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await uploadAnswerKey(file);

    if (response.success) {
      setUploaded(true);
      setSuccess('Answer key uploaded successfully!');
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  const handleUploadSubmissions = async (files) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await uploadStudentSubmissions(files);

    if (response.success) {
      // Fetch the grading results after successful submissions
      const resultData = await fetchResults(); // New addition to get results from API
      setResults(resultData);
      setSuccess('Student submissions uploaded successfully!');
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Gradient - Grader</h1>

      {loading && <Loading />} 

      {error && <MessageDisplay message={error} type="error" />}
      {success && <MessageDisplay message={success} type="success" />}

      {!loading && !uploaded && (
        <AnswerKeyUpload setLoading={setLoading} setUploaded={handleUploadAnswerKey} />
      )}

      {!loading && uploaded && !results && (
        <StudentSubmissionUpload setLoading={setLoading} setUploaded={handleUploadSubmissions} />
      )}

      {!loading && results && <ResultsDisplay results={results} />}
    </div>
  );
}

export default App;
