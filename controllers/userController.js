const User = require("../models/userModels");
const catchAsync = require("../utils/catchAsync");

const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user);
});

const updateUser = catchAsync(async (req, res) => {
  const userInfo = await req.body;
  const updateUser = await User.findByIdAndUpdate(req.params.id, userInfo,{new:true});
  res.json(updateUser);
});



module.exports = { getUser, updateUser };
