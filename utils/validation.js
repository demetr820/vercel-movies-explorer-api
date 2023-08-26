const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("./consts");
// const BadRequestError = require("../errors/BadRequestError");

const validation = {
  validateUserParams: celebrate({
    params: Joi.object().keys({
      userID: Joi.string().length(24).hex().required(),
    }),
  }),
  validateMovieParams: celebrate({
    params: Joi.object().keys({
      ID: Joi.string().length(24).hex().required(),
    }),
  }),
  validateMovie: celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
      trailerLink: Joi.string().required(),
      owner: Joi.string().length(24).hex(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required(),
      movieId: Joi.number().required(),
    }),
  }),
  validateProfile: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().min(2).max(30),
    }),
  }),
  validateSignup: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  validateSignin: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
};

module.exports = validation;
