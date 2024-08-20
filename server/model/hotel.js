const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["hotel", "apartments", "resorts", "villas", "Cabins"],
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photos: [{ type: String, required: true }],
    desc: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    title: {
      type: String,
      required: true,
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
    },
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  },

  { collection: "hotels" }
);
module.exports = mongoose.model("Hotel", hotelSchema);
// cheapestPrice
