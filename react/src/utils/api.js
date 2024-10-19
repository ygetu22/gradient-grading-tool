// src/utils/api.js

export const uploadAnswerKey = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('/api/upload-answer-key', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading answer key:', error);
      return { success: false };
    }
  };
  
  export const uploadStudentSubmissions = async (files) => {
    const formData = new FormData();
    files.forEach((file, index) => formData.append(`file${index}`, file));
  
    try {
      const response = await fetch('/api/upload-student-submissions', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading student submissions:', error);
      return { success: false };
    }
  };
  