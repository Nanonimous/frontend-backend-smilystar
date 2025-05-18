import React, { useState, useEffect } from "react";
import EnrollPopup from "./EnrollPopup";
import es from "./EnquiryTable.module.css";
import axios from "axios";

const EnquiryTable = ({ datas,totalEnset,newEnset,closeEnset,contactedEnset,enrolledEnset,totalStudset, dataType ,progs}) => {
  console.log(progs)
  const [enquiryData, setEnquiryData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupMode, setPopupMode] = useState(""); // "view" or "enroll"
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [btnActive , setbtnActive] = useState(false);

  // Initialize local state from props
  useEffect(() => {
    setEnquiryData(datas || []);
  }, [datas]);


  console.log(enquiryData)
  // Handlers
  const handleViewClick = (item) => {
    setSelectedItem(item);
    setPopupMode("view");
    setIsPopupOpen(true);
  };

  const handleAddClick = (item)=>{
        setSelectedItem(item);
    setPopupMode("addstudent");
    setIsPopupOpen(true);
  }

  const handleEnrollClick = (item) => {
    setSelectedItem(item);
    setPopupMode("enroll");
    setIsPopupOpen(true);
  };

  const handleMarkContacted = async (id) => {
    try{

        const response = await axios.patch(`http://localhost:5000/api/stu_enq/daycare/enquiry`,{
          "checkit": "contacted",
          "id" : id
        })
        
      setEnquiryData((prevData) => {
      const updatedData = prevData.map((item) =>
        item.sno === id ? { ...item, checkit: "contacted" } : item
      );

      // Use updatedData to compute counts
      let a = updatedData.filter(tn => tn.checkit == "new");        
      let b = updatedData.filter(tn => tn.checkit == "contacted");        
      let c = updatedData.filter(tn => tn.checkit == "enrolled");                

      newEnset(a.length);
      contactedEnset(b.length);
      enrolledEnset(c.length);

      return updatedData;
    });

    }catch(err){
      console.log(err)
    }
  };

  const handleEnrollStatusChange = (id) => {

    setEnquiryData((prevData) =>
      prevData.map((item) =>
        item.sno === id ? { ...item, checkit: "enrolled" } : item
      )
    );

          let a = enquiryData.filter(tn => tn.checkit == "new");        
      let b = enquiryData.filter(tn => tn.checkit == "contacted");        
      let c = enquiryData.filter(tn => tn.checkit == "enrolled");     
      newEnset(a.length)
    contactedEnset(b.length)
    enrolledEnset(c.length);
    setIsPopupOpen(false);
  };

  const handleAddStatusChange = (fd) =>{
    setEnquiryData((prevData) => [...prevData, fd]);
    totalStudset(prev => prev + 1);
    setIsPopupOpen(false);
  }
  const handleCloseClick = async (id) =>{
    const dec = window.confirm("are you sure about closing the enquiry data this will remove the enroll option ?");
    if(dec){
    try{
        const res = await axios.patch(`http://localhost:5000/api/stu_enq/daycare/enquiry`,{
          "checkit": "closed",
          "id" : id
        })
        
        setEnquiryData((prevData) =>
      prevData.map((item) =>
        item.sno === id ? { ...item, checkit: "closed" } : item
      )
    );
      let a = enquiryData.filter(tn => tn.checkit == "new");        
      let b = enquiryData.filter(tn => tn.checkit == "contacted");        
      let c = enquiryData.filter(tn => tn.checkit == "enrolled"); 
        newEnset(a.length) 
        contactedEnset(b.length)
        enrolledEnset(c.length)
        closeEnset(prev => prev + 1);
      console.log("closed",id)
    }catch(err){
      console.log(err)
    }
    
    }
    
  }
  const handleDeleteClick = async (stuid) =>{
    let c = window.confirm("are you sure you want to delete the student ??")
    if(c){
      try{
        console.log(stuid)
        const respo = await axios.delete(`http://localhost:5000/api/stu_enq/daycare/students?id=${stuid}`)
      setEnquiryData((prevData) =>
      prevData.filter((item) =>
        item.student_id != stuid
      )
    );
    totalStudset(prev => prev - 1 )
        console.log(respo.data);
      }catch(err){
        console.log(err)
      }
    }
  }

  // Filtered search results
  const filteredData = enquiryData?.filter((item) => {
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
              <input type="submit" value="add new student" className={es["add-stu-btn"]}
                onClick={handleAddClick}
              >
              </input>
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
                <th>Gender</th>
                <th>Fees</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item, index) => (
            <tr key={index} className={item.checkit == "closed" ? es["table-row-close"] : es["table-row"]}>
              {dataType === "enquiry" ? (
                <>
                <td>{item.sno}</td>
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
                        <button
                      className={es["view-btn"]}
                      onClick={() => handleViewClick(item)}
                    >
                      View
                    </button>
                    

                    {item.checkit === "new" && (
                      <button
                        onClick={() => handleMarkContacted(item.sno)}
                        className={es["contact-btn"]}
                         disabled = {item.checkit == "closed"}
                      >
                        Mark Contacted
                      </button>
                    )}

                    { item.checkit != "enrolled" && item.checkit != "closed" ? (<button
                        className={es["enroll-btn"]}
                        onClick={() => handleEnrollClick(item)}
                         disabled = {item.checkit == "closed"}
                      >
                        Enroll
                      </button>) : ""
                    }
                    
                      {item.checkit != "closed" && (
                          <button className={es["close-btn"]}
                            onClick={() => handleCloseClick(item.sno)}
                            disabled = {item.checkit == "closed"}

                          >
                      Close
                    </button>
                      )}

                      
                  </td>
                </>
              ) : (
                <>
                <td>{index+1}</td>
                  <td>{item.student_name}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.father_name}</td>
                  <td>{item.mother_name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.monthly_fee}</td>
                  <td className={es["action-buttons"]}>
                  <button
                  className={es["del-stu-btn"]}
                  onClick={() => handleDeleteClick(item.student_id)}
                  >delete student</button>
                  </td>
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
          mode={popupMode}
          onEnrollSuccess={() => handleEnrollStatusChange(selectedItem.sno)}
          onStudentSuccess={(fd) => handleAddStatusChange(fd)}
        />
      )}
    </div>
  );
};

export default EnquiryTable;
