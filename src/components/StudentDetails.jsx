import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles.css'; // Import the CSS file from the parent directory

const StudentDetails = ({ student, setSelectedStudent, updateStudentFee }) => {
  const [newAmountPaid, setNewAmountPaid] = useState(student.amountPaid);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure newAmountPaid is converted to a number
    updateStudentFee(student.id, parseInt(newAmountPaid, 10));
    setSelectedStudent(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="student-details"
    >
      <h2>Student Details</h2>
      
      <div className="close-button" onClick={() => setSelectedStudent(null)}>
        &times;
      </div>
      
      <div className="detail-group">
        <label>Name:</label>
        <p>{student.name}</p>
      </div>
      
      <div className="detail-group">
        <label>Admission Number:</label>
        <p>{student.admissionNumber}</p>
      </div>
      
      <div className="detail-group">
        <label>Grade:</label>
        <p>{student.grade}</p>
      </div>
      
      <div className="detail-group">
        <label>Fee Status:</label>
        <p>{student.feeStatus}</p>
      </div>
      
      <div className="detail-group">
        <label>Amount Paid:</label>
        <p>{student.amountPaid}</p>
      </div>
      
      <div className="detail-group">
        <label>Term:</label>
        <p>{student.term}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="update-fee-form">
        <div className="form-group">
          <label>New Amount Paid:</label>
          <input
            type="number"
            value={newAmountPaid}
            onChange={(e) => setNewAmountPaid(e.target.value)}
            placeholder="Enter new amount paid"
            required
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="update-button"
        >
          Update Fee
        </motion.button>
      </form>
    </motion.div>
  );
};

export default StudentDetails;