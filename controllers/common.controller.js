const { STATUS_ACTIVE } = require("../config/constants");
const Specialization = require("../models/specialization");
const Category = require("../models/category");

/**
 * Get Specializations
 */
exports.getSpecializations = async () => {
  try {
    const specializations = await Specialization.find({
      status: STATUS_ACTIVE,
    });
    return { error: false, data: specializations };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

exports.getCategories = async (req, res) => {
  try {
    const specializations = await Category.find({
      status: STATUS_ACTIVE,
    }).populate("specializations");
    return res.status(200).send({ error: false, data: specializations });

  } catch (error) {
    res.status(500).send({ message: error });

  }
};

exports.addCategory = async (req, res) => {
  // try {

  Category.create({ ...req.body })
    .then(() => {
      return res.status(200).send({ message: "Account added successfully" });
    })
    .catch((e) => {
      res.status(500).send({ message: e });
    });

  //   const specializations = await Category.find({
  //     status: STATUS_ACTIVE,
  //   });
  //   return { error: false, data: specializations };
  // } catch (error) {
  //   return { error: true, message: error.message };
  // }
};

exports.addSpecialization = async (req, res) => {
  // try {

  Specialization.create({ ...req.body })
    .then(() => {
      return res.status(200).send({ message: "Account added successfully" });
    })
    .catch((e) => {
      res.status(500).send({ message: e });
    });

  //   const specializations = await Category.find({
  //     status: STATUS_ACTIVE,
  //   });
  //   return { error: false, data: specializations };
  // } catch (error) {
  //   return { error: true, message: error.message };
  // }
};
