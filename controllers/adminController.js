const Phase = require('../models/Phase');
const Task = require('../models/Task');
const Team = require('../models/Team');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private (Admin/SuperAdmin)
exports.getStats = catchAsync(async (req, res, next) => {
  const totalTeams = await Team.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalEvaluators = await User.countDocuments({ role: 'evaluator' });

  // Count users by role
  const leaders = await User.countDocuments({ role: 'leader' });
  const members = await User.countDocuments({ role: 'member' });

  // Get active phase
  const currentPhase = await Phase.findOne({ isActive: true });

  res.status(200).json({
    success: true,
    stats: {
      totalTeams,
      totalParticipants: leaders + members,
      totalEvaluators,
      totalUsers,
      currentPhase: currentPhase ? currentPhase.name : 'No Active Phase',
    },
  });
});

// @desc    Get All Teams
// @route   GET /api/admin/teams
// @access  Private (Admin/SuperAdmin)
exports.getAllTeams = catchAsync(async (req, res, next) => {
  const teams = await Team.find()
    .populate('leader', 'name email phone')
    .populate('members', 'name email phone')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: teams.length,
    teams,
  });
});

// --- Phase Management ---

// @desc    Create a new Phase
// @route   POST /api/admin/phases
// @access  Private (Admin/SuperAdmin)
exports.createPhase = catchAsync(async (req, res, next) => {
  const { name, startDate, endDate, description } = req.body;

  const phase = await Phase.create({
    name,
    startDate,
    endDate,
    description,
  });

  res.status(201).json({
    success: true,
    phase,
  });
});

// @desc    Get all Phases
// @route   GET /api/admin/phases
// @access  Private (Admin/SuperAdmin)
exports.getPhases = catchAsync(async (req, res, next) => {
  const phases = await Phase.find().sort({ startDate: 1 });
  res.status(200).json({
    success: true,
    count: phases.length,
    phases,
  });
});

// @desc    Set Active Phase
// @route   PUT /api/admin/phases/:id/activate
// @access  Private (Admin/SuperAdmin)
exports.activatePhase = catchAsync(async (req, res, next) => {
  // Deactivate all phases first
  await Phase.updateMany({}, { isActive: false });

  // Activate selected phase
  const phase = await Phase.findByIdAndUpdate(
    req.params.id,
    { isActive: true },
    { new: true }
  );

  if (!phase) {
    return next(new AppError('Phase not found', 404));
  }

  res.status(200).json({
    success: true,
    message: `Phase ${phase.name} is now active`,
    phase,
  });
});

// --- Task Management ---

// @desc    Create a new Task
// @route   POST /api/admin/tasks
// @access  Private (Admin/SuperAdmin)
exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, deadline, maxMarks, phaseId } = req.body;

  // Verify phase exists
  const phase = await Phase.findById(phaseId);
  if (!phase) {
    return next(new AppError('Phase not found', 404));
  }

  const task = await Task.create({
    title,
    description,
    deadline,
    maxMarks,
    phase: phaseId,
  });

  res.status(201).json({
    success: true,
    task,
  });
});

// @desc    Get All Tasks (grouped by phase optional)
// @route   GET /api/admin/tasks
// @access  Private (Admin/SuperAdmin)
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find().populate('phase', 'name');
  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});
