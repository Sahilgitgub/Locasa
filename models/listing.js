const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  image: {
    url: String,
    filename: String,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  //   category: {
  //     type: String,
  //     enum: [
  //       "Mountains",
  //       "Trending",
  //       "Rooms",
  //       "Iconic cities",
  //       "Castles",
  //       "Amazing pools",
  //       "Camping",
  //       "Farms",
  //       "Arctic",
  //       "Amazing views",
  //       "Surfing",
  //     ],
  //   },
  //   geometry: {
  //     type: {
  //       type: String,
  //       enum: ["Point"],
  //       required: true,
  //     },
  //     coordinates: {
  //       type: [Number], // [longitude, latitude]
  //       required: true,
  //     },
  //   },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
