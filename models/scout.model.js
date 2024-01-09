const mongoose = require("mongoose");

const scoutModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  nameEnglish: {
    type: String,
    required: true,
  },
  nameBangla: {
    type: String,
    required: true,
  },
  fNameEnglish: {
    type: String,
    required: true,
  },
  fNameBangla: {
    type: String,
  },
  mNameEnglish: {
    type: String,
    required: true,
  },
  mNameBangla: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  villageHouseEnglish: {
    type: String,
    required: true,
  },
  villageHouseBangla: {
    type: String,
  },
  roadBlockSectorEnglish: {
    type: String,
    required: true,
  },
  roadBlockSectorBangla: {
    type: String,
  },
  district: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  thana: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
  },
  priority: {
    type: String,
    required: true,
  },
  experience: {
    type: Array,
    default: [],
  },
  joinDate: {
    type: String,
    required: true,
  },
  memberType: {
    type: String,
    required: true,
  },
  scoutSectionType: {
    type: String,
    required: true,
  },
  scoutBadge: {
    type: String,
  },
  scoutRole: {
    type: String,
  },
  scoutRegion: {
    type: String,
    required: true,
  },
  scoutDistrict: {
    type: String,
    required: true,
  },
  scoutUpazilla: {
    type: String,
  },
  presentInstitute: {
    type: String,
  },
  presentClass: {
    type: String,
  },
  presentRoll: {
    type: String,
  },
  personalOrganization: {
    type: String,
  },
  presentDesignation: {
    type: String,
  },
  image: {
    public_id: String,
    secure_url: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  unit: {
    type: String,
    required: true,
  },
});

const Scout = mongoose.model("Scout", scoutModel);

module.exports = Scout;
