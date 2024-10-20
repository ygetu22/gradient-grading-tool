// src/utils/api.js

// Upload the answer key
export const uploadAnswerKey = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    // Ensure the route is correct based on your backend
    const response = await fetch('http://localhost:5050/upload-answer-key', {
      method: 'POST',
      body: formData,
    });

    // Check for any errors in the response
    if (!response.ok) {
      throw new Error('Failed to upload answer key');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading answer key:', error);
    return { success: false, error: 'Error uploading answer key' };
  }
};

// Upload student submissions
export const uploadStudentSubmissions = async (files) => {
  const formData = new FormData();
  files.forEach((file, index) => formData.append(`file${index}`, file));

  try {
    const response = await fetch('/upload-student-submissions', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload student submissions');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading student submissions:', error);
    return { success: false, error: 'Error uploading student submissions' };
  }
};

// Fetch the grading results from the server
export const fetchResults = async () => {
  try {
    const response = await fetch('/get-results'); // Ensure your backend provides this route

    if (!response.ok) {
      throw new Error('Failed to fetch results');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching results:', error);
    return { success: false, error: 'Failed to fetch results' };
  }
};
