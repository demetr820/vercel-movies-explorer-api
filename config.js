require("dotenv").config();

const { NODE_ENV, JWT_SECRET, PORT, LOCALHOST, DB_ADDRESS } = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === "production" ? JWT_SECRET : "very-strong-key",
  PORT: NODE_ENV === "production" ? PORT : 3000,
  LOCALHOST: NODE_ENV === "production" ? LOCALHOST : "http://localhost",
  DB_ADDRESS:
    NODE_ENV === "production"
      ? DB_ADDRESS
      : "mongodb://localhost:27017/bitfilmsdb",
};
