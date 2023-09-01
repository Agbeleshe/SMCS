import React, { useState } from "react";
import axios from "axios";

const ResultUploader = ({ userInfo }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("resultFile", selectedFile);
    formData.append("email", userInfo.email);
    console.log("this is the form data: ", formData);
    console.log("this is the selected file: ", selectedFile); // Add this line
    fetch("https://smcsserver.vercel.app/uploadResult", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // If response is successful, parse the JSON data
        } else {
          throw new Error("Error uploading result file"); // Throw an error for non-200 responses
        }
      })
      .then((data) => {
        console.log("Result file uploaded:", data);
        alert("Success");
        // Update the UI or perform any necessary actions with the response data
      })
      .catch((error) => {
        alert("Error uploading result file");
        console.error("Error uploading result file:", error);
        // Handle the error, such as displaying an error message to the user
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
