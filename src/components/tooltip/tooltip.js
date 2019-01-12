import React from "react";
import "./tooltip.css";

export const Tooltip = ({ label, message }) => {
  return (
    <div className="tooltip">
      {label}
      <span className="tooltiptext">{message}</span>
    </div>
  );
};
