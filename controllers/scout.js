const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// external imports
const Scout = require("../models/scout.model");
const User = require("../models/user.model");

// CREATE SCOUT
const createScout = async (req, res, next) => {
  const { phone, userId } = req.body;
  try {
    // CHECK SCOUT
    const scout = await Scout.findOne({ phone });
    // if (scout) {
    //   throw new Error("Scout already exists");
    // }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "scouts",
    });

    // CREATE SCOUT
    const newScout = await Scout.create({
      ...req.body,
      image: {
        public_id: result?.public_id || null,
        secure_url: result?.secure_url || null,
      },
      userId: userId || null,
    });

    // UPDATE USER
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        isScout: true,
        scoutStatus: "applied",
      });
    }

    // RESPONSE
    res.status(201).json({ newScout, message: "Apply success" });
  } catch (error) {
    next(error);
  }
};

// GET SCOUTS
const getScouts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 6;
  const name = req.query.name;
  const gender = req.query.gender;
  const section = req.query.section;
  try {
    let query = {
      status: "active",
    };

    if (name !== "") {
      query.nameEnglish = { $regex: name, $options: "i" };
    }
    if (gender !== "All") {
      query.gender = gender.toLowerCase();
    }
    if (section !== "All") {
      query.scoutSectionType = section;
    }

    const scouts = await Scout.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    const totalScout = await Scout.countDocuments(query);

    // RESPONSE
    res.status(200).json({ scouts, totalScout });
  } catch (error) {
    next(error);
  }
};

// GET PENDING SCOUTS
const getPendingScouts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 6;
  const name = req.query.name;
  try {
    let query = {
      status: "pending",
    };

    if (name !== "") {
      query.nameEnglish = { $regex: name, $options: "i" };
    }

    const scouts = await Scout.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    const totalScout = await Scout.countDocuments(query);

    // RESPONSE
    res.status(200).json({ scouts, totalScout });
  } catch (error) {
    next(error);
  }
};

// GET CANCELLED SCOUTS
const getCancelledScouts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 6;
  const name = req.query.name;
  try {
    let query = {
      status: "cancelled",
    };

    if (name !== "") {
      query.nameEnglish = { $regex: name, $options: "i" };
    }

    const scouts = await Scout.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    const totalScout = await Scout.countDocuments(query);

    // RESPONSE
    res.status(200).json({ scouts, totalScout });
  } catch (error) {
    next(error);
  }
};

// GET VERIFIED SCOUTS
const getVerifiedScouts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 6;
  const name = req.query.name;
  try {
    let query = {
      isVerified: true,
    };

    if (name !== "") {
      query.nameEnglish = { $regex: name, $options: "i" };
    }

    const scouts = await Scout.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    const totalScout = await Scout.countDocuments(query);

    // RESPONSE
    res.status(200).json({ scouts, totalScout });
  } catch (error) {
    next(error);
  }
};

// GET SCOUT
const getScout = async (req, res, next) => {
  const { scoutId } = req.params;
  try {
    const scout = await Scout.findById(scoutId);
    if (!scout) {
      throw new Error("Scout not found");
    }
    // RESPONSE
    res.status(200).json(scout);
  } catch (error) {
    next(error);
  }
};

// GET SCOUT BY USER ID
const getScoutByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const scout = await Scout.findOne({
      userId: userId,
    });
    if (!scout) {
      throw new Error("Scout not found");
    }
    // RESPONSE
    res.status(200).json(scout);
  } catch (error) {
    next(error);
  }
};

// UPDATE SCOUT STATUS
const updateScoutStatus = async (req, res, next) => {
  const { scoutId } = req.params;
  const { status } = req.body;
  try {
    const scout = await Scout.findById(scoutId);
    if (!scout) {
      throw new Error("Scout not found");
    }

    // UPDATE SCOUT STATUS
    await Scout.findByIdAndUpdate(
      scoutId,
      {
        status: status,
      },
      { new: true }
    );
    // RESPONSE
    res.status(200).json({ message: "Scout status updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createScout,
  getScouts,
  getScout,
  getPendingScouts,
  getCancelledScouts,
  getVerifiedScouts,
  getScoutByUserId,
  updateScoutStatus,
};
