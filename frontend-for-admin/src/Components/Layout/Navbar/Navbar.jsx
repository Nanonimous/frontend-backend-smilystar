import React, { useEffect } from "react";
import ns from './Navbar.module.css';
import { useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";

export default function Navbar({notCounter}) {
    const navigate = useNavigate(); 
      const location = useLocation(); // 🔁 Better than window.location.href
    const [showDropdown, setShowDropdown] = useState(false);
    const [ispage,setispage] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };
    const handleProgramClick = (program) => {
        const basePath = '/'; // You can change this if needed
        const path = `${basePath}${program}/students`;
        navigate(path);
        window.location.reload();  
        
        setShowDropdown(false); // Close dropdown after navigation
    };
    const handleLogout = () =>{
          document.cookie = "token=; path=/; max-age=0";
            window.location.href = "/login";
    }   

useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setispage(true);
    }
  }, [location.pathname]);
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
                        {["bharatanatyam", "hindiclass", "daycare", "carnatic", "violin", "tabla", "piano"].map((program, index) => (
                            <li key={index} onClick={() => handleProgramClick(program)}>
                                {program}
                            </li>
                        ))}
                    </ul>
                    </div>

                     {ispage && (<div className={ns.notification}>
                        <img 
                            src="images/navbar_img/bell.png" 
                            alt="notification icon" 
                            className={ns.icon}
                            onClick={()=>navigate("/enquiry")}
                        />
                        <span className={ns.badge}>{notCounter}</span>
                    </div>)}
                    
                    <button className={ns.logout} onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </>
    )
}
