const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator(val) {
          return validator.isEmail(val);
        },
        message: "Адрес почты не валидный!",
      },
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, "Минимальная длина 2 символа"],
      maxlength: [30, "Максимальная длина 30 символов"],
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
