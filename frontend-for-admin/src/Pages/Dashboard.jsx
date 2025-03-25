import React, { useState } from "react";
import style from '../Styles/Dashboard.module.css';
import Navbar from "../Components/Layout/Navbar/Navbar";
import Startcard from '../Components/Dashboard/Startcard/Startcard';
import ProgramCard from "../Components/Dashboard/Programmingcard/Programmingcard";
import Quickaction from "../Components/Dashboard/Quickaction/Quickaction";
import cardsData from "../data/StartcardsData";
import programsData from "../data/programcardData";
import Menu from "../Components/Layout/Sidebar/Menu";

export default function Dashboard() {   
    
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu state

    return (
        <>
<div className={style.maincontainer}>
        <div className={style.sidebar}>
        <Menu />
         </div>
         <div className={style.rightside} >
            <Navbar />
               
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
                                    value={card.value}
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
                                />
                            ))}
                </div>
                    <h2>Quick Actions</h2>
                        <Quickaction />
                </div>
            </div>

            </div>

            </div>
        </>
    );
}