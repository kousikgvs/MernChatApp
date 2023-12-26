const express = require("express");
const { route } = require("./userRoutes");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// router.route("/").post(protect, accesschat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

module.exports = router;