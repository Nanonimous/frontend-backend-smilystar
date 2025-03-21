import React from "react";
import sc from './Startcard.module.css';

export default function CardComponent({
  title,
  icon,
  value,
  change,
  trendArrow,
  trendColor,
  description,
  colorClass,
  animationDelayClass,
}) {
  return (
    <div className={`${sc.card} ${sc.overflowHidden} ${animationDelayClass}`}>
      {colorClass && <div className={`${sc.cardHeaderBar} ${colorClass}`} />}
      <div className={sc.cardHeader}>
        <h3 className={sc.cardTitle}>{title}</h3>
        {icon && <div className={sc.cardIcon}>{icon}</div>}
      </div>
      <div className={sc.cardContent}>
        <div className={sc.cardValue}>{value}</div>
        <div className={sc.cardInfo}>
          {change !== undefined && (
            <span className={`${sc.cardChange} ${trendColor}`}>
              {trendArrow} {Math.abs(change)}%
            </span>
          )}
          {description && (
            <p className={sc.cardDescription}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
