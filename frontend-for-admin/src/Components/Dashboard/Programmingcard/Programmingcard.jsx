import pc from './Programmingcard.module.css';
import React from "react";
import { FaArrowRight } from "react-icons/fa";

                              
export default function ProgramCard({ title, dataKey, icon, description, attendance, payment, color, path, count }) {
  return (
    <div className={`${pc.card} ${pc[color]}`}>
      <div className={pc.top}>
        <div className={pc.progresstop} style={{ width: `95%` }}></div>
      </div>

      <div className={pc.cardinner}>
        <div className={pc.cardHeader}>
          <div className={pc.cardIcon}>{icon}</div>
          <h2 className={pc.cardTitle}>{title}</h2>
          <span className={pc.cardValue}>{count?.[dataKey] ?? "N/A"}</span>
        </div>

        <p className={pc.cardDescription}>{description}</p>

        <div className={pc.cardMetrics}>
          <div className={pc.metric}>
            <span>Attendance Rate</span>
            <div className={pc.progressBar}>
              <div className={pc.progress} style={{ width: `${attendance}%` }}></div>
            </div>
            <span className={pc.rate}>{attendance}%</span>
          </div>

          <div className={pc.metric}>
            <span>Payment Rate</span>
            <div className={pc.progressBar}>
              <div className={pc.progress} style={{ width: `${payment}%` }}></div>
            </div>
            <span className={pc.rate}>{payment}%</span>
          </div>
        </div>

        <a href={path}>
          <button className={pc.viewButton}>
            View Students <FaArrowRight />
          </button>
        </a>
      </div>
    </div>
  );
}
