const { Router } = require("express");
const authRoutes = require("./auth");
const usersRouter = require("./users");

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRouter);

module.exports = router;
