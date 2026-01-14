import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  loading,
  onToggleComplete,
  onToggleLiked,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3 className="empty-title">No tasks yet</h3>
        <p className="empty-message">Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      <div className="tasks-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={task._id}
            task={task}
            index={index}
            onToggleComplete={onToggleComplete}
            onToggleLiked={onToggleLiked}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
