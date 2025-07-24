import React, { useEffect, useState } from "react";
import style from '../Styles/Dashboard.module.css';
import Navbar from "../Components/Layout/Navbar/Navbar";
import Startcard from '../Components/Dashboard/Startcard/Startcard';
import ProgramCard from "../Components/Dashboard/Programmingcard/Programmingcard";
import cardsData from "../data/StartcardsData";
import programsData from "../data/programcardData";
import Menu from "../Components/Layout/Sidebar/Menu";
import axios from "axios"


const Domain = process.env.REACT_APP_BACKEND_URL;
export default function Dashboard() {   
    
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu state
    const [notis, setNotis] = useState();
    const [stuCount,setStuCount] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
          try {
      
            const response = await axios.get(`${Domain}api/stu_enq/daycare/enquiry`,{
              withCredentials: true, 
            });
      
            const not = response.data.filter(tn => tn.checkit === "new");
            setNotis(not.length);
      
            const progs = ["bharatanatyam", "hindiclass", "daycare", "carnatic", "violin", "tabla", "piano"];
            
            const studentCounts = await Promise.all(
              progs.map(async (program) => {
                const res = await axios.get(`${Domain}api/stu_enq/${program}/students`,{
      withCredentials: true, 
    });
                return res.data.length;
              })
            );
      
            setStuCount(studentCounts);
      
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);

    return (
        <>
<div className={style.maincontainer}>
        <div className={style.sidebar}>
        <Menu />
         </div>
         <div className={style.rightside} >
            <Navbar notCounter = {notis}/>
               
            <div className={style.body}>
                <div className={style.container}>
                    
                    <h1>Dashboard</h1>
                    <h3>Overview of your school's programs and performance metrics</h3>

                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                           
                            {cardsData.map((card, index) => (
                                    <Startcard
                                    key={index}
                                    title={card.title}
                                    icon={card.icon}
                                    value={stuCount.reduce((a, b) => a + b, 0)}
                                    description={card.description}
                                    colorClass={card.colorClass}
                                    />
                                ))}
                    </div>

                    <h1>Program Overview</h1>
                    <div className={style.programs}>
                  
                    {programsData.map((program, index) => (
                            <ProgramCard  
                                key={index}
                                title={program.title}
                                icon={program.icon}
                                value={program.value}
                                description={program.description}
                                attendance={program.attendance}
                                payment={program.payment}
                                color={program.color}
                                path={program.path}
                                count={stuCount}
                                dataKey={index} // pass the index instead of using reserved 'key'
                            />
                            ))}

                </div>
                </div>
            </div>

            </div>

            </div>
        </>
    );
}

