import React, { useState } from "react";
import EnrollPopup from "./EnrollPopup"; // Import the popup form component
import es from "./EnquiryTable.module.css"; // Import CSS file

const EnquiryTable = ({ data, dataType }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupMode, setPopupMode] = useState(""); // "view" or "enroll"

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setPopupMode("view");
    setIsPopupOpen(true);
  };

  const handleEnrollClick = (item) => {
    setSelectedItem(item);
    setPopupMode("enroll");
    setIsPopupOpen(true);
  };

  const handleMarkContacted = (id) => {
    // Code to update the status of an enquiry
    console.log(`Marking enquiry with ID ${id} as contacted`);
  };

  return (
    <div className={es["table-container"]}>
      <input
        type="text"
        placeholder={`Search ${dataType}...`}
        className={es["search-box"]}
      />
      <table className={es["enquiry-table"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            {dataType === "enquiry" ? (
              <>
                <th>Program</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </>
            ) : (
              <>
                <th>Father name</th>
                <th>Mother name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Fees</th>
              </>
            )}
          
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.contact}</td>
              {dataType === "enquiry" ? (
                <>
                  <td>{item.program}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`${es.status} ${es[item.status.toLowerCase()]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className={es["action-buttons"]}>
                <button className={es["view-btn"]} onClick={() => handleViewClick(item)}>
                  View
                </button>
                {dataType === "enquiries" && item.status === "New" && (
                  <button
                    onClick={() => handleMarkContacted(item.id)}
                    className={es["contact-btn"]}
                  >
                    Mark Contacted
                  </button>
                )}
                {dataType === "enquiries" && item.status !== "Enrolled" && (
                  <button className={es["enroll-btn"]} onClick={() => handleEnrollClick(item)}>
                    Enroll
                  </button>
                )}
                <button className={es["close-btn"]}>Close</button>
              </td>
                </>
              ) : (
                <>
                  <td>{item.father_name}</td>
                  <td>{item.mother_name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.monthly_fee}</td>
                </>
              )}
          
            </tr>
          ))}
        </tbody>
      </table>

      {/* Enroll Popup */}
      {isPopupOpen && (
        <EnrollPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          enquiry={selectedItem}
          mode={popupMode} // Pass mode to distinguish between view and enroll
        />
      )}
    </div>
  );
};

export default EnquiryTable;
