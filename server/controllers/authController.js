import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { email, password, fullName, phone, username } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({
      email: email.toLowerCase().trim(),
      password,
      fullName: fullName || "",
      phone: phone || "",
      username: username || "",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        username: user.username,
        avatarUrl: user.avatarUrl,
        role: user.role,
        user_metadata: {
          full_name: user.fullName,
          phone: user.phone,
          username: user.username,
        },
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      user: {
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        username: user.username,
        avatarUrl: user.avatarUrl,
        role: user.role,
        user_metadata: {
          full_name: user.fullName,
          phone: user.phone,
          username: user.username,
        },
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        username: user.username,
        avatarUrl: user.avatarUrl,
        role: user.role,
        user_metadata: {
          full_name: user.fullName,
          phone: user.phone,
          username: user.username,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { fullName, phone, username, avatarUrl, password } = req.body;

    if (fullName !== undefined) user.fullName = fullName.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (username !== undefined) user.username = username.trim();
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl.trim();
    if (password) user.password = password;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id.toString(),
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        phone: updatedUser.phone,
        username: updatedUser.username,
        avatarUrl: updatedUser.avatarUrl,
        role: updatedUser.role,
        user_metadata: {
          full_name: updatedUser.fullName,
          phone: updatedUser.phone,
          username: updatedUser.username,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Request password reset link
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Don't leak whether email exists
      return res.json({ message: "If an account exists, a reset link has been sent" });
    }

    // In a production setup, generate a crypto reset token and email it.
    // For local dev, return success response.
    res.json({ message: "If an account exists, a reset link has been sent" });
  } catch (error) {
    next(error);
  }
};
