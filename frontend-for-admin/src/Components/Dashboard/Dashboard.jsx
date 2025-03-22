import React from "react";
import style from './Dashboard.module.css';
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

                    <div className={style.cards}>
                        <Startcard title="Total Students" value="50" description="Enrolled across all programs" icon={<FaArrowUp />} trendArrow={<FaArrowDown />} trendColor="red" change={2.5} />
                        <Startcard title="Attendance Rate" value="80.6%" description="Average across all programs" icon={<FaArrowUp />} trendArrow={<FaArrowDown />} trendColor="red" change={2.5} />
                        <Startcard title="Payment Collected" value="₹1272.4k" description="Total revenue collected" icon={<FaArrowUp />} trendArrow={<FaArrowUp />} trendColor="green" change={5.2} />
                        <Startcard title="Payment Rate" value="70%" description="₹539.7k pending" icon={<FaArrowDown />} trendArrow={<FaArrowDown />} trendColor="red" change={1.8} />
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