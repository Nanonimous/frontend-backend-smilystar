import React from "react";
import style from './Dashboard.module.css';
import { FaUser, FaCalendarAlt, FaDollarSign,FaPercentage  } from "react-icons/fa";
import Navbar from "../Layout/Navbar/Navbar.jsx";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Startcard from './Startcard.jsx';

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

                    <h2>Program Overview</h2>
                    <div className={style.programs}>
                        <Startcard title="Bharatanatyam" value="9" description="Classical Indian dance form from Tamil Nadu" change={79} trendColor="red" />
                        <Startcard title="Hindi" value="9" description="Language learning program for Hindi" change={80.9} trendColor="blue" />
                        <Startcard title="Daycare" value="21" description="Full-day childcare and early education program" change={80.5} trendColor="green" />
                        <Startcard title="Carnatic" value="11" description="Classical music tradition from South India" change={81.8} trendColor="purple" />
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