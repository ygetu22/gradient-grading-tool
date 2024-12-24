import React, { useState } from 'react';
import { uploadAnswerKey } from '../utils/api';
import './loading.css'; // Add loading CSS if needed

function AnswerKeyUpload({ setLoading, setUploaded }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      const response = await uploadAnswerKey(file); // API call to upload key
      setLoading(false);
      setUploaded(response.success); // Move to next step if success
    }
  };

  return (
    <div>
      <h2>Upload Answer Key</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Answer Key</button>
    </div>
  );
}

export default AnswerKeyUpload;
