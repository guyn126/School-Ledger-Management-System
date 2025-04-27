import React, { useState, useEffect, useMemo } from 'react';

function Sidebar2({ currentDate, handlePendingFees }) {
  const date = useMemo(() => currentDate ?? new Date(), [currentDate]);
  const [currentTerm, setCurrentTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [blurredTerm, setBlurredTerm] = useState(null);

  useEffect(() => {
    const term = determineTerm(date);
    setCurrentTerm(term);
  }, [date]);

  const determineTerm = (date) => {
    const month = date.getMonth();
    if (month >= 0 && month <= 3) return 'Term 1';
    else if (month >= 4 && month <= 7) return 'Term 2';
    else if (month >= 8 && month <= 10) return 'Term 3';
    else return 'Term 1';
  };

  const handleTermClick = (term) => {
    if (selectedTerm === term) {
      setBlurredTerm(term);
      handlePendingFees(term);
    } else {
      setSelectedTerm(term);
      setBlurredTerm(null);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar2 ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="collapse-toggle2" onClick={toggleCollapse}>
        {isCollapsed ? 'Terms' : 'Collapse'}
      </button>

      <h3 style={{ backgroundColor: 'transparent' }}>
        {isCollapsed ? '' : `Current Term: ${currentTerm}`}
      </h3>

      <ul className={`term-list2 ${isCollapsed ? 'collapsed-list' : ''} ${blurredTerm ? 'blurred' : ''}`}>
        {['Term 1', 'Term 2', 'Term 3'].map(term => (
          <li
            key={term}
            onClick={() => handleTermClick(term)}
            className={`term-item2 ${selectedTerm === term ? 'selected' : ''}`}
          >
            {term === 'Term 2' && date.getMonth() === 3 ? 'Term 2 (Upcoming)' : term}
          </li>
        ))}
      </ul>

      {blurredTerm && (blurredTerm === 'Term 2' || blurredTerm === 'Term 3') && (
        <p className="upcoming2">⚠️ {blurredTerm} is upcoming. All fees set to pending.</p>
      )}
    </div>
  );
}

export default Sidebar2;
