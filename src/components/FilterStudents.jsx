import { toast } from 'react-toastify';

const FilterStudents = ({ filter, setFilter, students, setSelectedStudent }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilter({
      admissionNumber: '',
      grade: '',
      feeStatus: ''
    });
    setSelectedStudent(null);
  };

  const handleSearch = () => {
    const { admissionNumber, grade } = filter;
    if (!admissionNumber.trim()) {
      toast.info("Please enter an admission number.");
      return;
    }

    // Check if the grade is valid for the admission number
    const matchedStudent = students.find(
      student => student.admissionNumber.toLowerCase() === admissionNumber.trim().toLowerCase()
    );

    if (matchedStudent) {
      if (matchedStudent.grade !== grade) {
        toast.error(`Student's grade does not match! Expected Grade ${matchedStudent.grade}, but got Grade ${grade}.`);
      } else {
        setSelectedStudent(matchedStudent);
        toast.success("Student found!");
      }
    } else {
      setSelectedStudent(null);
      toast.warning("Student not found. Please add them to the system.");
    }
  };

  return (
    <div className="filter-students">
      <h2>🎯 Find Student</h2>

      {/* Admission number with search button */}
      <div className="filter-group admission-group">
        <label>Admission Number:</label>
        <div className="search-row">
          <input
            type="text"
            name="admissionNumber"
            value={filter.admissionNumber}
            onChange={handleChange}
            placeholder="Search by admission number"
          />
          <button onClick={handleSearch} className="search-btn">Search</button>
        </div>
      </div>

      {/* Grade Filter */}
      <div className="filter-group">
        <label>Grade:</label>
        <select
          name="grade"
          value={filter.grade}
          onChange={handleChange}
        >
          <option value="">All Grades</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
            <option key={grade} value={`Grade ${grade}`}>Grade {grade}</option>
          ))}
        </select>
      </div>

      {/* Fee Status Filter */}
      <div className="filter-group">
        <label>Fee Status:</label>
        <select
          name="feeStatus"
          value={filter.feeStatus}
          onChange={handleChange}
        >
          <option value="">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="partial">Partial</option>
        </select>
      </div>

      <button onClick={clearFilters} className="clear-filters clear-filters-btn">
        Clear Filters
      </button>
    </div>
  );
};

export default FilterStudents;
