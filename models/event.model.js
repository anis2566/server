const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    vanue: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    eventStart: {
      type: Date,
      required: true,
    },
    eventEnd: {
      type: Date,
      required: true,
    },
    registrationStart: {
      type: Date,
      required: true,
    },
    registrationEnd: {
      type: Date,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scout",
      },
    ],
    images: [
      {
        public_id: String,
        secure_url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
