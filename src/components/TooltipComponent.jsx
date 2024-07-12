import React from "react";

const TooltipComponent = ({ children, text }) => {
  return (
    <div className="tooltip-container relative inline-block">
      <span className="tooltip-trigger">{children}</span>
      <span className="tooltip text-xs rounded shadow-lg bg-rose-600 text-gray-300">
        {text}
        <span className="tooltip-arrow"></span>
      </span>
    </div>
  );
};

export default TooltipComponent;
