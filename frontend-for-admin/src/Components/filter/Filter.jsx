import "./DateFilterComponent.css";

const DateFilterComponent = ({ selectedDate, setSelectedDate, filter, setFilter,setclassDay,onclickingClassDay,onclickingNoClassDay,onclickingPrint,classDay, dbs }) => {
const navigateDate = (direction) => {
  setSelectedDate((prevDate) => {
    if (dbs === "payments") {
      const year = prevDate.getFullYear();
      const month = prevDate.getMonth();

      const newMonth = direction === "prev" ? month - 1 : month + 1;
      return new Date(year, newMonth, 2); // Set day to 1, ignore previous day
    } else {
      const newDate = new Date(prevDate);
      newDate.setDate(direction === "prev" ? newDate.getDate() - 1 : newDate.getDate() + 1);
      return newDate;
    }
  });
};


const handleDateChange = (event) => {
  const value = event.target.value;

  if (dbs === "payments") {
    const [year, month] = value.split("-");
    setSelectedDate(new Date(parseInt(year), parseInt(month) - 1, 2)); // Always set day = 1
  } else {
    setSelectedDate(new Date(value)); // Date input includes full date
  }
};
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
const istNow = new Date(now);

const yyyy = istNow.getFullYear();
const mm = String(istNow.getMonth() + 1).padStart(2, "0");
const dd = String(istNow.getDate()).padStart(2, "0");

const istDateInput = `${yyyy}-${mm}-${dd}`;

  return (
    <div className="date-filter-container">
      <div className="date-picker">
        <button onClick={() => navigateDate("prev")} className="nav-button">◀</button>

        <input
          type={dbs === "payments" ? "month" : "date"}
            value={
              dbs === "payments"
                ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`
                : selectedDate.toISOString().split("T")[0]
            }

          onChange={handleDateChange}
          className="date-input"
        />

        <button onClick={() => navigateDate("next")} className="nav-button">▶</button>
      </div>
      <div className="left-side">
          {dbs === "payments" && (
        <button
        className="nav-button-class"
        onClick={onclickingPrint}
        >
        print recipt
        </button>
        )}

        {dbs === "attendance" && (
        <button
        className="nav-button-class"
        onClick={onclickingPrint}
        >
        generate recipt
        </button>
        )}


        {dbs === "attendance" && (istDateInput == selectedDate.toISOString().split("T")[0] )? (
        <button
        className="nav-button-class"
        disabled={classDay}
        onClick={() => {
        onclickingClassDay();
        }}
        >
        Class Day
        </button>
        ):""}

 

        {dbs === "attendance" && (istDateInput == selectedDate.toISOString().split("T")[0]) ? (
        <button
        className="nav-button-class"
        disabled={!classDay}
        onClick={() => {
        onclickingNoClassDay();
        }}
        >
        No Class Day
        </button>
        ):""}

      {dbs === "payments" ? (
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
        <option value="all">All Students</option>
        <option value="paid">paid</option>
        <option value="unpaid">not paid</option>
      </select>

      ) :(
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
        <option value="all">All Students</option>
        <option value="present">Present Only</option>
        <option value="absent">Absent Only</option>
      </select>
      )}
      </div>
          
    </div>
  );
};

export default DateFilterComponent;
