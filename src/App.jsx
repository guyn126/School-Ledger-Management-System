import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from '../pages/Dashboard';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import StudentList from './components/StudentList';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

// 🔥 AJOUT : Importer le ThemeProvider
import { ThemeProvider } from './ThemeContext';

const API_BASE_URL = "http://localhost:3000";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const savedStudents = localStorage.getItem('students');
        let studentsData = [];

        if (savedStudents) {
          studentsData = JSON.parse(savedStudents);
        } else {
          const response = await fetch(`${API_BASE_URL}/students`);
          studentsData = await response.json();
          localStorage.setItem('students', JSON.stringify(studentsData));
        }

        const studentsWithStatus = studentsData.map(student => ({
          ...student,
          feeStatus: student.amountPaid === 50000 ? 'paid' : student.amountPaid > 0 ? 'partial' : 'pending'
        }));
        
        setStudents(studentsWithStatus);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Function to add a new student
  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  // Function to delete a student
  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Function to update a student's fee payment
  const updateStudentFee = async (studentId, newAmountPaid) => {
    const amountPaid = parseInt(newAmountPaid, 10);
    const updatedStudents = [...students];
    const studentIndex = updatedStudents.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
      console.error(`Student with ID ${studentId} not found`);
      return;
    }

    updatedStudents[studentIndex] = {
      ...updatedStudents[studentIndex],
      amountPaid,
      feeStatus: amountPaid === 50000 ? 'paid' : amountPaid > 0 ? 'partial' : 'pending'
    };

    setStudents(updatedStudents);

    try {
      const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amountPaid,
          feeStatus: updatedStudents[studentIndex].feeStatus
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log("Updated student fee:", await response.json());
    } catch (err) {
      console.error("Update fee error:", err);
      setStudents(students);
    }
  };

  // Function to update a student's details
  const updateStudent = (updatedStudent) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  if (loading) {
    return <div>Loading students...</div>; // Fallback loading state
  }

  return (
    // Add to the them provider
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={
                <Dashboard 
                  students={students} 
                  addStudent={addStudent} 
                  deleteStudent={deleteStudent} 
                  updateStudentFee={updateStudentFee}
                  updateStudent={updateStudent}
                />
              } />
              <Route path="/reports" element={<Reports students={students} />} />
              <Route path="/settings" element={<Settings />} />
              <Route 
                path="/studentlist"  
                element={
                  <StudentList 
                    students={students} 
                    deleteStudent={deleteStudent}
                    updateStudent={updateStudent}
                  />
                }
              />
            </Routes>
          </div>
        </div>
        {/* Add ToastContainer */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </ThemeProvider>
  );
}

export default App;