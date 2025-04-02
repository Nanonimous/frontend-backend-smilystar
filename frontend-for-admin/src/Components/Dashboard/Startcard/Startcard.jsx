// Startcard.jsx
import React from "react";
import sc from "./Startcard.module.css";

export default function Startcard({
  title,
  icon,
  value,
  description,
  colorClass,
}) {
var totalCards;
  const isComplete = title && icon && value && description && colorClass;

  // Determine width dynamically
  const cardWidth = isComplete ? "20%" : "12%"; 
  return (

    
    <div className={`${sc.card} ${colorClass}`} style={{ width: cardWidth }}>
      <div className={sc.first}>
        <h3 className={sc.title}>{title}</h3>
        <div className={sc.icon}>{icon}</div>
      </div>
      <div className={sc.content}>
        <p className={sc.value}>{value}</p>
        <p className={sc.description}>{description}</p>
      </div>
    </div>
  );
}
