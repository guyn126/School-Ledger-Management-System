import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StudentProvider } from './components/StudentContext';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import AdmitStudent from './components/AdmitStudent';
import './App.css';

function App() {
  return (
    <StudentProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/students" element={<StudentList />} />
            <Route
              path="/admit"
              element={
                <AdmitStudent
                  onAdmitStudent={(newStudent) => {
                    // Handle student admission logic here, like adding the student
                    console.log('New Student:', newStudent);
                  }}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </StudentProvider>
  );
}

export default App;
