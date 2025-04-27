import { useState, useEffect } from "react";

const StudentList = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [gradeFilter, setGradeFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Fetch students data from the backend API
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        // Add a `feeStatus` field to each student object
        const studentsWithStatus = data.map((student) => ({
          ...student,
          feeStatus:
            student.amountPaid === 50000
              ? "paid"
              : student.amountPaid > 0
              ? "partial"
              : "pending",
        }));
        setAllStudents(studentsWithStatus);
        setStudents(studentsWithStatus);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Filter students by grade
  useEffect(() => {
    if (gradeFilter === "") {
      setStudents(allStudents);
    } else {
      const filteredStudents = allStudents.filter(
        (student) => student.grade === gradeFilter
      );
      setStudents(filteredStudents);
    }
  }, [gradeFilter, allStudents]);

  // Filter students based on grade and payment status
  const filteredStudents = students.filter((student) => {
    const matchesGrade = !gradeFilter || student.grade === gradeFilter;
    const matchesPayment =
      !paymentFilter || student.feeStatus === paymentFilter;
    return matchesGrade && matchesPayment;
  });

  // Handle payment submission
  const handlePaymentSubmit = (studentId) => {
    if (paymentAmount <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }
    adjustPayment(studentId, paymentAmount);
    setSelectedStudent(null);
  };

  // Simulate payment adjustment (replace with actual API call)
  const adjustPayment = (studentId, amount) => {
    console.log(`Adjusting payment for student ${studentId}: KES ${amount}`);
    // Update the student's payment in the backend and refresh the state
  };

  return (
    <div>
      {/* Grade Filter */}
      <select
        value={gradeFilter}
        onChange={(e) => setGradeFilter(e.target.value)}
      >
        <option value="">All Grades</option>
        <option value="Grade 1">Grade 1</option>
        <option value="Grade 2">Grade 2</option>
        <option value="Grade 3">Grade 3</option>
      </select>

      {/* Payment Status Filter */}
      <select
        value={paymentFilter}
        onChange={(e) => setPaymentFilter(e.target.value)}
      >
        <option value="">All Payment Statuses</option>
        <option value="paid">Paid</option>
        <option value="partial">Partial</option>
        <option value="pending">Pending</option>
      </select>

      {/* Display Students */}
      <table>
        <thead>
          <tr>
            <th>Admission No.</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Amount Paid</th>
            <th>Fee Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.admissionNumber}</td>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>KES {student.amountPaid}</td>
              <td>{student.feeStatus}</td>
              <td>
                {selectedStudent === student.id ? (
                  <div>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      placeholder="Enter amount"
                      min="0"
                    />
                    <button onClick={() => handlePaymentSubmit(student.id)}>
                      Save
                    </button>
                    <button onClick={() => setSelectedStudent(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setSelectedStudent(student.id)}>
                    Adjust Payment
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;