import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

const API_URL = "";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(`${API_URL}/api/tasks/${editingTask._id}`, formData);
      } else {
        await axios.post(`${API_URL}/api/tasks`, formData);
      }
      fetchTasks();
      resetForm();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${API_URL}/api/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const toggleComplete = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      await axios.put(`${API_URL}/api/tasks/${task._id}`, {
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const toggleLike = async (task) => {
    // Optimistic update
    setTasks(
      tasks.map((t) => (t._id === task._id ? { ...t, liked: !t.liked } : t))
    );
    try {
      await axios.put(`${API_URL}/api/tasks/${task._id}`, {
        liked: !task.liked,
      });
      // No need to fetch, as optimistic update is correct
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert on error
      setTasks(
        tasks.map((t) => (t._id === task._id ? { ...t, liked: task.liked } : t))
      );
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      dueDate: "",
    });
    setEditingTask(null);
    setShowForm(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "in-progress":
        return "#f59e0b";
      case "pending":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="App">
      <div className="animated-background"></div>
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <header className="app-header">
        <h1>Task Manager</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New Task"}
        </button>
      </header>

      {showForm && (
        <div className="task-form-container">
          <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>
          <form onSubmit={handleSubmit} className="task-form">
            <input
              type="text"
              placeholder="Task Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
            />
            <div className="form-row">
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingTask ? "Update Task" : "Create Task"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="filter-bar">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All ({tasks.length})
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending ({tasks.filter((t) => t.status === "pending").length})
        </button>
        <button
          className={filter === "in-progress" ? "active" : ""}
          onClick={() => setFilter("in-progress")}
        >
          In Progress ({tasks.filter((t) => t.status === "in-progress").length})
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed ({tasks.filter((t) => t.status === "completed").length})
        </button>
      </div>

      <ProgressBar
        completed={tasks.filter((task) => task.status === "completed").length}
        total={tasks.length}
      />

      <div className="tasks-container">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks">
            <p>No tasks found. Create your first task to get started</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task._id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <div className="task-badges">
                  <span
                    className="badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                  <span
                    className="badge"
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              {task.dueDate && (
                <p className="task-due-date">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}
              <div className="task-actions">
                <button
                  className={`btn-like ${task.liked ? "liked" : ""}`}
                  onClick={() => toggleLike(task)}
                  title="Like Task"
                >
                  {task.liked ? "❤️" : "🤍"}
                </button>
                <button
                  className={`btn-toggle ${
                    task.status === "completed" ? "completed" : "pending"
                  }`}
                  onClick={() => toggleComplete(task)}
                  title={
                    task.status === "completed"
                      ? "Mark as Pending"
                      : "Mark as Complete"
                  }
                >
                  {task.status === "completed" ? "↩️" : "✅"}
                </button>
                <button
                  className="btn-edit"
                  onClick={() => editTask(task)}
                  title="Edit Task"
                >
                  ✏️
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteTask(task._id)}
                  title="Delete Task"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
