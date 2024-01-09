const express = require("express");

// external imports
const {
  createUnit,
  getUnits,
  deleteUnit,
  getUnit,
  updateUnit,
} = require("../controllers/unit");
const uploader = require("../middlewares/uploader");

const router = express.Router();

router.route("/create").post(createUnit);
router.route("/all").get(getUnits);
router.route("/:unitId").delete(deleteUnit);
router.route("/:unitId").get(getUnit);
router.route("/:unitId").put(updateUnit);

module.exports = router;
