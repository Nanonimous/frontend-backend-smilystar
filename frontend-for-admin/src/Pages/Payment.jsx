import React, { use, useEffect,useState  } from "react";
import Startcard from "../Components/Dashboard/Startcard/Startcard"
import ps from "../Styles/payment.module.css";
import Menu from "../Components/Layout/Sidebar/Menu";
import Navbar from "../Components/Layout/Navbar/Navbar";
import { useLocation } from "react-router-dom"; // Import useLocation
import DateFilterComponent from "../Components/filter/Filter";
import Table  from "../../src/Components/Table/Table";
import axios from "axios";
import { AiOutlineConsoleSql } from "react-icons/ai";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs; // ✅ Correct way


export default function Payment(){

  const [tableData, setTableData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const [present ,setPresent] = useState(0);
  const [paid ,setPaid] = useState(0);
  const [total ,setTotal] = useState(0);
  const [classDay , setClassDay] = useState();
  const [progs, setProgs] = useState();
  const [class_dates , setClass_dates] = useState()


      const attendancecardData = [
          { title: "Total present", value:  present },
          { title: "Total absent", value:  total - present },
          {title : "total strength", value : total}
      ];

      const paymentcardData = [
        { title: "Fees Paid", value:paid } ,
        { title: "Fees Unpaid", value: total - paid },

      ];
      
    const location = useLocation(); // Get the current location
    const isPaymentPage = location.pathname.split("/").filter(Boolean).pop() === "payments";
    const cardsToShow = isPaymentPage ? paymentcardData : attendancecardData;
        ;


        useEffect(() => {
          const fetchData = async () => {
            try {
              const pathParts = location.pathname.split("/").filter(Boolean);
              let program = pathParts[0];
              setProgs(program)
              const database = pathParts[1];
              let fDate = selectedDate.toISOString().split('T')[0].split("-")
              let filterYear = parseInt(fDate[0]);
              let filterMonth = parseInt(fDate[1]);
              let filterDate = parseInt(fDate[2]);
              console.log(filterYear,filterMonth,filterDate);
            if(database === "payments"){
              const resultData = await axios.get(`http://localhost:5000/api/stu_enq/${program}/payments?pMonth=${filterMonth}&pYear=${filterYear}`);
              const data = resultData.data;
              console.log(data)
              setTableData(data);
              const paidCount = data.filter(item => item.checkit === true).length;
              setPaid(paidCount);
              setTotal(data.length);
              console.log(paidCount, data.length);
              } else if(database === "attendance"){
                const checkerCall = await axios.get(`http://localhost:5000/api/stu_enq/${program}/class_dates`);
                console.log("test",new Date())
                setClass_dates(checkerCall.data)
                let dates = checkerCall.data.map((item) => {
                    return item.attendance_date;
                  });
                  console.log(dates,selectedDate.toISOString().split('T')[0])
                  const isClassDay = dates.includes(selectedDate.toISOString().split('T')[0]);
                  console.log(isClassDay)
                  setClassDay(isClassDay)
                  if (isClassDay) {
                    const resultData = await axios.get(`http://localhost:5000/api/stu_enq/${program}/attendance?aMonth=${filterMonth}&aYear=${filterYear}&aDate=${filterDate}`);
                    const data = resultData.data;
                    console.log(resultData.data);
                    setTableData(data);
                    const presentCount = data.filter(item => item.checkit === true).length;
                    setPresent(presentCount);
                    setTotal(data.length);
                    console.log(presentCount, data.length);
                  }
              }

            } catch (err) {
              console.error("Error fetching data:", err);
            }
          };
        
          fetchData();  
        }, [location.pathname,selectedDate,classDay]); // optional: include this to re-fetch if route changes

        const handleClassDay = async () =>{

          try{
          const respo = await axios.post(`http://localhost:5000/api/stu_enq/${progs}/class_dates`);
          console.log(respo.data);
          const stud = await axios.get(`http://localhost:5000/api/stu_enq/${progs}/students`);
          let stuId = stud.data.map((item)=>{
            return item.student_id
          })
          console.log(stuId);
          const respo2 = await axios.post(`http://localhost:5000/api/stu_enq/multi/${progs}/attendance`,{
              "id":stuId
          });
            console.log(respo2.data);
            setClassDay(true);
          }catch(err){
            console.log(err)
          }
        }

        const handleNoClassDay =async () => {
          const ch = window.confirm("doing this will delete all the attendance detaits in this date so are you sure ?")
          if(ch){
            try{
              let ids = tableData.map((item,idex) => {
                return item.attendance_id
              })
              console.log("ids",ids)
            const respo1 = await axios.delete(`http://localhost:5000/api/stu_enq/multi/${progs}/attendance`,{
              "data":{
                "id":ids
              }
            });
            console.log(respo1.data);
            const respo2 = await axios.delete(`http://localhost:5000/api/stu_enq/${progs}/class_dates?id=${selectedDate.toISOString().split('T')[0]}`);
            console.log(respo2.data);

                  setTableData([]);
                  setClassDay(false);
                  setPresent(0);
                  setTotal(0);  
            }catch(err){
              console.log(err)
            }
          }
        }
      function getMonthName(monthNumber) {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        
        // monthNumber should be 1-12
        return monthNames[monthNumber - 1] || "Invalid Month";
}

       const handlePrintRecipt = () => {
            let fDate = selectedDate.toISOString().split('T')[0].split("-")
              let filterMonth = parseInt(fDate[1]);
            const pathParts = location.pathname.split("/").filter(Boolean);
              let program = pathParts[0];
              const database = pathParts[1];
              if (tableData.length === 0) {
              alert("No data to export.");
              return;
              }
              let x = class_dates.filter((item)=>parseInt(item.attendance_date.split("-")[1]) == filterMonth)
              console.log(x)
              let list_Date = x.map((item,index)=>{

                  return item.attendance_date
              })

              const headers = ['Name', 'Contact','fees Amount', 'Status']

              
              const rows = tableData.map((item) => [
              
              item.student_name || 'N/A',
              item.phone_number || 'N/A',
              item.monthly_fee,
              item.checkit ? 'paid' : 'Pending'
              
              
              ]);

              const docDefinition = {
              content: [
              { text: ` ${program.toUpperCase()} (${getMonthName(filterMonth)}) Fees details `, style: 'header' },
              {
                table: {
                  headerRows: 1,
                  widths: ['*', '*', '*', '*'] ,
                  body: [headers, ...rows]
                }
              }
              ],
              styles: {
              header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 20]
              }
              }
              };

              pdfMake.createPdf(docDefinition).download(`${getMonthName(filterMonth)}_Payments.pdf`);
              };



        return (
        <>
        <div className={ps.maincontainer}>
        <div className={ps.sidebar}>
        <Menu />
         </div>
         <div className={ps.rightside} >
              <Navbar />
               <div className={ps.body}>

               <DateFilterComponent
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              filter={filter}
              setFilter={setFilter}
              setclassDay = {setClassDay}
              onclickingClassDay = { () => handleClassDay()}
              onclickingNoClassDay = { ()=>handleNoClassDay()}
              onclickingPrint = { ()=>handlePrintRecipt()}
              classDay = {classDay}
              dbs = {location.pathname.split("/").filter(Boolean)[1]}
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
            progs={location.pathname.split("/").filter(Boolean)[0]}
            dataType={location.pathname.split("/").filter(Boolean).pop()}
            onDataUpdate={setTableData} // ✅ pass updater function
          />




{}





        </div>
        </div>
        </>
    )
}