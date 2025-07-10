const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  uid: String,
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  photo: String,
  createAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  refreshToken: String,
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
