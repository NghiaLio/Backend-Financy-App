const User = require("../models/userModels");
const catchAsync = require("../utils/catchAsync");
const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user);
});

module.exports = { getUser };