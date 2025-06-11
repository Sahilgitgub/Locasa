const { ref } = require("joi");
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
  location: String,
  country: String,
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
  // geometry: {
  //   type: {
  //     type: String, // Don't do `{ location: { type: String } }`
  //     enum: ["Point"], // 'location.type' must be 'Point'
  //     required: true,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //   },
  // },
  // category: {
  //   type: String,
  //   enum: [
  //     "Mountains",
  //     "Trending",
  //     "Rooms",
  //     "Iconic cities",
  //     "castles",
  //     "Amazing pools",
  //     "Camping",
  //     "Farms",
  //     "Arctic",
  //     "Amazing views",
  //     "surfing",
  //   ],
  // },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } }); //$in ka use jbb deleteMany ya ayr kuch bhi many vala mongoose m krte h jisme id require hoti h usme krte h..
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
