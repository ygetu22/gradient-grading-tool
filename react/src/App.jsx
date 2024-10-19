import React, { useState } from 'react';
import './App.css';
import AnswerKeyUpload from './components/AnswerKeyUpload';
import StudentSubmissionUpload from './components/StudentSubmissionUpload';
import Loading from './components/Loading';
import ResultsDisplay from './components/ResultsDisplay';
import MessageDisplay from './components/MessageDisplay'; // Import the new component

function App() {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // To store success message
  const [results, setResults] = useState(null);

  const handleUploadAnswerKey = async (file) => {
    setLoading(true);
    setError(null);
    setSuccess(null); // Clear previous success messages

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
    setSuccess(null); // Clear previous success messages

    const response = await uploadStudentSubmissions(files);

    if (response.success) {
      setResults(response.data);
      setSuccess('Student submissions uploaded successfully!');
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Gradient - Grader</h1>

      {loading && <Loading />} {/* Show loading spinner */}

      {error && <MessageDisplay message={error} type="error" />} {/* Display error */}
      {success && <MessageDisplay message={success} type="success" />} {/* Display success */}

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
