import React, { use, useEffect, useState } from "react";
import ss from "./Table.module.css";
import axios from "axios";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs; // ✅ Correct way
// import dotenv from "dotenv";
// dotenv.config();
const Domain = process.env.REACT_APP_BACKEND_URL;
const Table = ({ datas,filterOp,presentSet,paidSet, progs, dataType,onDataUpdate }) => {
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

  const updateItemStatus = async (id, status, isAttendance = true) => {
    try {
      await axios.patch(
        `${Domain}api/stu_enq/${progs}/${
          isAttendance ? "attendance" : "payments"
        }`,
        {
          checkit: status,
          id: id,
        }
      );
      const key = isAttendance ? "attendance_id" : "payment_id";
      const updateCount = isAttendance ? presentSet : paidSet;
      const updated = dataList.map((item) =>
        item[key] === id ? { ...item, checkit: status } : item
      );
      setDataList(updated);
      setOriginalData((prev) =>
        prev.map((item) =>
          item[key] === id ? { ...item, checkit: status } : item
        )
      );
      onDataUpdate(updated);
      updateCount((prev) => prev + (status ? 1 : -1));
    } catch (err) {
      console.error(err);
    }
  };

  const updateMultipleStatus = async (ids, status, isAttendance = true) => {
    const confirmText = `Are you sure you want to make everyone ${
      status
        ? isAttendance
          ? "present"
          : "paid"
        : isAttendance
        ? "absent"
        : "unpaid"
    }?`;
    if (!window.confirm(confirmText)) return;
    const key = isAttendance ? "attendance_id" : "payment_id";
    const updateCount = isAttendance ? presentSet : paidSet;
    const filtered = dataList.filter(
      (item) => ids.includes(item[key]) && item.checkit !== status
    );
    const patchIds = filtered.map((item) => item[key]);
    if (patchIds.length === 0) return;

    try {
      await axios.patch(
        `${Domain}api/stu_enq/multi/${progs}/${
          isAttendance ? "attendance" : "payments"
        }`,
        {
          checkit: Array(patchIds.length).fill(status),
          id: patchIds,
        }
      );
      const updated = dataList.map((item) =>
        ids.includes(item[key]) ? { ...item, checkit: status } : item
      );
      setDataList(updated);
      setOriginalData((prev) =>
        prev.map((item) =>
          ids.includes(item[key]) ? { ...item, checkit: status } : item
        )
      );
      onDataUpdate(updated);
      updateCount((prev) => prev + (status ? patchIds.length : -patchIds.length));
    } catch (err) {
      console.error(err);
    }
  };


  function getMonthName(monthNumber) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    // monthNumber should be 1-12
    return monthNames[monthNumber - 1] || "Invalid Month";
}
  const handlePrintRecipt = (stuName, monFees, mainData) => {
  const headers = ["Month", "Fees Amount", "Status"];

  // ✅ Sort months numerically
  const sortedData = [...mainData].sort((a, b) => a.month - b.month);

  const rows = sortedData.map((item) => [
    getMonthName(item.month),
    monFees,
    item.checkit ? 'Paid' : 'Pending'
  ]);

  const totalPaid = sortedData.filter(item => item.checkit).length * monFees;

  const docDefinition = {
    pageOrientation: 'portrait',
    pageSize: 'A4',
    content: [
      {
        text: `${stuName.toUpperCase()} (${progs}) Fees Details`,
        style: 'header'
      },
      {
        style: 'tableStyle',
        table: {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [headers, ...rows]
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex === 0 ? '#CCCCCC' : null; // Light gray header row
          }
        }
      },
      {
        text: `\nTotal Paid Fees: ₹${totalPaid}`,
        margin: [0, 20, 0, 0],
        bold: true,
        fontSize: 14,
        alignment: 'right'
      }
    ],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      tableStyle: {
        fontSize: 10, // Smaller font for clarity
        margin: [0, 5, 0, 15]
      }
    }
  };

  pdfMake.createPdf(docDefinition).download(`${stuName}_Payments.pdf`);
};



  const handleOneRecipt = async (stuId) =>{
    try{
      const res = await axios.get(`${Domain}api/stu_enq/${progs}/payments?pstudId=${stuId.student_id}`);

      handlePrintRecipt(stuId.student_name,stuId.monthly_fee,res.data);
    }catch(err){
      console.log(err)
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
              if (dataType === "payments") {
                updateMultipleStatus(selectedItems, true, false);
              } else {
                updateMultipleStatus(selectedItems, true, true);
              }
            }}
            />
            <input
              type="submit"
              value={dataType === "payments" ? "❌ UnPaid" : "❌ Absent"}
              className={ss.MarkAb}
              disabled={selectedItems.length === 0}
              id="AllDone"
              onClick={() => {
              if (dataType === "payments") {
                updateMultipleStatus(selectedItems, false, false);
              } else {
                updateMultipleStatus(selectedItems, false, true);
              }
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
                <th>fees Amount</th>
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
                    <td>{getMonthName(item.month)}</td>
                    <td>{item.monthly_fee}</td>
                    <td>{item.checkit ? "paid" : "pending"}</td>
                    <td>
        
                        <button
                          className={item.checkit === true ? ss["viewbtnabs"] : ss["view-btn"]}
                          disabled={item.checkit === true}
                          onClick={() =>
                          updateItemStatus(
                          item.payment_id,
                          !item.checkit,
                          false
                      )
                    }
                        >
                          Paid
                        </button>
                        <button
                        className={item.checkit === false ? ss["viewbtnabs"] : ss["view-btn"]}
                        disabled={item.checkit === false}
                        onClick={() =>
                          updateItemStatus(
                          item.payment_id,
                          !item.checkit,
                          false
                      )
                    }
                      >
                        Un Paid
                      </button>

                      <button
                      className={ss["recipt-btn"]}
                      onClick={()=>handleOneRecipt(item)}
                      >
                        generate recipt
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.attendance_date?.split("T")[0]}</td>
                    <td>{item.checkit ? "present" : "absent"}</td>
                    <td>
                      <button
                        className={ss["present-btn"]}
                        disabled={item.checkit === true}
                        onClick={() =>
                          updateItemStatus(
                          item.attendance_id,
                          !item.checkit,
                          true
                      )
                    }
                      >
                        ✅ Present 
                      </button> 

                      <button
                        className={ss["absent-btn"]}
                        disabled={item.checkit === false}
                        onClick={() =>
                          updateItemStatus(
                          item.attendance_id,
                          !item.checkit,
                          true
                      )
                    }
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
