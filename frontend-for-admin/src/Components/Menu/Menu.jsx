import React from "react";
import ms from './Menu.module.css';
import { useNavigate,useLocation } from "react-router-dom";
import { useRef,useState } from 'react';

export default function Menu(){
    // const navigate=useNavigate();
    // const location = useLocation();
    const url = window.location.href;
    const [dashboard,setDashboard]=useState(url !== "http://localhost:3000/");
   
    
    return (
        <>
        <div className="menu">
            <div className={ms.list}>
                <ul>
                    <li>
                        Dashboard
                    </li>
                    {dashboard && (
                        <>
                        <li>Students list</li>
                        <li>attendances</li>
                        <li>Payments</li>
                        </>
                    )}
                   
                    <li>

                        Enquiry
                    </li>
                </ul>
            </div>
        </div>
    </>

    )
   
}