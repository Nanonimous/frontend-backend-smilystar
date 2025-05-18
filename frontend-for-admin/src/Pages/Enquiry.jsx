import React, { useEffect,useState  } from "react";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom"; // Import useLocation


import Startcard from "../Components/Dashboard/Startcard/Startcard"
import ec from "../Styles/Enquiry.module.css";
import Menu from "../Components/Layout/Sidebar/Menu";
import Navbar from "../Components/Layout/Navbar/Navbar";
import EnquiryTable from "../Components/Enquiry/EnquiryTable";






export default function Enquiry(){
  const [data, setData] = useState([]);
  const location = useLocation(); 
  const [searchParams] = useSearchParams(); 
  const [totalEn, setTotalEn] = useState(0);
  const [closeEn, setCloseEn] = useState(0);
  const [newEn, setNewEn] = useState(0);
  const [contactedEn, setContactedEn] = useState(0);
  const [enrolledEn, setEnrolledEn] = useState(0);
  const [totalStud, setTotalStud] = useState(0);

  const program = searchParams.get("program") || "daycare";

        const enquirycardData = [
          { title: "Total Enquiries", value: totalEn },
          { title: "New", value:  newEn },
          { title: "Contacted", value: contactedEn },
          { title: "Enrolled", value: enrolledEn },
          { title: "Closed", value: closeEn}
      ];


      const studentscardData = [
        { title: "Total students", value: totalStud }
      ];
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
              if (tablename === "enquiry") {
                    
          let a = response.data.filter(tn => tn.checkit == "new");        
          let b = response.data.filter(tn => tn.checkit == "contacted");        
          let c = response.data.filter(tn => tn.checkit == "enrolled"); 
          let d = response.data.filter(tn => tn.checkit == "closed"); 
                setTotalEn(response.data.length);
                setCloseEn(d.length)
                setNewEn(a.length)
                setEnrolledEn(c.length)
                setContactedEn(b.length)
              } else {
                setTotalStud(response.data.length);
              }
            setData(response.data);   
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [closeEn,newEn,contactedEn,enrolledEn,totalStud,totalEn]); 

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

            <EnquiryTable datas={data} totalEnset = {setTotalEn}  newEnset = {setNewEn} closeEnset = {setCloseEn} contactedEnset = {setContactedEn} enrolledEnset = {setEnrolledEn} totalStudset = {setTotalStud} dataType={tablename} progs = {program}/>

            </div>



</div>

</div>


</>


    );
}