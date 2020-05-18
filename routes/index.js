const { Router } = require("express");
const authRoutes = require("./auth");
const usersRoutes = require("./users");

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

module.exports = router;
