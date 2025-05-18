import React from "react";
import ns from './Navbar.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate(); 
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };
    const handleProgramClick = (program) => {
        const basePath = '/'; // 👈 You can change this if needed
        const path = `${basePath}${program}/students`;
        navigate(path);
        setShowDropdown(false); // Close dropdown after navigation
    };

    return (
        <>
            <div className={ns.nav}>
                <div className={ns.left}>
                    <h1>Daycare Admin</h1>
                </div>

                <div className={ns.right}>


 <div className={ns.dropdown}>
                        <button className={ns.programBtn} onClick={toggleDropdown}>
                            All Programs
                        </button>
                        <ul className={`${ns.dropdownContent} ${showDropdown ? ns.show : ''}`}>
                        {["Bharatanatyam", "Hindi", "Daycare", "Carnatic", "Violin", "Mridangam", "Piano"].map((program, index) => (
                            <li key={index} onClick={() => handleProgramClick(program)}>
                                {program}
                            </li>
                        ))}
                    </ul>
                    </div>


                    <div className={ns.notification}>
                        <img 
                            src="images/navbar_img/bell.png" 
                            alt="notification icon" 
                            className={ns.icon}
                        />
                        <span className={ns.badge}>4</span>
                    </div>
                    <div className={ns.profile}>

                    </div>
                </div>
            </div>
        </>
    )
}
