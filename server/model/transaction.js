const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user: { type: String, required: true },

  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  room: [{ type: String, required: true }],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: { type: String, required: true },

  status: {
    type: String,
    enum: ["Booked", "Checkin", "Checkout"],
    required: true,
    default: "Booked",
  },
  updateAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Transaction", transactionSchema);
