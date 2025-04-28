import React, { useState, useEffect } from 'react';

const Settings = ({ handleTermChange, settingsTerm }) => {
  const [dateOfYear, setDateOfYear] = useState(new Date());
  const [students, setStudents] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(() => {
    return localStorage.getItem('selectedTerm') || settingsTerm;
  });
  const [termUpdateMessage, setTermUpdateMessage] = useState('');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const updateDate = () => {
    const newDate = new Date();
    setDateOfYear(newDate);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateDate();
    }, 24 * 60 * 60 * 1000); // Update daily

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/Term1')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students data:', error));
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  };

  const handleTermChangeInternal = (e) => {
    const term = e.target.value;
    setSelectedTerm(term);
    console.log(term);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleTermChange(selectedTerm);
    localStorage.setItem('selectedTerm', selectedTerm);

    setTermUpdateMessage('Term updated successfully!');
    setTimeout(() => setTermUpdateMessage(''), 3000);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(students, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'student-data.json';
    link.click();
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="settings-card">
        <h2>Application Settings</h2>

        <div className="setting-item">
          <label>Notifications</label>
          <input type="checkbox" defaultChecked />
        </div>
        
        <div className="setting-item">
          <label>Data Backup</label>
          <button className="backup-button" onClick={handleExportData}>Export Data</button>
        </div>

        <div className="setting-item">
          <label>Date of the Year</label>
          <div>{dateOfYear.toDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;