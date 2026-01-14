import React from "react";

const TaskItem = ({
  task,
  index,
  onToggleComplete,
  onToggleLiked,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`task-item ${task.completed ? "task-done" : ""}`}>
      <div className="task-number">#{index + 1}</div>

      <div
        className={`task-checkbox ${task.completed ? "checked" : ""}`}
        onClick={() => onToggleComplete(task)}
        role="checkbox"
        aria-checked={task.completed}
      >
        {task.completed && <span className="checkmark">✓</span>}
      </div>

      <div className="task-content">
        <div className="task-title">{task.title}</div>
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}
        {task.dueDate && (
          <div className="task-due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
        <div className="task-priority">Priority: {task.priority}</div>
      </div>

      <div className="task-actions">
        <button
          className={`action-btn like-btn ${task.liked ? "liked" : ""}`}
          onClick={() => onToggleLiked(task)}
          title="Like"
        >
          {task.liked ? "❤️" : "🤍"}
        </button>
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(task)}
          title="Edit"
        >
          ✏️
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(task._id)}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
