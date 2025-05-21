import React, { useState, useEffect } from "react";
import EnrollPopup from "./EnrollPopup";
import es from "./EnquiryTable.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EnquiryTable = ({
  datas,
  newEnset,
  closeEnset,
  contactedEnset,
  enrolledEnset,
  totalStudset,
  dataType,
  progs
}) => {
  const [enquiryData, setEnquiryData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupMode, setPopupMode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");

  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const program = pathParts[0];

  useEffect(() => {
    const sortedData = (datas || []).slice().sort((a, b) => {
      const order = { new: 0, contacted: 1, enrolled: 2, closed: 3 };
      return (order[a.checkit] ?? 4) - (order[b.checkit] ?? 4);
    });
    setEnquiryData(sortedData);
  }, [datas]);

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setPopupMode("view");
    setIsPopupOpen(true);
  };

  const handleAddClick = () => {
    setPopupMode("addstudent");
    setIsPopupOpen(true);
  };

  const handleEnrollClick = (item) => {
    setSelectedItem(item);
    setPopupMode("enroll");
    setIsPopupOpen(true);
  };

  const handleMarkContacted = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/stu_enq/daycare/enquiry`, {
        checkit: "contacted",
        id: id
      });

      setEnquiryData((prevData) => {
        const updatedData = prevData.map((item) =>
          item.sno === id ? { ...item, checkit: "contacted" } : item
        );
        updateCounts(updatedData);
        return updatedData;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnrollStatusChange = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/stu_enq/daycare/enquiry`, {
        checkit: "enrolled",
        id: id
      });

      setEnquiryData((prevData) => {
        const updatedData = prevData.map((item) =>
          item.sno === id ? { ...item, checkit: "enrolled" } : item
        );
        updateCounts(updatedData);
        return updatedData;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseClick = async (id) => {
    const dec = window.confirm(
      "Are you sure about closing the enquiry data? This will remove the enroll option."
    );
    if (dec) {
      try {
        await axios.patch(`http://localhost:5000/api/stu_enq/daycare/enquiry`, {
          checkit: "closed",
          id: id
        });

        const updatedData = enquiryData.map((item) =>
          item.sno === id ? { ...item, checkit: "closed" } : item
        );
        setEnquiryData(updatedData);
        updateCounts(updatedData);
        closeEnset((prev) => prev + 1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteClick = async (stuid) => {
    const c = window.confirm("Are you sure you want to delete the student?");
    if (c) {
      try {
        await axios.delete(`http://localhost:5000/api/stu_enq/${progs}/students?id=${stuid}`);
        setEnquiryData((prevData) =>
          prevData.filter((item) => item.student_id !== stuid)
        );
        totalStudset((prev) => prev - 1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAddStatusChange = (fd) => {
    setEnquiryData((prevData) => [...prevData, fd]);
    totalStudset((prev) => prev + 1);
    setIsPopupOpen(false);
  };

  const updateCounts = (data) => {
    const a = data.filter((tn) => tn.checkit === "new");
    const b = data.filter((tn) => tn.checkit === "contacted");
    const c = data.filter((tn) => tn.checkit === "enrolled");
    newEnset(a.length);
    contactedEnset(b.length);
    enrolledEnset(c.length);
  };

  const filteredData = enquiryData
    ?.filter((item) => {
      const searchValue = searchTerm.toLowerCase();
      return (
        item?.first_name?.toLowerCase().includes(searchValue) ||
        item?.last_name?.toLowerCase().includes(searchValue) ||
        item?.student_name?.toLowerCase().includes(searchValue) ||
        item?.phone_number?.includes(searchValue) ||
        item?.mobile?.includes(searchValue) ||
        item?.programs?.toLowerCase().includes(searchValue) ||
        item?.father_name?.toLowerCase().includes(searchValue) ||
        item?.mother_name?.toLowerCase().includes(searchValue)
      );
    })
    .filter((item) => {
      if (statusFilter && item.checkit !== statusFilter) return false;
      if (programFilter && item.programs?.toLowerCase() !== programFilter) return false;
      return true;
    });

  const sortedData = [...filteredData].sort((a, b) => {
    if (a.checkit === "new" && b.checkit !== "new") return -1;
    if (a.checkit !== "new" && b.checkit === "new") return 1;
    return 0;
  });

  return (
    <div className={es["table-container"]}>
      <div className={es["filter-container"]}>
        <input
          type="text"
          placeholder={`Search ${dataType}...`}
          className={es["search-box"]}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {dataType === "students" && (
          <input
            type="submit"
            value="Add New Student"
            className={es["add-stu-btn"]}
            onClick={handleAddClick}
          />
        )}

        {dataType === "enquiry" && (
          <>
            <select onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
              <option value="closed">Closed</option>
            </select>

            <select onChange={(e) => setProgramFilter(e.target.value)}>
              <option value="">All Programs</option>
              <option value="bharatanatyam">Bharatanatyam</option>
              <option value="hindiclass">Hindi Class</option>
              <option value="daycare">Daycare</option>
              <option value="carnatic">Carnatic</option>
              <option value="violin">Violin</option>
              <option value="tabla">Tabla</option>
              <option value="piano">Piano</option>
            </select>
          </>
        )}
      </div>

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
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className={item.checkit === "closed" ? es["table-row-close"] : es["table-row"]}>
              {dataType === "enquiry" ? (
                <>
                  <td>{index + 1}</td>
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
                    {item.checkit === "new" && (
                      <button className={es["contact-btn"]} onClick={() => handleMarkContacted(item.sno)}>
                        Mark Contacted
                      </button>
                    )}
                    {item.checkit !== "enrolled" && item.checkit !== "closed" && (
                      <button className={es["enroll-btn"]} onClick={() => handleEnrollClick(item)}>
                        Enroll
                      </button>
                    )}
                    {item.checkit !== "closed" && (
                      <button className={es["close-btn"]} onClick={() => handleCloseClick(item.sno)}>
                        Close
                      </button>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td>{index + 1}</td>
                  <td>{item.student_name}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.father_name}</td>
                  <td>{item.mother_name}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className={es["delete-btn"]} onClick={() => handleDeleteClick(item.student_id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <EnrollPopup
          data={selectedItem}
          mode={popupMode}
          onClose={() => setIsPopupOpen(false)}
          onEnroll={() => {
            if (selectedItem) handleEnrollStatusChange(selectedItem.sno);
            setIsPopupOpen(false);
          }}
          onAdd={handleAddStatusChange}
        />
      )}
    </div>
  );
};

export default EnquiryTable;
