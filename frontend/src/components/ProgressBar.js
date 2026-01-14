import React from "react";

const ProgressBar = ({ completed, total }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="progress-dashboard">
      <div
        className="circular-progress"
        style={{
          background: `conic-gradient(#10b981 ${percentage}%, #e5e7eb 0)`,
        }}
      >
        <div className="progress-inner">
          <span className="progress-value">{Math.round(percentage)}%</span>
          <span className="progress-label">Done</span>
        </div>
      </div>
      <span className="task-count">
        {completed}/{total} tasks
      </span>
    </div>
  );
};

export default ProgressBar;
