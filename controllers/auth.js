const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

// external imports
const createToken = require("../utils/tokenCreate");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");

// LOGIN ADMIN
const loginAdmin = async (req, res, next) => {
  const { email, password, remember } = req.body;

  try {
    // CHECK ADMIN
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      throw new Error("Invalid Credentials");
    }

    // CHECK PASSWORD
    const isMatchPassword = await bcrypt.compare(password, admin.password);
    if (!isMatchPassword) {
      throw new Error("Invalid Credentials");
    }

    // CREATE TOKEN
    const token = await createToken({
      id: admin._id,
      role: admin.role,
    });

    const expires = remember
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    res.cookie("accessToken", token, {
      expires: expires,
    });

    // RESPONSE
    res.status(201).json({ token, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

// LOGIN USER
const loginUser = async (req, res, next) => {
  const { email, password, remember } = req.body;
  try {
    // CHECK USER
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // CHECK PASSWORD
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw new Error("Invalid Credentials");
    }

    // CREATE TOKEN
    const token = await createToken({
      id: user._id,
      role: user.role,
      remember,
    });
    // SET COOKIE

    const expires = remember
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    res.cookie("accessToken", token, {
      expires: expires,
    });
    // RESPONSE
    res.status(201).json({ token, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

// CREATE USER
const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // CHECK USER
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE USER
    await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // RESPONSE
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

// GET USER INFO
const getUserInfo = async (req, res, next) => {
  const { id, role } = req;

  try {
    if (role === "admin") {
      const admin = await Admin.findById(id);
      res.status(200).json(admin);
    } else {
      const user = await User.findById(id);
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

// UPDATE USER AVATAR
const updateUserAvatar = async (req, res, next) => {
  const { id } = req;
  const file = req.file;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.image?.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);

      const result = await cloudinary.uploader.upload(file.path, {
        folder: "users",
      });

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          image: {
            public_id: result?.public_id || null,
            secure_url: result?.secure_url || null,
          },
        },
        { new: true }
      );

      res.status(200).json({ user: updatedUser, message: "Avatar updated" });
    }

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "users",
      });
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          image: {
            public_id: result?.public_id || null,
            secure_url: result?.secure_url || null,
          },
        },
        { new: true }
      );
      res.status(200).json({ user: updatedUser, message: "Avatar updated" });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

// CHANGE USER PASSWORD
const changeUserPassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req;
  try {
    // CHECK USER
    const user = await User.findById(id).select("+password");
    if (!user) {
      throw new Error("User not found");
    }

    // CHECK PASSWORD
    const isMatchedPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isMatchedPassword) {
      throw new Error("Invalid Credentials");
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // UPDATE USER
    await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    res.status(200).json({ message: "Password has been changed" });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
  loginUser,
  createUser,
  getUserInfo,
  logout,
  updateUserAvatar,
  changeUserPassword,
};
