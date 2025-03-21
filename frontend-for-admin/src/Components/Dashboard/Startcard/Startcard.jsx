import React from "react";
import sc from './Startcard.module.css';

export default function CardComponent({
  title,
  icon,
  value,
  description,
  colorClass
}) {
  return (
    <div className={`${sc.card} ${colorClass}`}>
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

