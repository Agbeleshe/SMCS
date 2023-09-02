import React, { useState, useEffect } from "react";
import getRandomAdvice from "./AdviceGenerator";


const HeadProfile = ({ userInfo }) => {
  const [advice, setAdvice] = useState(getRandomAdvice());
  const [resultFile, setResultFile] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.resultFile) {
      setResultFile(userInfo.resultFile);
    }
  }, [userInfo]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setAdvice(getRandomAdvice());
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  if (!userInfo) {
    console.log('student info: ' + userInfo)
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols md:grid-cols-2">
        <div className="md:col-span-full md:mb-5">
          <h1 className="text-2xl md:text-3xl text-center mb-3">
            Welcome to the Student Dashboard, {userInfo.firstName} ! <br />
            <em className="text-sm">
              Life tips: <br /> {advice}...
            </em>
          </h1>
        </div>
       <div>

       {resultFile ? (
          <div className="w-full text-center mt-5">
            <h2 className="text-xl font-semibold mb-2">Result:</h2>
            <a
              href={`http://localhost:3001/downloadResult/${resultFile.filename}`}
              download
              className="text-blue-500 hover:underline"
            >
              Download Result
            </a>
          </div>
        ) : (
          <div className="w-full text-center mt-5">
            <p >No result available yet.</p>
          </div>
        )}

       </div>
        <div className="align-middle justify-center md:text-2xl h-auto w-full flex flex-col text-center md:text-start">
          <h1>
            <span className="font-bold">Full name:</span> {userInfo.firstName},{" "}
            {userInfo.lastName}
          </h1>
          <h3>
            <span className="font-bold">Prefectship:</span>{" "}
            {userInfo.prefectship}
          </h3>
          <h4>
            <span className="font-bold">Level:</span> {userInfo.studentClass}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default HeadProfile;
