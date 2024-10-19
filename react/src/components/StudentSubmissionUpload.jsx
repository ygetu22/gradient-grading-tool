
import React, { useState } from 'react';
import { uploadStudentSubmissions } from '../utils/api';

function StudentSubmissionUpload({ setLoading, setUploaded }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      setLoading(true);
      const response = await uploadStudentSubmissions(files); // API call to upload students' solutions
      setLoading(false);
      setUploaded(response.success); // Move to next step if success
    }
  };

  return (
    <div>
      <h2>Upload Student Submissions</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Submissions</button>
    </div>
  );
}

export default StudentSubmissionUpload;
