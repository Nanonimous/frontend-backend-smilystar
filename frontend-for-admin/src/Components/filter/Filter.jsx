import { useState } from "react";
import "./DateFilterComponent.css";

const DateFilterComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("all");

  const navigateDay = (direction) => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(direction === 'prev' ? newDate.getDate() - 1 : newDate.getDate() + 1);
      return newDate;
    });
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <div className="date-filter-container">
      <div className="date-picker">
        <button onClick={() => navigateDay('prev')} className="nav-button">◀</button>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={handleDateChange}
          className="date-input"
        />
        <button onClick={() => navigateDay('next')} className="nav-button">▶</button>
      </div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
        <option value="all">All Students</option>
        <option value="present">Present Only</option>
        <option value="absent">Absent Only</option>
      </select>
    </div>
  );
};

export default DateFilterComponent;
