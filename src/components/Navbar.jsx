import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { GraduationCap, Users, UserPlus } from 'lucide-react';
import { useTheme } from '../ThemeContext'; // Add dark mode


const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme(); // Add button

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="navbar-brand">School Fee Tracker</div>
      <div className="navbar-links">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>

          <Link to="/studentlist" className="nav-link"> 
            <Users size={20} />
            <span>Student List</span>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="nav-link"> {/* corrigé ici */}
            <UserPlus size={20} />
            <span>Admit Student</span>
          </Link>

          <Link to="/" className="nav-link">Dashboard</Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/studentlist" className="nav-link">Student List</Link>

        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/reports" className="nav-link">Reports</Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/settings" className="nav-link">Settings</Link>
        </motion.div>

        {/* Dark Mode Toggle Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button onClick={toggleTheme} className="nav-link" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
