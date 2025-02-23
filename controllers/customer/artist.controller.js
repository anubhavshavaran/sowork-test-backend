const { STATUS_ACTIVE, USER_ROLE_ARTIST } = require("../../config/constants");
const Review = require("../../models/Review");
const User = require("../../models/User");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

/**
 * Get Artist By Id
 * Type : GET
 * Route : /customer/artist/get-by-id
 */
exports.getArtistById = async (req, res) => {
  try {
    const { _id } = req.params;

    const user = await User.aggregate([
      {
        $match: {
          $and: [{ _id: new ObjectId(_id) }, { status: STATUS_ACTIVE }],
        },
      },
      {
        $project: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          phone_number: 1,
          profile_image: 1,
          about: 1,
          created_at: 1,
          address: 1,
        },
      },
    ]);

    res.send({ error: false, user: user });
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

exports.getAllArtist = async (req, res) => {
  try {
    const searchQuery = req?.query?.search;
    if (searchQuery) {
      var regex = new RegExp(searchQuery, "i");
      const user = await User.find({
        $or: [{ status: STATUS_ACTIVE }, { status: "APPROVED" }],
        $or: [{ categoryTitle: regex }, { first_name: regex, }],
        user_role: USER_ROLE_ARTIST,
      });
      return res.status(200).send({ error: false, user: user });
    }
    const user = await User.find({
      $or: [{ status: STATUS_ACTIVE }, { status: "APPROVED" }],
      user_role: USER_ROLE_ARTIST,
    });
    return res.status(200).send({ error: false, user: user });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

/**
 * Get Artist By Id
 * Type : GET
 * Route : /customer/artist/get-by-id
 */
exports.addReview = async (req, res) => {
  try {
    const { _id } = req.user;
    const { review, rating, artist } = req.body;

    Review.create({
      review,
      rating,
      artist,
      user: _id,
    }).then(() => {
      res.send({ error: false, message: "Review added." });
    });
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};
