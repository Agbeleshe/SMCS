import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultUploader from "./ResultUploader";

const TeacherIndex = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student

  const handleStudentView = (student) => {
    setSelectedStudent(student); // Set the selected student when clicked
  };

  const closeModal = () => {
    setSelectedStudent(null); // Clear the selected student when closing modal
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("https://smcsserver.vercel.app/getAllStudents")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <div className=" h-auto min-h-screen mb-5 w-[80%] mx-auto">
      <div className="pt-28 gap-10  flex flex-col md:flex-row">
        <div className="justify-center text-left flex flex-col items-center  mb-10">
          <div className="">
            <h1 className="mb-5 text-2xl md:text-3xl md:font-extralight">
              Hello
            </h1>
            <h1 className="font-semibold mb-2">
              Welcome to the Counselor/Admin Dashboard!
            </h1>
            <p>
              <span className="md:hidden mr-3">
                Every information you need to know about students is below you.
              </span>
              <span className="hidden md:block mr-3">
                Every information you need to know about students is to your
                right.
              </span>
              <span>
                Click the on students to find out everything about selected
                candidates and reach out to them through their notification by
                sending a message.
              </span>
            </p>
          </div>
        </div>

        <div className=" bg-yellow rounded-xl flex-2 w-full max-h-80 md:max-h-screen overflow-y-scroll ">
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead className=" sticky top-0 bg-black text-white">
                <tr>
                  <th> Name</th>
                  <th>Sex</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {students.length === 0 ? (
                  <p>Loading...</p>
                ) : (
                  students.map((student) => (
                    <tr
                      key={student._id}
                      onClick={() => handleStudentView(student)}
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    >
                      <td>{student.firstName}</td>
                      <td>{student.gender}</td>
                      <td>
                        <button className="btn btn-ghost btn-xs">
                          {student.studentClass}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

              {/* foot */}
            </table>
            {/* Modal */}
            {selectedStudent && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg max-w-lg">
                  <button
                    className="w-full font-extrabold   md:text-3xl mr-5 text-right top-2 right-0"
                    onClick={closeModal}
                  >
                    X
                  </button>
                  {/* Display student information */}
                  <div className="-mt-5 gap-3">
                    <h2 className="text-lg font-semibold">
                      {selectedStudent.firstName} {selectedStudent.lastName}
                    </h2>
                    <p>Email: {selectedStudent.email}</p>
                    <p>Age: {selectedStudent.age}</p>
                    <p>Sponsor: {selectedStudent.sponsor}</p>
                    <p>Ambition: {selectedStudent.ambition}</p>
                    <p>Leadership Position: {selectedStudent.prefectship}</p>
                    <p>Student Level: {selectedStudent.studentClass}</p>
                    <p>Gender: {selectedStudent.gender}</p>
                    <p>Hobbies: {selectedStudent.hobbies}</p>
                    <p>State of Origin: {selectedStudent.stateOfOrigin}</p>
                    <p>Fun Fact: {selectedStudent.funFact}</p>
                    <div className="mt2">
                    <ResultUploader studentId={selectedStudent._id} />

                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherIndex;
