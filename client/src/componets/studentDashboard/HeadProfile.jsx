import React, { useState, useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
import getRandomAdvice from "./AdviceGenerator";
import ResultUploader from "./ResultUploader";

const HeadProfile = ({ userInfo }) => {
  const [advice, setAdvice] = useState(getRandomAdvice());
  // const storedImageUrl = localStorage.getItem("userImage");
  // const [selectedImage, setSelectedImage] = useState(storedImageUrl || null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAdvice(getRandomAdvice());
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  // const handleImageChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   const sanitizedEmail = userInfo.email.replace(/[^a-zA-Z0-9]/g, "_");
  //   const uniqueFilename = `${sanitizedEmail}_profile.jpg`;

  //   const formData = new FormData();
  //   formData.append("profileImage", selectedFile);
  //   formData.append("email", userInfo.email);

  //   fetch("http://localhost:3001/uploadProfileImage", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Profile image uploaded:", data);
  //       setSelectedImage(data.profileImage);
  //       localStorage.setItem("userImage", data.profileImage);
  //     })
  //     .catch((error) => {
  //       console.error("Error uploading profile image:", error);
  //     });
  // };

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  // const sanitizedEmail = userInfo.email.replace(/[^a-zA-Z0-9]/g, "_");
  // const imageUrl = `http://localhost:3001/profileImages/${sanitizedEmail}_profile.jpg`;
  // console.log("Constructed image URL:", imageUrl);
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
        <div className="w-full justify-center items-center flex cursor-pointer">
          {/* <label htmlFor="imageInput">
            <img
              src={imageUrl}
              alt="student image"
              className="h-32 w-32 md:h-[250px] md:w-[250px] rounded-full border-black border-2"
            />

            <div className="relative">
              <div className="btn absolute -top-20 -left-7 md:-top-40 bg-black text-white px-2 w-auto min-w-max border-none hover:bg-black md:h-10 flex text-[10px]">
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <MdAddAPhoto /> Edit
              </div>
            </div>
          </label> */}
          <div className="w-[60%] mx-auto mb-5 text-center justify-center" >
          <ResultUploader userInfo={userInfo} />
          </div>
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
            <span className="font-bold">Class:</span> {userInfo.studentClass}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default HeadProfile;
