const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const salt = 10;
const User = require("../models/user");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
// const UnauthorizedError = require("../errors/UnauthorizedError");
const ConflictError = require("../errors/ConflictError");

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, salt)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.send({
        name: user.name,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Почта уже занята"));
        return;
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Не корректные данные"));
        return;
      }
      next(err);
    });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .orFail(new ConflictError("Не верная почта или пароль"))
    .then((user) =>
      bcrypt.compare(password, user.password).then((matched) => {
        if (matched) {
          return user;
        }
        return Promise.reject(new ConflictError("Не верная почта или пароль"));
      })
    )
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};
const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("Пользователь не найден"));
        return;
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};
const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        next(new NotFoundError("Пользователь не найден"));
        return;
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports = {
  getMe,
  createUser,
  updateUser,
  login,
};
