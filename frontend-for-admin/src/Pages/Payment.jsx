import React, { useEffect, useState, useMemo } from "react";
import Startcard from "../Components/Dashboard/Startcard/Startcard";
import ps from "../Styles/payment.module.css";
import Menu from "../Components/Layout/Sidebar/Menu";
import Navbar from "../Components/Layout/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import DateFilterComponent from "../Components/filter/Filter";
import Table from "../../src/Components/Table/Table";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

const Domain = process.env.REACT_APP_BACKEND_URL;

export default function Payment() {
  const [tableData, setTableData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const [present, setPresent] = useState(0);
  const [paid, setPaid] = useState(0);
  const [total, setTotal] = useState(0);
  const [classDay, setClassDay] = useState();
  const [progs, setProgs] = useState();
  const [classDates, setClassDates] = useState();

  const location = useLocation();
  const pathParts = useMemo(() => location.pathname.split("/").filter(Boolean), [location.pathname]);
  const program = pathParts[0];
  const database = pathParts[1];
  const isPaymentPage = pathParts.at(-1) === "payments";

  const attendanceCardData = [
    { title: "Total present", value: present },
    { title: "Total absent", value: total - present },
    { title: "Total strength", value: total },
  ];

  const paymentCardData = [
    { title: "Fees Paid", value: paid },
    { title: "Fees Unpaid", value: total - paid },
  ];

  const cardsToShow = isPaymentPage ? paymentCardData : attendanceCardData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProgs(program);
        const [year, month, date] = selectedDate.toISOString().split("T")[0].split("-").map(Number);

        if (database === "payments") {
          const res = await axios.get(`${Domain}api/stu_enq/${program}/payments?pMonth=${month}&pYear=${year}`);
          const data = res.data;
          setTableData(data);
          setPaid(data.filter(item => item.checkit === true).length);
          setTotal(data.length);
        } else if (database === "attendance") {
          const res = await axios.get(`${Domain}api/stu_enq/${program}/class_dates`);
          setClassDates(res.data);

          const dates = res.data.map(item => item.attendance_date);
          const isClass = dates.includes(selectedDate.toISOString().split("T")[0]);
          setClassDay(isClass);
          setTableData([]);

          if (isClass) {
            const res2 = await axios.get(`${Domain}api/stu_enq/${program}/attendance?aMonth=${month}&aYear=${year}&aDate=${date}`);
            const data = res2.data;
            setTableData(data);
            setPresent(data.filter(item => item.checkit === true).length);
            setTotal(data.length);
          }else {
            setTableData([]);
            setPresent(0); // ✅ reset
            setTotal(0);   // ✅ reset
          }
        }

        const paymentData = await axios.get(`${Domain}api/stu_enq/${program}/payments`);
        if (date === 22 && paymentData.data.length === 0) {
          const studRes = await axios.get(`${Domain}api/stu_enq/${program}/students`);
          const studentIds = studRes.data.map(item => item.student_id);

          await axios.post(`${Domain}api/stu_enq/multi/${progs}/payments`, { id: studentIds });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [location.pathname, selectedDate, classDay]);

  const handleClassDay = async () => {
    try {
      await axios.post(`${Domain}api/stu_enq/${progs}/class_dates`);
      const studRes = await axios.get(`${Domain}api/stu_enq/${progs}/students`);
      const studentIds = studRes.data.map(item => item.student_id);

      await axios.post(`${Domain}api/stu_enq/multi/${progs}/attendance`, { id: studentIds });
      setClassDay(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNoClassDay = async () => {
    const confirmDelete = window.confirm("Doing this will delete all the attendance details for this date. Are you sure?");
    if (confirmDelete) {
      try {
        const ids = tableData.map(item => item.attendance_id);
        await axios.delete(`${Domain}api/stu_enq/multi/${progs}/attendance`, { data: { id: ids } });
        await axios.delete(`${Domain}api/stu_enq/${progs}/class_dates?id=${selectedDate.toISOString().split("T")[0]}`);

        setTableData([]);
        setClassDay(false);
        setPresent(0);
        setTotal(0);
      } catch (err) {
        console.error(err);
      }
    }
  };

  function getMonthName(monthNumber) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1] || "Invalid Month";
  }

  const getAttendance = async (month) => {
    try {
      const res = await axios.get(`${Domain}api/stu_enq/${progs}/attendance?areciptMon=${month}`);
      const groupedMap = new Map();

      res.data.forEach(({ student_name, attendance_date, checkit }) => {
        if (!groupedMap.has(student_name)) {
          groupedMap.set(student_name, []);
        }
        groupedMap.get(student_name).push({ attendance_date, checkit });
      });

      return Array.from(groupedMap.entries()).map(([student_name, checkit_list]) => ({
        student_name,
        checkit_list: checkit_list.sort((a, b) => new Date(a.attendance_date) - new Date(b.attendance_date))
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrintRecipt = async () => {
    const [year, month] = selectedDate.toISOString().split("T")[0].split("-").map(Number);

    if (tableData.length === 0) {
      alert("No data to export.");
      return;
    }

    const sortedDates = (classDates || [])
      .filter(item => parseInt(item.attendance_date.split("-")[1]) === month)
      .sort((a, b) => new Date(a.attendance_date) - new Date(b.attendance_date))
      .map(item => item.attendance_date);

    const attendanceData = await getAttendance(month);

    const headers = database === "payments"
      ? ["Name", "Contact", "Fees Amount", "Status"]
      : ["Name", ...sortedDates, "Total Present", "Total Absent"];

    const rows = database === "payments"
      ? tableData.map(item => [
          item.student_name || "N/A",
          item.phone_number || "N/A",
          item.monthly_fee,
          item.checkit ? "Paid" : "Pending"
        ])
      : attendanceData.map(item => {
          let presentCount = 0;
          let absentCount = 0;

          const statusList = sortedDates.map(date => {
            const found = item.checkit_list.find(x => x.attendance_date === date);
            if (found) {
              if (found.checkit) presentCount++;
              else absentCount++;
              return found.checkit ? "Present" : "Absent";
            }
            return "N/A";
          });

          return [item.student_name || "N/A", ...statusList, presentCount, absentCount];
        });

    const docDefinition = {
      pageOrientation: "landscape",
      pageSize: "A4",
      content: [
        {
          text: `${program.toUpperCase()} (${getMonthName(month)}) ${database === "payments" ? "Fees" : "Attendance"} details ${year}`,
          style: "header",
        },
        {
          style: "tableStyle",
          table: {
            headerRows: 1,
            widths: Array(headers.length).fill("*"),
            body: [headers, ...rows],
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex === 0 ? "#CCCCCC" : null),
          },
        },
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        tableStyle: {
          fontSize: 8,
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(`${getMonthName(month)}_${database === "payments" ? "Payments" : "Attendance"}_${year}.pdf`);
  };

  return (
    <div className={ps.maincontainer}>
      <div className={ps.sidebar}>
        <Menu />
      </div>
      <div className={ps.rightside}>
        <Navbar />
        <div className={ps.body}>
          <DateFilterComponent
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            filter={filter}
            setFilter={setFilter}
            setclassDay={setClassDay}
            onclickingClassDay={handleClassDay}
            onclickingNoClassDay={handleNoClassDay}
            onclickingPrint={handlePrintRecipt}
            classDay={classDay}
            dbs={database}
          />

          <div className={ps.Startcard}>
            {cardsToShow.map((item, index) => (
              <Startcard key={index} title={item.title} value={item.value} />
            ))}
          </div>
        </div>

        <Table
          datas={tableData}
          filterOp={filter}
          presentSet={setPresent}
          paidSet={setPaid}
          progs={program}
          dataType={database}
          onDataUpdate={setTableData}
        />
      </div>
    </div>
  );
}
