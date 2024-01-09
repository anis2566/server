const express = require("express");

// external imports
const { isLoggedIn, isLoggedInCustomer } = require("../middlewares/auth");
const {
  createUser,
  loginUser,
  getUserInfo,
  loginAdmin,
  logout,
  updateUserAvatar,
  changeUserPassword,
} = require("../controllers/auth");
const uploader = require("../middlewares/uploader");

const router = express.Router();

router.route("/user/create").post(createUser);
router.route("/user/login").post(loginUser);
router.route("/admin/login").post(loginAdmin);
router.route("/get-user").get(isLoggedIn, getUserInfo);
router.route("/logout").get(logout);
router
  .route("/user/update-avatar")
  .post(uploader.single("photo"), isLoggedIn, updateUserAvatar);
router.route("/user/change-password").post(isLoggedIn, changeUserPassword);

module.exports = router;
