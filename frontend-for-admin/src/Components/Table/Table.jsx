import React, { useState } from "react";
import ss from "./Table.module.css";
import axios from "axios";


const Table = ({ datas, dataType }) =>{
    console.log("in the testing section " , datas, dataType);

    const [searchTerm, setSearchTerm] = useState(""); // State for search input
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
    

      const checkAll = () =>{
        const chbtns = document.querySelectorAll(".eachCheckBox") ;
        chbtns.forEach(element => {
          element.checked = !element.checked;
        });
        const DoneBtn = document.getElementById("AllDone");
        const NDoneBtn = document.getElementById("AllNDone"); 
        DoneBtn.disabled = !DoneBtn.disabled;
        if(NDoneBtn){
          NDoneBtn.disabled = !NDoneBtn.disabled;
        }
      }
        
      const checkSome = () =>{
        const chbtns = document.querySelectorAll(".eachCheckBox") ;
        const DoneBtn = document.getElementById("AllDone");
        const NDoneBtn = document.getElementById("AllNDone"); 
        DoneBtn.disabled = !DoneBtn.disabled;
        if(NDoneBtn){
          NDoneBtn.disabled = !NDoneBtn.disabled;
        }
      }
    

      const testNames = [
        "nivaas",
        "hirthick",
        "jothimani",
        "vijay"
      ]
    
      const stuPaid = (stuId) => {
        console.log("id coming uhh paid" , stuId);

      }

      const stuClose = (stuId) => {
        console.log("id coming uhh close" , stuId)

      }
    return (
        <div className={ss["table-container"]}>
        <div className={ss.options}>
            <input
                type="text"
                placeholder={`Search ${dataType}...`}
                className={ss["search-box"]}
                value={searchTerm} // Controlled input
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />

            <div className={ss.multiAss}>
            <input
                type="submit"
                value={dataType === "payments"?"✅ Paid" :"✅ Mark Present" }
                name="MarkPr"
                className={ss.MarkPr}
                disabled
                id="AllDone"
                />
            {dataType === "attendance" && <input
                            type="submit"
                            value= "❌ Mark Absent"
                            name="MarkAb"
                            className={ss.MarkAb}
                            disabled
                            id="AllNDone"
                            />
                }
                
            </div>
        </div>
        <table className={ss["enquiry-table"]}>
        <thead>
          <tr>
            <th >
              <input type="checkbox" name="" id=""  className={ss["selectAll"]} onClick={checkAll}/>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            {dataType === "payments" ? (
              <>
                <th>price</th>
                <th>status</th>
              </>
            ) : (
              <>
                <th>date</th>
                <th>status</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {datas?.map((item, index) => (
            <tr key={index}>
              <td><input type="checkbox" name="" id={index} className={ss["eachCheckBox"]} onClick={checkSome}/></td>
              <td>{index+1}</td>

              {dataType === "payments" ? (
                <>
                  <td>{testNames[index]}</td>
                  <td>contact number</td>
                  <td>{item.month}</td>
                  <td>{item.checkit.toString()}</td>
                  <td className={ss["action-buttons"]}>
                    {(!item.checkit) && (
                      <button className={ss["view-btn"]} onClick={()=>stuPaid(item.payment_id)} 
                    >
                      Paid
                    </button>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td>{testNames[index]}</td>
                  <td>contact number</td>
                  <td>{item.attendance_date}</td>
                  <td>{item.checkit.toString()}</td>
                  <td className={ss["action-buttons"]}>
                    <button className={ss["present-btn"]}
                    disabled={item.checkit === true} >
                    ✅ Present
                    </button>
                    <button
                      className={ss["absent-btn"]}
                      disabled={item.checkit === false}
                    >
                      ❌ Absent
                    </button>

                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

            </div>
    )
}

export default Table;