const express = require("express");
const otpRateLimiter = require("../middlewares/limiterValidator");
const {
  userSignup,
  userLogin,
  forgetPassword,
  verifyOTP,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/forget-password", otpRateLimiter, forgetPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

module.exports = router;
