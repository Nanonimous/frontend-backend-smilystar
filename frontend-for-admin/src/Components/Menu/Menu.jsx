import React, { useState ,useEffect} from "react";
import ms from './Menu.module.css';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


export default function Menu() {
    const [dashboard, setDashboard] = useState(true);

    useEffect(() => {
      if (window.location.href === "http://localhost:3000/") {
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
                            <li>
                                Dashboard   
                            </li>
                            {dashboard && (
                                <>
                                    <li>Students List</li>
                                    <li>Attendances</li>
                                    <li>Payments</li>
                                </>
                            )}
                            <li>Enquiry</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
