import "./DateFilterComponent.css";

const DateFilterComponent = ({ selectedDate, setSelectedDate, filter, setFilter,setclassDay,onclickingClassDay,onclickingNoClassDay,onclickingPrint,classDay, dbs }) => {
  const navigateDate = (direction) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (dbs === "payments") {
        // Change by month
        newDate.setMonth(direction === "prev" ? newDate.getMonth() - 1 : newDate.getMonth() + 1);
        newDate.setDate(1); // Always set to first day of the month
      } else {
        // Change by day
        newDate.setDate(direction === "prev" ? newDate.getDate() - 1 : newDate.getDate() + 1);
      }
      return newDate;
    });
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    console.log("in filter page ",value)
    if (dbs === "payments") {
      const [year, month] = value.split("-");
      setSelectedDate(new Date(parseInt(year), parseInt(month) - 1, 1));
    } else {
      setSelectedDate(new Date(value));
    }
  };
  console.log("test1",selectedDate.toISOString().split("T")[0])

  console.log("test1",new Date().toISOString().split("T")[0])
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
const istNow = new Date(now);

const yyyy = istNow.getFullYear();
const mm = String(istNow.getMonth() + 1).padStart(2, "0");
const dd = String(istNow.getDate()).padStart(2, "0");

const istDateInput = `${yyyy}-${mm}-${dd}`;
 // "2025-05-20"

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

      {dbs == "payments" ? (
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
