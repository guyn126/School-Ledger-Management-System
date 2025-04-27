import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteConfirmation from './DeleteConfirmation';
import StudentTable from './StudentTable';
import Sidebar from './Sidebar';
import Sidebar2 from './Sidebar2'; // Import Sidebar2

const StudentList = ({ deleteStudent, currentDate }) => {
  const [allStudents, setAllStudents] = useState([]); 
  const [students, setStudents] = useState([]);       
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [gradeFilter, setGradeFilter] = useState('');
  const [blurred, setBlurred] = useState(false); 

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        const studentsWithStatus = data.map(student => ({
          ...student,
          feeStatus: student.amountPaid === 50000 ? 'paid' : student.amountPaid > 0 ? 'partial' : 'pending'
        }));
        setAllStudents(studentsWithStatus);
        setStudents(studentsWithStatus); 
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (gradeFilter === '') {
      setStudents(allStudents); 
    } else {
      const filteredStudents = allStudents.filter(student => student.grade === gradeFilter);
      setStudents(filteredStudents);
    }
  }, [gradeFilter, allStudents]);

  const handleDelete = (student) => {
    setStudentToDelete(student);
  };

  const confirmDelete = () => {
    deleteStudent(studentToDelete.id);
    setAllStudents(prev => prev.filter(student => student.id !== studentToDelete.id));
    setStudents(prev => prev.filter(student => student.id !== studentToDelete.id));
    setStudentToDelete(null);
  };

  const cancelDelete = () => {
    setStudentToDelete(null);
  };

  const handleUpdateFee = (id, newAmountPaid) => {
    const feeStatus =
      newAmountPaid === 50000
        ? 'paid'
        : newAmountPaid > 0
        ? 'partial'
        : 'pending';

    const updated = allStudents.map(student => {
      if (student.id === id) {
        return { ...student, amountPaid: newAmountPaid, feeStatus };
      }
      return student;
    });

    setAllStudents(updated);
    setStudents(updated);

    fetch(`http://localhost:5000/students/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountPaid: newAmountPaid, feeStatus: feeStatus }),
    })
      .then(res => res.json())
      .then(data => console.log("Updated student fee and status:", data))
      .catch(err => console.error("Update fee error:", err));
  };

  const calculateDeficit = (amountPaid) => {
    const totalFee = 50000;
    return totalFee - amountPaid;
  };

  const handlePendingFees = (term) => {
    const updatedStudents = students.map(student => ({
      ...student,
      feeStatus: 'pending' 
    }));
    setStudents(updatedStudents); 
    setBlurred(true); 
  };

  const summary = useMemo(() => {
    const totalFee = 50000;
    const totalExpected = students.length * totalFee;
    const fullyPaid = students.filter(s => s.feeStatus === 'paid').reduce((sum, s) => sum + s.amountPaid, 0);
    const partiallyPaid = students.filter(s => s.feeStatus === 'partial').reduce((sum, s) => sum + s.amountPaid, 0);
    const totalPaid = fullyPaid + partiallyPaid;
    const totalPending = totalExpected - totalPaid;

    return {
      totalExpected,
      fullyPaid,
      partiallyPaid,
      totalPending
    };
  }, [students]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="student-list-container"
    >
      <div className="sidebar-container">
        <Sidebar handleGradeFilter={setGradeFilter} />
        <Sidebar2 currentDate={new Date()} handlePendingFees={handlePendingFees} setBlurred={setBlurred} />
      </div>

      <div className="student-list-content">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Student Records ({students.length})
        </motion.h2>

        {/* Summary Section */}
        <motion.div 
          className="summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            marginBottom: '1rem',
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '10px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}
        >
          <div><strong>Total Expected:</strong> KES {summary.totalExpected.toLocaleString()}</div>
          <div><strong>Fully Paid:</strong> KES {summary.fullyPaid.toLocaleString()}</div>
          <div><strong>Partially Paid:</strong> KES {summary.partiallyPaid.toLocaleString()}</div>
          <div><strong>Pending:</strong> KES {summary.totalPending.toLocaleString()}</div>
        </motion.div>

        <AnimatePresence>
          {students.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="no-students"
            >
              No students found. Add some students to get started.
            </motion.p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <StudentTable 
                students={students} 
                handleDelete={handleDelete}
                updateStudentFee={handleUpdateFee}
                calculateDeficit={calculateDeficit}
                blurred={blurred}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {studentToDelete && (
            <DeleteConfirmation
              student={studentToDelete}
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StudentList;
