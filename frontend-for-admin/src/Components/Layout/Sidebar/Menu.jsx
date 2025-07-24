import React, { useState, useEffect } from "react";
import ms from './Menu.module.css';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Menu() {
  const { program } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // 🔁 Better than window.location.href
  const [dashboard, setDashboard] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const domain = process.env.REACT_APP_ADMIN_DOMAIN;

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); 
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "/enquiry") {
      setDashboard(false);
    }
  }, [location.pathname]);

  return (
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
                <li onClick={() => handleNavigation(`/${program}/students`)}>Students List</li>
                <li onClick={() => handleNavigation(`/${program}/attendance`)}>Attendances</li>
                <li onClick={() => handleNavigation(`/${program}/payments`)}>Payments</li>
              </>
            )}

            <li onClick={() => handleNavigation("/enquiry")}>Enquiry</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
