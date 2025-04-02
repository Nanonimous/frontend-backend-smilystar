import React, { useState ,useEffect} from "react";
import ms from './Menu.module.css';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";


export default function Menu() {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState(true);

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the given path
       
        setIsMenuOpen(false); // Close menu after clicking (optional)
        window.location.reload(); 
        
      };

  useEffect(() => {
  if (window.location.href === "http://localhost:3000/" || window.location.href === "http://localhost:3000/enquiry") {
    console.log("it is dashboard");
    setDashboard(false);
  }
}, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <div className={ms.menuContainer}>
                <div className={ms.hamburger} onClick={toggleMenu}>
                    {isMenuOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
                </div>
                <div className={`${ms.menu} ${isMenuOpen ? ms.menuOpen : ''}`}>
                    <div className={ms.list}>
                        <ul>
                        <li onClick={() => handleNavigation("/")}>Dashboard</li>
                            {dashboard && (
                                <>
                                    <li>Students List</li>
                                    <li>Attendances</li>
                                    <li>Payments</li>
                                </>
                            )}
                            <li></li>
                            <li onClick={() => handleNavigation("/enquiry")}>Enquiry</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
