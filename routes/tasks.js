const express = require('express');

const router = express.Router();
const { getAllTasks, getTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

// @route   GET /api/tasks
// @desc    Get all active tasks
// @access  Private
router.get('/', protect, getAllTasks);

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', protect, getTask);

module.exports = router;
