import React, { useState } from "react";
import EnrollPopup from "./EnrollPopup"; // Import the popup form component
import es from "./EnquiryTable.module.css"; // Import CSS file

const EnquiryTable = ({ datas, dataType }) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupMode, setPopupMode] = useState(""); // "view" or "enroll"
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

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
    console.log(`Marking enquiry with ID ${id} as contacted`);
  };

  // Filter data based on search input
  const filteredData = datas?.filter((item) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      item?.first_name?.toLowerCase().includes(searchValue) || // Search by first name
      item?.last_name?.toLowerCase().includes(searchValue) || // Search by last name
      item?.student_name?.toLowerCase().includes(searchValue) || // Search by student name
      item?.phone_number?.includes(searchValue) || // Search by phone number
      item?.mobile?.includes(searchValue) || // Search by mobile
      item?.programs?.toLowerCase().includes(searchValue) || // Search by program
      item?.father_name?.toLowerCase().includes(searchValue) || // Search by father name
      item?.mother_name?.toLowerCase().includes(searchValue) // Search by mother name
    );
  });

  return (
    <div className={es["table-container"]}>
      <input
        type="text"
        placeholder={`Search ${dataType}...`}
        className={es["search-box"]}
        value={searchTerm} // Controlled input
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
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
                <th>Age</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </>
            ) : (
              <>
                <th>Father Name</th>
                <th>Mother Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Fees</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item, index) => (
            <tr key={index}>
              <td>{item.sno}</td>

              {dataType === "enquiry" ? (
                <>
                  <td>{item.first_name + " " + item.last_name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.programs}</td>
                  <td>{item.age}</td>
                  <td>{new Date(item.created_at).toISOString().split("T")[0]}</td>
                  <td>
                    <span className={`${es.checkit} ${es[item.checkit]}`}>
                      {item.checkit}
                    </span>
                  </td>
                  <td className={es["action-buttons"]}>
                    <button className={es["view-btn"]} onClick={() => handleViewClick(item)}>
                      View
                    </button>
                    {item.checkit === "New" && (
                      <button
                        onClick={() => handleMarkContacted(item.id)}
                        className={es["contact-btn"]}
                      >
                        Mark Contacted
                      </button>
                    )}
                    {item.checkit !== "Enrolled" && (
                      <button className={es["enroll-btn"]} onClick={() => handleEnrollClick(item)}>
                        Enroll
                      </button>
                    )}
                    <button className={es["close-btn"]}>Close</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.student_name}</td>
                  <td>{item.phone_number}</td>
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
