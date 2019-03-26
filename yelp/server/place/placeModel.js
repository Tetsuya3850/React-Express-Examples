const mongoose = require("mongoose");

const placeSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    }
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true }
  }
);

placeSchema.index({ location: "2dsphere" });

placeSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "place"
});

placeSchema.statics.getTopPlaces = function() {
  return this.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "place",
        as: "reviews"
      }
    },
    {
      $match: {
        "reviews.1": { $exists: true }
      }
    },
    {
      $project: {
        reviews: "$$Root.reviews",
        averageRating: { $avg: "$eviews.rating" }
      }
    },
    {
      $sort: {
        averageRating: -1
      }
    }
  ]);
};
