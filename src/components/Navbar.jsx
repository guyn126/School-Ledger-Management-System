import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, UserPlus } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      {/* Navbar Brand */}
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand-link">
          <GraduationCap size={24} />
          <span className="brand-text">School Fee Manager</span>
        </Link>
      </div>

      {/* Navbar Links */}
      <div className="navbar-links">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/students" className="nav-link">
            <Users size={20} />
            <span>Student List</span>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/admit" className="nav-link">
            <UserPlus size={20} />
            <span>Admit Student</span>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/reports" className="nav-link">
            Reports
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/settings" className="nav-link">
            Settings
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;