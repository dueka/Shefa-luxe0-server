const { Router } = require("express");
// const passport = require("passport");
const UserValiadator = require("../middlewares/UserValidator");
const {
  Register,
  Login,
  passwordReset,
  newPassword,
  confirmEmail,
} = require("../controllers/authUser/authController");
const { getAuthToken } = require("../controllers/Oauth");

const router = Router();

/**
 * User Registration and Login Routes
 */

router.post("/register", UserValiadator.userInput, Register);
router.post("/register/:id", UserValiadator.userInput, Register);
router.post("/login", UserValiadator.userLogin, Login);

router.route("/forgotpassword").post(UserValiadator.inviteInput, passwordReset);
router.route("/resetpassword").patch(UserValiadator.validateToken, newPassword);
router.route("/verifyemail").post(UserValiadator.validateToken, confirmEmail);
