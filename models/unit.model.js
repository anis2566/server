const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scout" }],
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
