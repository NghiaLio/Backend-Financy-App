const googleService = require("../financy-e44e5-firebase-adminsdk-fbsvc-d093455e9d.json");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(googleService),
})

module.exports = admin;