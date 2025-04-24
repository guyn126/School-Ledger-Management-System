import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdmitStudent({ onAdmitStudent }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    admissionNumber: '',
    name: '',
    grade: '',
    amountPaid: 0,
    totalFees: 50000,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentStatus =
      formData.amountPaid >= formData.totalFees
        ? 'Paid'
        : formData.amountPaid > 0
        ? 'Partial'
        : 'Unpaid';

    onAdmitStudent({
      ...formData,
      paymentStatus,
    });
    navigate('/students');
  };

  return (
    <form onSubmit={handleSubmit} className="admit-form">
      <div className="form-group">
        <label>
          <b>Admission Number</b>
          <input
            type="text"
            required
            value={formData.admissionNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, admissionNumber: e.target.value }))}
            className="form-input"
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          <b>Student Name</b>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="form-input"
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          <b>Grade</b>
          <select
            required
            value={formData.grade}
            onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
            className="form-input"
          >
            <option value="">Select Grade</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          <b>Amount Paid (KES)</b>
          <input
            type="number"
            required
            min="0"
            value={formData.amountPaid}
            onChange={(e) => setFormData(prev => ({ ...prev, amountPaid: Number(e.target.value) }))}
            className="form-input"
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          <b>Total Fees (KES)</b>
          <input
            type="number"
            required
            min="0"
            value={formData.totalFees}
            onChange={(e) => setFormData(prev => ({ ...prev, totalFees: Number(e.target.value) }))}
            className="form-input"
          />
        </label>
      </div>

      <button type="submit" className="submit-btn">
        <b>Admit Student</b>
      </button>
    </form>
  );
}
