import { GraduationCap, Users, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <GraduationCap size={24} />
          <span className="brand-text">School Fee Manager</span>
        </Link>
        <div className="navbar-links">
          <Link to="/students" className="navbar-link">
            <Users size={20} />
            <span>Student List</span>
          </Link>
          <Link to="/admit" className="navbar-link">
            <UserPlus size={20} />
            <span>Admit Student</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
