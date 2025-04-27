import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Settings = () => {
  // State for Date of the Year
  const [dateOfYear, setDateOfYear] = useState(new Date());
  
  // Function to update date every 24 hours
  const updateDate = () => {
    const newDate = new Date();
    setDateOfYear(newDate);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateDate();
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="settings"
    >
      <h1>Settings</h1>
      
      <div className="settings-card">
        <h2>Application Settings</h2>
        
        <div className="setting-item">
          <label>Theme</label>
          <select>
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>
        
        <div className="setting-item">
          <label>Notifications</label>
          <input type="checkbox" defaultChecked />
        </div>
        
        <div className="setting-item">
          <label>Data Backup</label>
          <button className="backup-button">Export Data</button>
        </div>
        
        <div className="setting-item">
          <label>Reset Data</label>
          <button className="reset-button">Clear All Data</button>
        </div>

        {/* Date of the Year Section */}
        <div className="setting-item">
          <label>Date of the Year</label>
          <div>{dateOfYear.toDateString()}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
