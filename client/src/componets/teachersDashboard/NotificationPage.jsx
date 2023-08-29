import React from "react";
import students from "./DemoData";

const NotificationPage = () => {
  const handleStudentView = (student) => {
    console.log(student.firstName + " is clicked");
  };

  return (
    <div className="h-auto min-h-screen mb-5 w-[80%] mx-auto">
       <table className="table w-full">
              {/* head */}
              

              <thead className=" sticky top-0 bg-black text-white">
                <tr>
                  <th>Image</th>
                  <th> Name</th>
                  <th>Sex</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {students.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => handleStudentView(student)}
                    className="bg-gray-200 hover:bg-gray-300 cursor-pointer"
                  >
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="https://trinitymodel.donschools.com/images/help/student.jpg"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{student.firstName}</td>
                    <td>{student.sex}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">
                        {student.class}
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
    </div>
  );
};

export default NotificationPage;
