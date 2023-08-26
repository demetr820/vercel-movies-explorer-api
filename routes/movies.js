const router = require("express").Router();
const { validateMovie, validateMovieParams } = require("../utils/validation");

const { getMovies, createMovie, deleteMovie } = require("../controllers/movie");

router.get("/", getMovies);

router.post("/", validateMovie, createMovie);

router.delete("/:ID", validateMovieParams, deleteMovie);

module.exports = router;
