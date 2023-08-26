const router = require("express").Router();
const { validateProfile } = require("../utils/validation");

const { getMe, updateUser } = require("../controllers/users");

router.get("/me", getMe);

router.patch("/me", validateProfile, updateUser);

module.exports = router;
