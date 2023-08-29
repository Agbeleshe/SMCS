import React, { useEffect, useState } from "react";
import axios from 'axios';
import About from "./About";
import HeadProfile from "./HeadProfile";
import MoreInfo from "./ContactCounselor";

const StudentInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Get user's email from localStorage or your authentication context
    const userEmail = localStorage.getItem("userEmail");

    // Fetch user information using the stored email
    axios
      .post("http://localhost:3001/fetchUserInfo", { email: userEmail })
      .then((result) => {
        setUserInfo(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-base-200 pt-28 md:w-[80%] md:m-auto w-[90%] m-auto h-auto">
      <div className="flex flex-col">
        {console.log(userInfo)}
        <HeadProfile userInfo={userInfo} /> {/* Pass user info to HeadProfile */}
        <MoreInfo userInfo={userInfo} /> {/* Pass user info to MoreInfo */}
        <About userInfo={userInfo} /> {/* Pass user info to About */}
      </div>
    </div>
  );
};

export default StudentInfo;
