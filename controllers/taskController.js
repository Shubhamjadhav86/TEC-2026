const Task = require('../models/Task');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// @desc    Get all active tasks
// @route   GET /api/tasks
// @access  Private
exports.getAllTasks = catchAsync(async (req, res, next) => {
    const tasks = await Task.find({ isActive: true })
        .populate('phase')
        .sort({ deadline: 1 });

    // Add expired status to each task
    // Mongoose documents are not plain objects, so we need to call toObject() or use .lean() if we want to add properties easily without helper methods
    // However, the original code called a method `isExpired()`. If that method exists on the model, we need the document instance.
    const tasksWithStatus = tasks.map((task) => {
        // Check if isExpired is a method or virtual
        const isExpired =
            typeof task.isExpired === 'function' ? task.isExpired() : false;

        return {
            id: task._id,
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            maxMarks: task.maxMarks,
            phase: task.phase,
            isActive: task.isActive,
            isExpired: isExpired,
        };
    });

    res.status(200).json({
        success: true,
        count: tasks.length,
        tasks: tasksWithStatus,
    });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = catchAsync(async (req, res, next) => {
    const task = await Task.findById(req.params.id).populate('phase');

    if (!task) {
        return next(new AppError('Task not found', 404));
    }

    const isExpired =
        typeof task.isExpired === 'function' ? task.isExpired() : false;

    res.status(200).json({
        success: true,
        task: {
            id: task._id,
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            maxMarks: task.maxMarks,
            phase: task.phase,
            isActive: task.isActive,
            isExpired: isExpired,
        },
    });
});
