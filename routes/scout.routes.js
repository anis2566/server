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

module.exports = router;
