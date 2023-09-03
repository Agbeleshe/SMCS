// ResultUploader.jsx

import React, { useState } from "react";
import axios from "axios";

const ResultUploader = ({ studentId }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  axios.defaults.withCredentials = true;
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  axios.defaults.withCredentials = true;
  const handleUpload = () => {
    if (!selectedFile) {
      alert("no file selected");

      // Handle error: No file selected
      return;
    }

    console.log("Uploading for studentId:", studentId); // Log the studentId

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Log request details
    console.log("Request URL:", `https://smcsserver.vercel.app/uploadResult/${studentId}`);
    console.log("Request Method:", "POST");
    console.log("Request Headers:", {
      "Content-Type": "multipart/form-data", // Make sure this matches your server's expected content type
      // Add any other headers here if needed
    });

    axios.defaults.withCredentials = true;
    // Make an API request to upload the result file for the specific student
    axios
    .post(`https://smcsserver.vercel.app/uploadResult/${studentId}`, formData)
    .then((response) => {
      // Handle success, e.g., show a success message
      alert("Result uploaded successfully");
    })
    .catch((error) => {
      // Log error details
      console.error("Error uploading result:", error.message);
      console.error("Error code:", error.code);
      console.error("Response status:", error.response.status);
      console.error("Response status text:", error.response.statusText);
      console.error("Response headers:", error.response.headers);
      console.error("Response data:", error.response.data);

      // Handle error, e.g., show an error message
      alert("Error uploading result. See console for details.");
    });
};
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Upload School Results</h2>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs"
      />
      <button
        className="w-full bg-blue-500 text-white px-3 py-1 rounded mt-2"
        onClick={handleUpload}
      >
        Upload Result
      </button>
    </div>
  );
};

export default ResultUploader;
