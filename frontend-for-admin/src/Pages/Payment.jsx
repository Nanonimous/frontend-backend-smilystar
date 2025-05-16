import React, { useEffect,useState  } from "react";
import Startcard from "../Components/Dashboard/Startcard/Startcard"
import ps from "../Styles/payment.module.css";
import Menu from "../Components/Layout/Sidebar/Menu";
import Navbar from "../Components/Layout/Navbar/Navbar";
import { useLocation } from "react-router-dom"; // Import useLocation
import DateFilterComponent from "../Components/filter/Filter";
import Table  from "../../src/Components/Table/Table";
import axios from "axios";

const sampleDataPayment =  
    [
        {
          "payment_id": 1,
          "student_id": 1,
          "payment_date": "2025-01-15",
          "year": 2025,
          "month": 1,
          "checkit": false
        },
        {
          "payment_id": 2,
          "student_id": 2,
          "payment_date": "2025-02-10",
          "year": 2025,
          "month": 2,
          "checkit": false
        },
        {
          "payment_id": 3,
          "student_id": 3,
          "payment_date": "2025-03-05",
          "year": 2025,
          "month": 3,
          "checkit": false
        },
        {
          "payment_id": 4,
          "student_id": 4,
          "payment_date": "2025-04-20",
          "year": 2025,
          "month": 4,
          "checkit": false
        }
      ]
      
const sampleDataAttendance = [
    {
      "attendance_id": 1,
      "student_id": 1,
      "attendance_date": "2025-01-02",
      "checkit": false,
      "month": 1,
      "year": 2025
    },
    {
      "attendance_id": 2,
      "student_id": 2,
      "attendance_date": "2025-01-02",
      "checkit": false,
      "month": 1,
      "year": 2025
    },
    {
      "attendance_id": 3,
      "student_id": 3,
      "attendance_date": "2025-01-02",
      "checkit": false,
      "month": 1,
      "year": 2025
    },
    {
      "attendance_id": 4,
      "student_id": 4,
      "attendance_date": "2025-01-02",
      "checkit": false,
      "month": 1,
      "year": 2025
    }
  ]
  



const attendancecardData = [
    { title: "Total present", value: "30" },
    { title: "Total absent", value: "5" },
    {title : "total strength", value : "35"}
];

const paymentcardData = [
  { title: "Fees Paid", value: "34" },
  { title: "Fees Unpaid", value: "1" },

];




export default function Payment(){
  const [tableData, setTableData] = useState([]);
    const location = useLocation(); // Get the current location
    console.log("this is for testing",location.pathname.split("/"));
    const isPaymentPage = location.pathname.split("/").filter(Boolean).pop() === "payments";
    const cardsToShow = isPaymentPage ? paymentcardData : attendancecardData;
        ;


        useEffect(() => {
          const fetchData = async () => {
            try {
              const pathParts = location.pathname.split("/").filter(Boolean);
              const program = pathParts[0];
              const database = pathParts[1];
              console.log("hope this is woring ",program,  database)
              const resultData = await axios.get(`/api/stu_enq/${program}/${database}`,
                { withCredentials: true }
              );
              console.log("API is getting called:", resultData.data);
              setTableData(resultData.data);
            } catch (err) {
              console.error("Error fetching data:", err);
            }
          };
        
          fetchData();
        }, [location.pathname]); // optional: include this to re-fetch if route changes
        

        return (
        <>
        <div className={ps.maincontainer}>
        <div className={ps.sidebar}>
        <Menu />
         </div>
         <div className={ps.rightside} >
              <Navbar />
               <div className={ps.body}>

               <DateFilterComponent/>
            <div className={ps.Startcard}>
              
            {cardsToShow.map((item, index) => (
                <Startcard key={index} title={item.title} value={item.value} />
            ))}

            </div>



            </div>
            <Table datas = {location.pathname.split("/").filter(Boolean).pop() == "payments" ? sampleDataPayment : sampleDataAttendance} dataType = {location.pathname.split("/").filter(Boolean).pop()}/>




{}





        </div>
        </div>
        </>
    )
}