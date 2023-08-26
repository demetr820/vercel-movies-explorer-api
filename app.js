const { PORT, DB_ADDRESS, LOCALHOST } = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { errors } = require("celebrate");
const handleErrors = require("./middlewares/handleErrors");
const routes = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const allowedCors = [
  // "http://mestoproject.nomoredomains.work",
  // "https://mestoproject.nomoredomains.work",
  "localhost:3000",
  // "localhost:3001",
];
const app = express();

app.use(cors(allowedCors));
app.use(apiLimiter);
app.use(helmet());
app.use(express.json());
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server running at ${LOCALHOST}:${PORT}/`);
});
