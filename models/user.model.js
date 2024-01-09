const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isScout: {
    type: Boolean,
    default: false,
  },
  scoutStatus: {
    type: String,
    default: "",
  },
  image: {
    public_id: String,
    secure_url: String,
  },
  role: {
    type: String,
    default: "scout",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
