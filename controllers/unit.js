// external imports
const Unit = require("../models/unit.model");

// CREATE UNIT
const createUnit = async (req, res, next) => {
  const { name } = req.body;
  try {
    // CHECK UNIT
    const unit = await Unit.findOne({ name });
    if (unit) {
      throw new Error("Unit already exists");
    }

    // CREATE UNIT
    await Unit.create({
      ...req.body,
    });

    // RESPONSE
    res.status(201).json({ message: "Unit created" });
  } catch (error) {
    next(error);
  }
};

// GET UNITS
const getUnits = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 6;
  const search = req.query.search;
  try {
    let query = {};

    if (search !== "") {
      query.name = { $regex: search, $options: "i" };
    }

    const units = await Unit.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    const totalUnit = await Unit.countDocuments(query);

    // RESPONSE
    res.status(200).json({ units, totalUnit });
  } catch (error) {
    next(error);
  }
};

// GET UNIT
const getUnit = async (req, res, next) => {
  const { unitId } = req.params;
  try {
    const unit = await Unit.findById(unitId);
    if (!unit) {
      throw new Error("Unit not found");
    }
    // RESPONSE
    res.status(200).json(unit);
  } catch (error) {
    next(error);
  }
};

// UPDATE UNIT
const updateUnit = async (req, res, next) => {
  const { unitId } = req.params;
  try {
    const unit = await Unit.findById(unitId);
    if (!unit) {
      throw new Error("Unit not found");
    }

    await Unit.findByIdAndUpdate(
      unitId,
      {
        ...req.body,
      },
      { new: true }
    );

    // RESPONSE
    res.status(200).json({ message: "Unit updated" });
  } catch (error) {
    next(error);
  }
};

// DELETE UNIT
const deleteUnit = async (req, res, next) => {
  const { unitId } = req.params;
  try {
    const unit = await Unit.findById(unitId);
    if (!unit) {
      throw new Error("Unit not found");
    }

    await Unit.findByIdAndDelete(unitId);

    // RESPONSE
    res.status(200).json({ message: "Unit deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUnit,
  getUnits,
  getUnit,
  deleteUnit,
  updateUnit,
};
