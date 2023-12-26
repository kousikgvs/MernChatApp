const express = require("express")
const { registerUser, authUser, allUsers } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// router.route("/demo").get(() => {
// }).post(() => { })

// we can create like this as well
// router.route("/").post(registerUser).get(allUsers)

router.post("/" , registerUser)
router.post("/login" , authUser)
router.route("/").get(protect,allUsers);

module.exports = router;