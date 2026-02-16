const { generateToken } = require('../middleware/auth');
const Team = require('../models/Team');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Helper to set cookie
const sendTokenResponse = (user, statusCode, res, message, teamCode = null) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
      (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  user.password = undefined; // Remove password from output

  res.status(statusCode).cookie('token', token, cookieOptions).json({
    success: true,
    message,
    token,
    teamCode,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      teamId: user.teamId ? user.teamId._id : null,
    },
    team: user.teamId
      ? {
        id: user.teamId._id,
        teamName: user.teamId.teamName,
        teamCode: user.teamId.teamCode,
        collegeName: user.teamId.collegeName,
        rank: user.teamId.rank,
        totalPoints: user.teamId.totalPoints,
      }
      : null,
  });
};

// @desc    Register Leader & Create Team
// @route   POST /api/auth/register-leader
// @access  Public
exports.registerLeader = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    city,
    year,
    branch,
    instagram,
    linkedin,
    password,
    teamName,
    collegeName,
  } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !password || !teamName || !collegeName) {
    return next(new AppError('Please provide all required fields', 400));
  }

  // Check if user (email/phone) already exists
  const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExists) {
    return next(
      new AppError('User with this email or phone already exists', 400)
    );
  }

  // Check if team name already exists
  const teamExists = await Team.findOne({ teamName });
  if (teamExists) {
    return next(new AppError('Team name already taken', 400));
  }

  // Generate Team Code
  const teamCode = await Team.generateTeamCode();

  // Create User (Leader)
  const user = await User.create({
    name,
    email,
    phone,
    city,
    year,
    branch,
    instagram,
    linkedin,
    password,
    role: 'leader',
    instituteName: collegeName,
  });

  // Create Team
  const team = await Team.create({
    teamName,
    teamCode,
    collegeName,
    leader: user._id,
    members: [user._id],
  });

  // Update user with teamId
  user.teamId = team._id;
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 201, res, 'Team registered successfully', teamCode);
});

// @desc    Register Member & Join Team
// @route   POST /api/auth/register-member
// @access  Public
exports.registerMember = catchAsync(async (req, res, next) => {
  const { name, email, phone, year, branch, password, teamCode } = req.body;

  if (!name || !email || !phone || !password || !teamCode) {
    return next(new AppError('Please provide all required fields', 400));
  }

  // Check if user exists
  const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExists) {
    return next(
      new AppError('User with this email or phone already exists', 400)
    );
  }

  // Find Team by Code
  const team = await Team.findOne({ teamCode });
  if (!team) {
    return next(new AppError('Invalid Team Code', 404));
  }

  // Check team size limit (optional, e.g., max 5)
  if (team.members.length >= 5) {
    return next(new AppError('Team is full (Max 5 members)', 400));
  }

  // Create User (Member)
  const user = await User.create({
    name,
    email,
    phone,
    year,
    branch,
    password,
    role: 'member',
    teamId: team._id,
    instituteName: team.collegeName, // Inherit college from team
  });

  // Add member to team
  team.members.push(user._id);
  await team.save();

  sendTokenResponse(user, 201, res, 'Joined team successfully');
});

// @desc    Login user (Phone + Password)
// @route   POST /api/auth/login
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return next(new AppError('Please provide phone number and password', 400));
  }

  // Check for user
  const user = await User.findOne({ phone })
    .select('+password')
    .populate('teamId');

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res, 'Login successful');
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('teamId');

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      teamId: user.teamId ? user.teamId._id : null,
    },
    team: user.teamId
      ? {
        id: user.teamId._id,
        teamName: user.teamId.teamName,
        teamCode: user.teamId.teamCode,
        collegeName: user.teamId.collegeName,
        rank: user.teamId.rank,
        totalPoints: user.teamId.totalPoints,
      }
      : null,
  });
});
