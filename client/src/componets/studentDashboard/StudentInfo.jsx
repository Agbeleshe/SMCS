import React, { useState, useEffect } from "react";
import axios from "axios";
import HeadProfile from "./HeadProfile";
import MoreInfo from "./ContactCounselor";
import About from "./About";

const StudentInfo = () => {
  const [userInfo, setUserInfo] = useState(null);


  axios.defaults.withCredentials = true;
  useEffect(() => {
    // Get user's email from localStorage
    const userEmail = localStorage.getItem("userEmail");

    // Fetch user information using the stored email
    axios.post("https://smcsserver.vercel.app/fetchUserInfo", { email: userEmail })
      .then((result) => {
        setUserInfo(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-base-200 pt-28 md:w-[80%] md:m-auto w-[90%] m-auto h-auto">
      <div className="flex flex-col">
        {userInfo ? (
          <>
            <HeadProfile userInfo={userInfo} />
            <MoreInfo userInfo={userInfo} />
            <About userInfo={userInfo} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default StudentInfo;
