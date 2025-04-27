import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ handleGradeFilter }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const grades = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`);

  const toggleSidebar = () => setIsExpanded(prev => !prev);

  return (
    <motion.div
      animate={{ height: isExpanded ? 'auto' : 50 }} // Smooth collapse/expand based on height
      transition={{ duration: 0.6, ease: "easeInOut" }} // Longer duration with easing for smoothness
      className={`sidebar ${!isExpanded ? 'collapsed' : ''}`}
      style={{ padding: isExpanded ? '1rem' : '0.5rem' }}
    >
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="expanded-sidebar"
          >
            <div className="sidebar-header">
              <h3>Grades</h3>
              <button className="collapse-btn" onClick={toggleSidebar}>
                ❌
              </button>
            </div>
            <ul className="grade-list">
              {grades.map((grade) => (
                <motion.li
                  key={grade}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGradeFilter(grade)} // Pass grade to handleGradeFilter
                  className="grade-item"
                >
                  {grade}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="collapsed-sidebar"
          >
            <div className="collapsed-header">
              <button className="expand-btn" onClick={toggleSidebar}>
                Grades
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;
