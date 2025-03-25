import React from "react";
import { FaCalendarCheck, FaDollarSign, FaUser, FaThumbsUp } from "react-icons/fa";
import qc from "./Quickaction.module.css";

export default function QuickActions() {
  const actions = [
    {
      title: "Take Attendance",
      description: "Mark today's attendance",
      icon: <FaCalendarCheck size={24} />,
      bgColor: "lightblue",
      iconColor: "blue",
    },
    {
      title: "Record Payments",
      description: "Update payment records",
      icon: <FaDollarSign size={24} />,
      bgColor: "lightgreen",
      iconColor: "green",
    },
    {
      title: "Student Records",
      description: "View student information",
      icon: <FaUser size={24} />,
      bgColor: "lightpink",
      iconColor: "purple",
    },
    {
      title: "Process Enquiries",
      description: "Manage new enquiries",
      icon: <FaThumbsUp size={24} />,
      bgColor: "lightyellow",
      iconColor: "orange",
    },
  ];

  return (
    <div className={qc["quick-actions"]}>
  
      <div className={qc["quick-actions-cards"]}>
        {actions.map((action, index) => (
          <div className={qc["action-card"]} key={index}>
            <div
              className={qc["action-icon"]}
              style={{ backgroundColor: action.bgColor, color: action.iconColor }}
            >
              {action.icon}
            </div>
            <h4 className={qc["action-title"]}>{action.title}</h4>
            <p className={qc["action-description"]}>{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
