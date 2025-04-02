import React, { useState } from "react";
import EnrollPopup from "./EnrollPopup"; // Import the popup form component
import es from "./EnquiryTable.module.css"; // Import CSS file

const EnquiryTable = ({ enquiries }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [popupMode, setPopupMode] = useState(""); // "view" or "enroll"


  const handleViewClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setPopupMode("view");
    setIsPopupOpen(true);
  };

  const handleEnrollClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setPopupMode("enroll");
    setIsPopupOpen(true);
  };

  const handlemarkcontackted=(id)=>{


    //to write code to update status
  }
  return (
    <div className={es["table-container"]}>
      <input
        type="text"
        placeholder="Search enquiries..."
        className={es["search-box"]}
      />
      <table className={es["enquiry-table"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Program</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry, index) => (
            <tr key={index}>
              <td>{enquiry.id}</td>
              <td>{enquiry.name}</td>
              <td>{enquiry.contact}</td>
              <td>{enquiry.program}</td>
              <td>{enquiry.date}</td>
              <td>
                <span className={`${es.status} ${es[enquiry.status.toLowerCase()]}`}>
                  {enquiry.status}
                </span>
              </td>
              <td className={es["action-buttons"]}>
                  <button className={es["view-btn"]} onClick={() => handleViewClick(enquiry)}>
                  View
                </button>
                {enquiry.status === "New" && (
                  <button onClick={()=>handlemarkcontackted(enquiry.id)} className={es["contact-btn"]}>Mark Contacted</button>
                )}
                {enquiry.status !== "Enrolled" && (
                  <button
                    className={es["enroll-btn"]}
                    onClick={() => handleEnrollClick(enquiry)}
                  >
                    Enroll
                  </button>
                )}
                <button className={es["close-btn"]}>Close</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Enroll Popup */}
      {isPopupOpen && (
        <EnrollPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          enquiry={selectedEnquiry}
          mode={popupMode} // Pass mode to distinguish between view and enroll
        />
      )}
    </div>
  );
};

export default EnquiryTable;
