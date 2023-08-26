const validator = require("validator");
const BadRequestError = require("../errors/BadRequestError");

const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  ALREADY_EXISTS: 409,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
const validateURL = (value) => {
  if (!validator.isURL(value, { require_host: false })) {
    throw new BadRequestError("Неправильный формат ссылки");
  }
  return value;
};

module.exports = {
  HTTP_STATUS,
  validateURL,
};
