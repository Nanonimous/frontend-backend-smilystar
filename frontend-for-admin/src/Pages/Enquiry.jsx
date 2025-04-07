import React, { useEffect,useState  } from "react";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom"; // Import useLocation


import Startcard from "../Components/Dashboard/Startcard/Startcard"
import ec from "../Styles/Enquiry.module.css";
import Menu from "../Components/Layout/Sidebar/Menu";
import Navbar from "../Components/Layout/Navbar/Navbar";
import EnquiryTable from "../Components/Enquiry/EnquiryTable";


  const enquirycardData = [
    { title: "Total Enquiries", value: "500" },
    { title: "New", value: "200" },
    { title: "Contacted", value: "200" },
    { title: "Enrolled", value: "250" },
    { title: "Closed", value: "50" }
];

const studentscardData = [
  { title: "Total Enquiries", value: "500" },
  { title: "Active Students", value: "200" },
  { title: "Inactive Students", value: "200" },
  { title: "Average Age", value: "250" },

];

export default function Enquiry(){
  const [data, setData] = useState([]);
  const location = useLocation(); // Get the current location
  const [searchParams] = useSearchParams(); // Get URL parameters

  const program = searchParams.get("program") || "dayCare";

  // Check if the current page is 'enquiry' or 'student' based on the URL
  const isEnquiryPage = location.pathname.toLowerCase().endsWith("/enquiry");

  const cardsToShow = isEnquiryPage ? enquirycardData : studentscardData;

  const tablename= isEnquiryPage ? "enquiry" : "students";

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log("hello to fetch data from table");
            
            const response = await axios.get(`http://localhost:5000/api/stu_enq/${program}/${tablename}`); // Replace with your API endpoint
            console.log("API Response:", response.data); 
            setData(response.data);   
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []); 

    return(
<>
<div className={ec.maincontainer}>
        <div className={ec.sidebar}>
        <Menu />
         </div>
         <div className={ec.rightside} >
              <Navbar />
               <div className={ec.body}>

               
            <div className={ec.Startcard}>
              
            {cardsToShow.map((item, index) => (
                <Startcard key={index} title={item.title} value={item.value} />
            ))}

            </div>

         

            <EnquiryTable datas={data } dataType={tablename} />

            </div>



</div>

</div>


</>


    );
}