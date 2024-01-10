const express = require("express");

// external imports
const {
  createScout,
  getScouts,
  getScout,
  getPendingScouts,
  getCancelledScouts,
  getVerifiedScouts,
  getScoutByUserId,
  updateScoutStatus,
} = require("../controllers/scout");
const uploader = require("../middlewares/uploader");

const router = express.Router();

router.route("/create").post(uploader.single("photo"), createScout);
router.route("/all").get(getScouts);
router.route("/pending").get(getPendingScouts);
router.route("/cancelled").get(getCancelledScouts);
router.route("/verified").get(getVerifiedScouts);
router.route("/:scoutId").get(getScout);
router.route("/user/:userId").get(getScoutByUserId);
router.route("/update/:scoutId").put(updateScoutStatus);

module.exports = router;
