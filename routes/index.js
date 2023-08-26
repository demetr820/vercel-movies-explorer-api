const router = require("express").Router();
const { validateSignin, validateSignup } = require("../utils/validation");

const userRoutes = require("./users");
const moviesRoutes = require("./movies");
const { login, createUser } = require("../controllers/users");
const NotFoundError = require("../errors/NotFoundError");
const auth = require("../middlewares/auth");

router.post("/signup", validateSignup, createUser);

router.post("/signin", validateSignin, login);

router.use(auth);

router.use("/users", userRoutes);

router.use("/movies", moviesRoutes);

router.use("*", (req, res, next) =>
  next(new NotFoundError("Страница не найдена"))
);

module.exports = router;
