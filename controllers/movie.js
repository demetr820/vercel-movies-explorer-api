const Movie = require("../models/movie");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    owner: req.user._id,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Ошибка в данных"));
      } else {
        next(err);
      }
    });
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.ID);
    if (!movie) return next(new NotFoundError("Карточка не найдена"));
    if (movie.owner.toString() !== req.user._id) {
      return next(new ForbiddenError("У вас нет прав на удаление карточки"));
    }
    await movie.deleteOne();
    return res.send(movie);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Не верный ID"));
    }
    return next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
