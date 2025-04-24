import { useState } from 'react';
import { Trash2, DollarSign } from 'lucide-react';
import { useStudents } from '../components/StudentContext';

export default function StudentList() {
  const { students, deleteStudent, adjustPayment } = useStudents();
  const [gradeFilter, setGradeFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const filteredStudents = students.filter(student => {
    const matchesGrade = !gradeFilter || student.grade === gradeFilter;
    const matchesPayment = !paymentFilter || student.paymentStatus === paymentFilter;
    return matchesGrade && matchesPayment;
  });

  const handlePaymentSubmit = (studentId) => {
    if (paymentAmount <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }
    adjustPayment(studentId, paymentAmount);
    setSelectedStudent(null);
    setPaymentAmount(0);
  };

  return (
    <div className="student-list">
      <div className="filters">
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="grade-filter"
        >
          <option value="">All Grades</option>
          <option value="Grade 1">Grade 1</option>
          <option value="Grade 2">Grade 2</option>
          <option value="Grade 3">Grade 3</option>
        </select>
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="payment-filter"
        >
          <option value="">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Admission No.</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Amount Paid</th>
              <th>Balance</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.admissionNumber}</td>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.amountPaid}</td>
                <td>{student.totalFees - student.amountPaid}</td>
                <td>{student.paymentStatus}</td>
                <td>
                  <div>
                    {selectedStudent === student.id ? (
                      <div>
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(Number(e.target.value))}
                          className="payment-input"
                          placeholder="Amount"
                        />
                        <button
                          onClick={() => handlePaymentSubmit(student.id)}
                          className="save-btn"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setSelectedStudent(null)}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedStudent(student.id)}
                        className="adjust-btn"
                      >
                        <DollarSign />
                      </button>
                    )}
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="delete-btn"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
