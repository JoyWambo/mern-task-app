// ============================================================================
// Task Routes - API Endpoints
// ============================================================================
// Handles all CRUD operations for tasks
// ============================================================================

const express = require("express");
const router = express.Router();
const Task = require("../models/task");
// const { getTasks } = require("../controllers/taskController.js");

// ============================================================================
// GET /api/tasks - Get all tasks
// ============================================================================
router.get("/", async (req, res) => {
  try {
    const { search, priority, status } = req.query;
    let query = {};

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Fetch tasks with filters, sorted by creation date (newest first)
    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching tasks",
      error: error.message,
    });
  }
});

// ============================================================================
// GET /api/tasks/:id - Get single task by ID
// ============================================================================
router.get("/:id", async (req, res) => {
  try {
    // const { id } = req.params;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching task",
      error: error.message,
    });
  }
});

// ============================================================================
// POST /api/tasks - Create new task
// ============================================================================
router.post("/", async (req, res) => {
  try {
    const { title, description, dueDate, liked, status, priority } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // Create new task
    const task = await Task.create({
      title,
      description,
      dueDate,
      liked: liked || false,
      status: status || "pending",
      priority: priority || "medium",
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating task",
      error: error.message,
    });
  }
});

// ============================================================================
// PUT /api/tasks/:id - Update task
// ============================================================================
router.put("/:id", async (req, res) => {
  try {
    // Only update fields that are provided
    const updateFields = {};
    if (req.body.title !== undefined) updateFields.title = req.body.title;
    if (req.body.description !== undefined)
      updateFields.description = req.body.description;
    if (req.body.dueDate !== undefined) updateFields.dueDate = req.body.dueDate;
    if (req.body.liked !== undefined) updateFields.liked = req.body.liked;
    if (req.body.status !== undefined) updateFields.status = req.body.status;
    if (req.body.priority !== undefined)
      updateFields.priority = req.body.priority;

    // Find and update task
    const task = await Task.findByIdAndUpdate(req.params.id, updateFields, {
      new: true, // Return updated document
      runValidators: true, // Run schema validators
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating task",
      error: error.message,
    });
  }
});

// ============================================================================
// DELETE /api/tasks/:id - Delete task
// ============================================================================
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting task",
      error: error.message,
    });
  }
});

// Export router
module.exports = router;
