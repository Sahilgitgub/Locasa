const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id); //req.params.id ko merge krne ke liye listing ke sath reviews ko isliye hmm use krte h { mergeParams: true } jo ki uper require krana hota h router ke sath..
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created");
  // res.send("new review saved");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  //$pull  operator removes from an existing array of all instances of a value that match a speasified consition mtlb listingShema m jo array m review tha abb ye database se bhi delete krr dega .
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};
