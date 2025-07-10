const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const firebase = require("../utils/firebase");
const { v4: uuidv4 } = require("uuid");

const parseToken = catchAsync(async (req, res, next) => {
  const idToken = req.body.idToken;
  const decoded = await firebase.auth().verifyIdToken(idToken);
  console.log(decoded);
  // Tìm user trong MongoDB
  let user = await User.findOne({ uid: decoded.uid });

  // Nếu chưa có → tạo mới
  if (!user) {
    user = await User.create({
      uid: decoded.uid,
      email: decoded.email,
      userName: decoded.name,
      photo: decoded.picture,
    });
    console.log("🆕 User created:", user.uid);
  } else {
    console.log("🔎 User found:", user.uid);
  }
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
  const refreshToken = uuidv4();
  user.refreshToken = refreshToken;
  await user.save();

  return res.json({ message: "✅ Token verified", accessToken, refreshToken });
});

const refreshToken = catchAsync(async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
  return res.json({ accessToken });
});

const authenticateJWT = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: err.message });
    }
    req.user = user;
    next();
  });
});

const logout = catchAsync(async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);
  user.refreshToken = null;
  await user.save();
  res.sendStatus(204);
});

module.exports = { parseToken, authenticateJWT, logout, refreshToken };
