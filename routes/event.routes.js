const express = require("express");

// external imports
const { createEvent, getEvents, getEvent } = require("../controllers/event");
const uploader = require("../middlewares/uploader");

const router = express.Router();

router.route("/create").post(uploader.array("images"), createEvent);
router.route("/all").get(getEvents);
// router.route("/pending").get(getPendingScouts);
// router.route("/cancelled").get(getCancelledScouts);
// router.route("/verified").get(getVerifiedScouts);
router.route("/:eventId").get(getEvent);
// router.route("/user/:userId").get(getScoutByUserId);
// router.route("/update/:scoutId").put(updateScoutStatus);

module.exports = router;
