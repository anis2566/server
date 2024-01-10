const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// external imports
const User = require("../models/user.model");
const Event = require("../models/event.model");

// CREATE EVENT
const createEvent = async (req, res, next) => {
  const files = req.files;
  try {
    //   UPLOAD EVENT IMAGE
    let allImageUrl = [];
    for (let file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "events",
      });
      allImageUrl = [
        ...allImageUrl,
        { public_id: result.public_id, secure_url: result.secure_url },
      ];
    }

    // CREATE EVENT
    await Event.create({
      ...req.body,
      images: allImageUrl,
    });

    // RESPONSE
    res.status(201).json({ message: "Event created" });
  } catch (error) {
    next(error);
  } finally {
    if (files) {
      for (let file of files) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      }
    }
  }
};

// GET EVENTS
const getEvents = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 6;
  try {
    const events = await Event.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    const totalEvent = await Event.countDocuments({});

    // RESPONSE
    res.status(200).json({ events, totalEvent });
  } catch (error) {
    next(error);
  }
};

// GET EVENT
const getEvent = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    // RESPONSE
    res.status(200).json(event);
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
  // getScouts,
  // getScout,
  // getPendingScouts,
  // getCancelledScouts,
  // getVerifiedScouts,
  // getScoutByUserId,
  // updateScoutStatus,
  createEvent,
  getEvents,
  getEvent,
};
