import React from "react";
import ns from './Navbar.module.css';

export default function Navbar() {
    return (
        <>
            <div className={ns.nav}>
                <div className={ns.left}>
                    <h1>Daycare Admin</h1>
                </div>

                <div className={ns.right}>
                    <button className={ns.programBtn}>All Programs</button>
                    <div className={ns.notification}>
                        <img 
                            src="images/navbar_img/bell.png" 
                            alt="notification icon" 
                            className={ns.icon}
                        />
                        <span className={ns.badge}>3</span>
                    </div>
                    <div className={ns.profile}>

                    </div>
                </div>
            </div>
        </>
    )
}
