// src/components/AddTask.js

/*
 ADD TASK COMPONENT
 Form to add new tasks to the list
 */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";

function AddTask() {
  const [taskInput, setTaskInput] = useState("");
  const dispatch = useDispatch();

  /*
   HANDLE SUBMIT
   Called when user submits the form
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validate: Don't add empty tasks
    if (taskInput.trim() === "") {
      alert("⚠️ Please enter a task description!");
      return;
    }

    // Dispatch addTask action with description
    dispatch(addTask(taskInput.trim()));

    // Clear input field
    setTaskInput("");

    // Show success message
    console.log("✅ Task added successfully!");
  };

  return (
    <div className="add-task-container">
      <h3 className="section-title">
        <span className="section-icon">➕</span>
        Add New Task
      </h3>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            className="task-input"
            placeholder="What needs to be done?"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="add-btn">
            <span className="btn-text">Add Task</span>
            <span className="btn-icon">+</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
