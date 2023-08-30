import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { SignupProvider } from "./context/SignupProvider";

import Nav from "./componets/aStruc/Nav";
import Footer from "./componets/aStruc/Footer";
import Index from "./componets/indexPage/Index";
import StudentInfo from "./componets/studentDashboard/StudentInfo";
import TeacherIndex from "./componets/teachersDashboard/TeacherIndex";
import NotificationPage from "./componets/teachersDashboard/NotificationPage";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/StudentDashboard" element={<StudentInfo />} />

        {/* Admin dashboard */}
        <Route path="/adminDashboard" element={<TeacherIndex />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
