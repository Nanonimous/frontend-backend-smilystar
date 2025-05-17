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





export default function Payment(){
  const [tableData, setTableData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const [present ,setPresent] = useState();
  const [paid ,setPaid] = useState();
  const [total ,setTotal] = useState();



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
              const program = pathParts[0];
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
              const resultData = await axios.get(`http://localhost:5000/api/stu_enq/${program}/attendance?aMonth=${filterMonth}&aYear=${filterYear}&aDate=${filterDate}`);
              const data = resultData.data;
              console.group(resultData.data)
              setTableData(data);
              const presentCount = data.filter(item => item.checkit === true).length;
              setPresent(presentCount);
              setTotal(data.length);
              console.log(presentCount, data.length);
              }

            } catch (err) {
              console.error("Error fetching data:", err);
            }
          };
        
          fetchData();  
        }, [location.pathname,selectedDate]); // optional: include this to re-fetch if route changes
        


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
              dbs = {location.pathname.split("/").filter(Boolean)[1]}
            />

            <div className={ps.Startcard}>
              
            {cardsToShow.map((item, index) => (
                <Startcard key={index} title={item.title} value={item.value} />
            ))}

            </div>

            </div>
            <Table datas = {tableData} filterOp = {filter}  presentSet = {setPresent}  paidSet = {setPaid} progs = {location.pathname.split("/").filter(Boolean)[0]} dataType = {location.pathname.split("/").filter(Boolean).pop()}/>




{}





        </div>
        </div>
        </>
    )
}