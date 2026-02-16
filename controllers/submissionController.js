const fs = require('fs');
const path = require('path');

const Submission = require('../models/Submission');
const Task = require('../models/Task');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// @desc    Submit a Task (Upload PDF)
// @route   POST /api/submissions/:taskId
// @access  Private (Leader/Member)
exports.submitTask = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload a PDF file', 400));
  }

  const taskId = req.params.taskId;
  const teamId = req.user.teamId; // From authMiddleware

  // Check if task exists and is active
  const task = await Task.findById(taskId).populate('phase');
  if (!task) {
    // Cleanup uploaded file
    fs.unlinkSync(req.file.path);
    return next(new AppError('Task not found', 404));
  }

  // Check deadline
  if (new Date() > new Date(task.deadline)) {
    // Delete uploaded file if deadline passed
    fs.unlinkSync(req.file.path);
    return next(new AppError('Deadline has passed', 400));
  }

  // Check if already submitted
  let submission = await Submission.findOne({ teamId, taskId });

  if (submission) {
    // Update existing submission
    // Delete old file
    const oldPath = path.join(
      __dirname,
      '..',
      'public',
      submission.fileUrl.replace(/^\//, '')
    ); // Ensure correct path construction
    if (fs.existsSync(oldPath)) {
      try {
        fs.unlinkSync(oldPath);
      } catch (err) {
        console.error('Error deleting old file:', err);
      }
    }

    submission.fileName = req.file.filename;
    submission.fileUrl = `/uploads/submissions/${req.file.filename}`;
    submission.submittedAt = Date.now();
    await submission.save();
  } else {
    // Create new submission
    submission = await Submission.create({
      teamId,
      taskId,
      fileName: req.file.filename,
      fileUrl: `/uploads/submissions/${req.file.filename}`,
      status: 'pending',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Task submitted successfully',
    submission,
  });
});

// @desc    Get My Submission for a Task
// @route   GET /api/submissions/:taskId/me
// @access  Private (Leader/Member)
exports.getMySubmission = catchAsync(async (req, res, next) => {
  const submission = await Submission.findOne({
    teamId: req.user.teamId,
    taskId: req.params.taskId,
  });

  if (!submission) {
    return next(new AppError('No submission found', 404));
  }

  res.status(200).json({
    success: true,
    submission,
  });
});

// @desc    Get All My Submissions
// @route   GET /api/submissions
// @access  Private (Leader/Member)
exports.getAllMySubmissions = catchAsync(async (req, res, next) => {
  const teamId = req.user.teamId;
  const submissions = await Submission.find({ teamId });

  res.status(200).json({
    success: true,
    submissions,
  });
});

// @desc    Get All Submissions for a Task (Admin/Evaluator)
// @route   GET /api/submissions/task/:taskId
// @access  Private (Admin/Evaluator)
exports.getSubmissionsByTask = catchAsync(async (req, res, next) => {
  const submissions = await Submission.find({ taskId: req.params.taskId })
    .populate('teamId', 'teamName teamCode')
    .sort({ submittedAt: -1 });

  res.status(200).json({
    success: true,
    count: submissions.length,
    submissions,
  });
});

// @desc    Grade a Submission
// @route   PUT /api/submissions/:id/grade
// @access  Private (Admin/Evaluator)
exports.gradeSubmission = catchAsync(async (req, res, next) => {
  const { marks, remarks } = req.body;

  const submission = await Submission.findByIdAndUpdate(
    req.params.id,
    {
      marks,
      remarks,
      status: 'graded',
    },
    { new: true }
  );

  if (!submission) {
    return next(new AppError('Submission not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Submission graded successfully',
    submission,
  });
});
