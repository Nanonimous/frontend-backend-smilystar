import React, { use, useEffect, useState } from "react";
import ss from "./Table.module.css";
import axios from "axios";

const Table = ({ datas,filterOp,presentSet,paidSet, progs, dataType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [originalData, setOriginalData] = useState(datas); // keep original unfiltered data
  const [dataList, setDataList] = useState(datas);


useEffect(() => {
  setOriginalData(datas);
}, [datas]);

useEffect(() => {
  let filteredData = [];

  if (dataType === "payments") {
    if (filterOp === "paid") {
      filteredData = originalData.filter(item => item.checkit === true);
    } else if (filterOp === "unpaid") {
      filteredData = originalData.filter(item => item.checkit === false);
    } else {
      filteredData = originalData;
    }
  } else {
    if (filterOp === "present") {
      filteredData = originalData.filter(item => item.checkit === true);
    } else if (filterOp === "absent") {
      filteredData = originalData.filter(item => item.checkit === false);
    } else {
      filteredData = originalData;
    }
  }

  setDataList(filteredData);
  setSelectedItems([]);
}, [filterOp, dataType, originalData]); // depend on originalData, filterOp, dataType



  const filteredData = dataList.filter((item) => {
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

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map(item => item.attendance_id || item.payment_id));
    }
  };

  const toggleItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const stuPresent = async (attId) => {
    try {
      await axios.patch(`http://localhost:5000/api/stu_enq/${progs}/attendance`, {
        checkit: true,
        id: attId,
      });

      setDataList(prev =>
        prev.map(item =>
          item.attendance_id === attId ? { ...item, checkit: true } : item
        )
      );
      setOriginalData(prev =>
      prev.map(item =>
        item.attendance_id === attId ? { ...item, checkit: true } : item
      )
    );
      presentSet(prev => prev + 1)
    } catch (err) {
      console.error(err);
    }
  };

  const stuAbsent = async (attId) => {
    try {
      await axios.patch(`http://localhost:5000/api/stu_enq/${progs}/attendance`, {
        checkit: false,
        id: attId,
      });

      setDataList(prev =>
        prev.map(item =>
          item.attendance_id === attId ? { ...item, checkit: false } : item
        )
      );

      setOriginalData(prev =>
      prev.map(item =>
        item.attendance_id === attId ? { ...item, checkit: false } : item
      )
    );
      presentSet(prev => prev - 1)
    } catch (err) {
      console.error(err);
    }
  };

  const stuPaid = async (payId) => {
    try {
          await axios.patch(`http://localhost:5000/api/stu_enq/${progs}/payments`, {
            checkit: true,
            id: payId,
          });

          setDataList(prev =>
            prev.map(item =>
              item.payment_id === payId ? { ...item, checkit: true } : item
            )
          );

        setOriginalData(prev =>
            prev.map(item =>
              item.payment_id === payId ? { ...item, checkit: true } : item
            )
          );
          paidSet(prev => prev + 1)
        } catch (err) {
          console.error(err);
        }

    // Implement your Paid logic here
    
  };

  const stuUnPaid = async (payId) => {
      try{
        await axios.patch(`http://localhost:5000/api/stu_enq/${progs}/payments`, {
          checkit: false,
          id: payId,
        });

        setDataList(prev =>
          prev.map(item =>
            item.payment_id === payId ? { ...item, checkit: false } : item
          )
        );

      setOriginalData(prev =>
          prev.map(item =>
            item.payment_id === payId ? { ...item, checkit: false } : item
          )
        );
        paidSet(prev => prev - 1)
      }
      catch(err){
        console.log(err)
      }
  }

  const stuPresentMulti = async (attId) => {
    const userConfirmed = window.confirm("Are you sure you want to make eveyone present?")
    if(userConfirmed){
      let c = dataList.filter(item => attId.includes(item.attendance_id) && item.checkit == false);
      let filterId = c.map( t => t.attendance_id);
      try {
        await axios.patch(`http://localhost:5000/api/stu_enq/multi/${progs}/attendance`, {
          checkit: Array(c.length).fill(true),
          id: filterId,
        });
  
        setDataList(prev =>
          prev.map(item =>
            attId.includes(item.attendance_id) ? { ...item, checkit: true } : item
          )
        );

        setOriginalData(prev =>
      prev.map(item =>
        attId.includes(item.attendance_id) ? { ...item, checkit: true } : item
      )
    );
        presentSet(prev => prev + c.length)
      } catch (err) {
        console.error(err);
      }
    }
    
  } 
  const stuAbsentMulti = async (attId) => {
    const userConfirmed = window.confirm("Are you sure you want to make eveyone absent?")
    if(userConfirmed){
      let c = dataList.filter(item => attId.includes(item.attendance_id) && item.checkit == true);
      let filterId = c.map( t => t.attendance_id);
      try {
      await axios.patch(`http://localhost:5000/api/stu_enq/multi/${progs}/attendance`, {
        checkit: Array(c.length).fill(false),
        id: filterId,
      });

      setDataList(prev =>
        prev.map(item =>
          attId.includes(item.attendance_id) ? { ...item, checkit: false } : item
        )
      );
      
      setOriginalData(prev =>
      prev.map(item =>
        attId.includes(item.attendance_id) ? { ...item, checkit: false } : item
      )
    );  
       presentSet(prev => prev - c.length)
    } catch (err) {
      console.error(err);
    }
    }
        
  } 
    const stuPaidMulti = async (payId) => {
        const userConfirmed = window.confirm("Are you sure you want to make eveyone paid?")
    if(userConfirmed){
      let c = dataList.filter(item => payId.includes(item.payment_id) && item.checkit == false);
      let filterId = c.map( t => t.payment_id);
      try {
      await axios.patch(`http://localhost:5000/api/stu_enq/multi/${progs}/payments`, {
        checkit: Array(c.length).fill(true),
        id: filterId,
      });

      setDataList(prev =>
        prev.map(item =>
          payId.includes(item.payment_id) ? { ...item, checkit: true } : item
        )
      );

        setOriginalData(prev =>
      prev.map(item =>
        payId.includes(item.payment_id) ? { ...item, checkit: true } : item
      )
    );
       paidSet(prev => prev + c.length)
    } catch (err) {
      console.error(err);
    }
    }
  } 
  const stuUnPaidMulti = async (payId) =>{
    const userConfirmed = window.confirm("Are you sure you want to make eveyone unpaid?")
    if(userConfirmed){
      let c = dataList.filter(item => payId.includes(item.payment_id) && item.checkit == true);
      let filterId = c.map( t => t.payment_id);
      try {
      await axios.patch(`http://localhost:5000/api/stu_enq/multi/${progs}/payments`, {
        checkit: Array(c.length).fill(false),
        id: filterId,
      });

      setDataList(prev =>
        prev.map(item =>
          payId.includes(item.payment_id) ? { ...item, checkit: false } : item
        )
      );

        setOriginalData(prev =>
      prev.map(item =>
        payId.includes(item.payment_id) ? { ...item, checkit: false } : item
      )
    );
       paidSet(prev => prev - c.length)
    } catch (err) {
      console.error(err);
    }
    }
  }

  const allSelected = selectedItems.length === filteredData.length && filteredData.length > 0;

  return (
    <div className={ss["table-container"]}>
      <div className={ss.options}>
        <input
          type="text"
          placeholder={`Search ${dataType}...`}
          className={ss["search-box"]}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

          <div className={ss.multiAss}>
            <input
              type="submit"
              value={dataType === "payments" ? "✅ Paid" : "✅ Mark Present"}
              className={ss.MarkPr}
              disabled={selectedItems.length === 0}
              id="AllDone"
              onClick={() => {
                dataType === "attendance" ? stuPresentMulti(selectedItems) : stuPaidMulti(selectedItems);
              }}
            />
            <input
              type="submit"
              value={dataType === "payments" ? "❌ UnPaid" : "❌ Absent"}
              className={ss.MarkAb}
              disabled={selectedItems.length === 0}
              id="AllDone"
              onClick={() => {
                dataType === "attendance" ? stuAbsentMulti(selectedItems) : stuUnPaidMulti(selectedItems);
              }}
            />
          </div>
      </div>

      <table className={ss["enquiry-table"]}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            {dataType === "payments" ? (
              <>
                <th>Month</th>
                <th>Status</th>
              </>
            ) : (
              <>
                <th>Date</th>
                <th>Status</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => {
            const itemId = item.attendance_id || item.payment_id;
            return (
              <tr key={itemId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(itemId)}
                    onChange={() => toggleItem(itemId)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{item.student_name}</td>
                <td>{item.phone_number}</td>
                {dataType === "payments" ? (
                  <>
                    <td>{item.month}</td>
                    <td>{item.checkit.toString()}</td>
                    <td>
        
                        <button
                          className={item.checkit === true ? ss["viewbtnabs"] : ss["view-btn"]}
                          disabled={item.checkit === true}
                          onClick={() => stuPaid(item.payment_id)}
                        >
                          Paid
                        </button>
                        <button
                        className={item.checkit === false ? ss["viewbtnabs"] : ss["view-btn"]}
                        disabled={item.checkit === false}
                        onClick={() => stuUnPaid(item.payment_id)}
                      >
                        Un Paid
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.attendance_date?.split("T")[0]}</td>
                    <td>{item.checkit.toString()}</td>
                    <td>
                      <button
                        className={ss["present-btn"]}
                        disabled={item.checkit === true}
                        onClick={() => stuPresent(item.attendance_id)}
                      >
                        ✅ Present 
                      </button> 

                      <button
                        className={ss["absent-btn"]}
                        disabled={item.checkit === false}
                        onClick={() => stuAbsent(item.attendance_id)}
                      >
                        ❌ Absent
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
