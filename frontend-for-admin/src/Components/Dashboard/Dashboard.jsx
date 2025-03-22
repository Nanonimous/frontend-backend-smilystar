import React from "react";
import style from './Dashboard.module.css';
import Navbar from "../Layout/Navbar/Navbar";
import Startcard from '../Dashboard/Startcard';
import ProgramCard from "./Programmingcard/Programmingcard";

import { FaUser, FaCalendarAlt, FaDollarSign,FaPercentage  } from "react-icons/fa";
import { FaMusic, FaLanguage, FaBaby, FaDrum } from "react-icons/fa";
export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div className={style.body}>
                <div className={style.container}>
                    <h1>Dashboard</h1>
                    <h3>Overview of your school's programs and performance metrics</h3>

                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <Startcard
                                title="Total Students"
                                icon={<FaUser />}
                                value="50"
                                description="Enrolled across all programs"
                                colorClass="bg-blue-100"
                            />
                            <Startcard
                                title="Attendance Rate"
                                icon={<FaCalendarAlt />}
                                value="80.6%"
                                description="Average across all programs"
                                colorClass="bg-green-100"
                            />
                            <Startcard
                                title="Payment Collected"
                                icon={<FaDollarSign />}
                                value="₹12.4k"
                                description="Total revenue collected"
                                colorClass="bg-yellow-100"
                            />
                             <Startcard
                                title="Payment Rate"
                                icon={<FaPercentage  />}
                                value="66%"
                                description="↓ 1.8% ₹616.4k pending"
                                colorClass="bg-yellow-100"
                            />
                    </div>

                    <h1>Program Overview</h1>
                    <div className={style.programs}>
                  
    
            <ProgramCard
            title="Bharatanatyam"
            icon={<FaDrum />}
            value={17}
            description="Classical Indian dance form from Tamil Nadu"
            attendance={83.6}
            payment={68}
            color="red"
            />
            <ProgramCard
            title="Hindi"
            icon={<FaLanguage />}
            value={8}
            description="Language learning program for Hindi"
            attendance={76.6}
            payment={67}
            color="blue"
            />
            <ProgramCard
            title="Daycare"
            icon={<FaBaby />}
            value={15}
            description="Full-day childcare and early education program"
            attendance={80.9}
            payment={70}
            color="green"
            />
            <ProgramCard
            title="Carnatic"
            icon={<FaMusic />}
            value={10}
            description="Classical music tradition from South India"
            attendance={79.4}
            payment={68}
            color="purple"
            />
        </div>
                    <h2>Quick Actions</h2>
                    <div className={style.quickActions}>
                        <button className={style.actionBtn}>Take Attendance</button>
                        <button className={style.actionBtn}>Record Payments</button>
                        <button className={style.actionBtn}>Student Records</button>
                        <button className={style.actionBtn}>Process Enquiries</button>
                    </div>
                </div>
            </div>
        </>
    );
}