const { Router } = require("express");
const UserValidator = require("../middlewares/UserValidator");
const {
  Register,
  Login,
  passwordReset,
  newPassword,
  confirmEmail,
} = require("../controllers/authUser/authControllers");
const { getAuthToken } = require("../controllers/Oauth");

const router = Router();

/**
 * User Registration and Login Routes
 */
router.post("/register", UserValidator.userInput, Register);

router.post("/register/:id", UserValidator.userInput, Register);

router.post("/login", UserValidator.userLogin, Login);

router.route("/forgotpassword").post(UserValidator.inviteInput, passwordReset);
router.route("/resetpassword").patch(UserValidator.validateToken, newPassword);
router.route("/verify_email").post(UserValidator.validateToken, confirmEmail);

/**
 * get google or github auth on frontend securely
 */
router.get("/token", getAuthToken);

module.exports = router;
