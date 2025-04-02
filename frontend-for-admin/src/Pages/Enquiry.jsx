import React, { useEffect,useState  } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation


import Startcard from "../Components/Dashboard/Startcard/Startcard"
import ec from "../Styles/Enquiry.module.css";
import Menu from "../Components/Layout/Sidebar/Menu";
import Navbar from "../Components/Layout/Navbar/Navbar";
import EnquiryTable from "../Components/Enquiry/EnquiryTable";



const enquiries = [

    {
      id: "ENQ004",
      name: "Arjun Nair",
      contact: "9876543213",
      program: "Daycare",
      date: "2023-06-12",
      status: "New",
      email: "arjun.nair@example.com",
      mobile: "9876543213",
      pincode: "600001",
      country: "India",
      state: "Tamil Nadu",
      city: "Chennai",
      location: "T Nagar",
      age: 28,
      gender: "M",
      checkit: false
    },
    {
      id: "ENQ005",
      name: "Divya Reddy",
      contact: "9876543214",
      program: "Bharatanatyam",
      date: "2023-06-07",
      status: "Contacted",
      email: "divya.reddy@example.com",
      mobile: "9876543214",
      pincode: "500001",
      country: "India",
      state: "Telangana",
      city: "Hyderabad",
      location: "Banjara Hills",
      age: 26,
      gender: "F",
      checkit: true
    },
    {
      id: "ENQ006",
      name: "Rahul Singh",
      contact: "9876543215",
      program: "Hindi",
      date: "2023-06-01",
      status: "Closed",
      email: "rahul.singh@example.com",
      mobile: "9876543215",
      pincode: "700001",
      country: "India",
      state: "West Bengal",
      city: "Kolkata",
      location: "Park Street",
      age: 35,
      gender: "M",
      checkit: false
    },
   
  ];
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

  // Check if the current page is 'enquiry' or 'student' based on the URL
  const isEnquiryPage = location.pathname === "/enquiry"; // Adjust the path as needed
  const cardsToShow = isEnquiryPage ? enquirycardData : studentscardData;
  const tablename= isEnquiryPage ? "enquiry" : "students";

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/stu_enq/${tablename}`); // Replace with your API endpoint
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

            <EnquiryTable enquiries={enquiries} dataType={tablename} />


            </div>



</div>

</div>


</>


    );
}