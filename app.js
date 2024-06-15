var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var siteRouter = require("./routers/site.route"); // Kiểm tra xem siteRouter đã được định nghĩa chưa
var userRouter = require("./routers/account.route");
var infoRoute = require("./routers/info.route");
var productsRouter = require("./routers/products.route");
var notifiRoute = require("./routers/notification.route");

var app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.use("/api", siteRouter); // Đảm bảo rằng siteRouter đã được định nghĩa và xuất ra từ file site.route.js
app.use("/api/user", userRouter);
app.use("/api/info", infoRoute);
app.use("/api/products", productsRouter);
app.use("/api/notifi", notifiRoute);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.message);

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  if (req.originalUrl.indexOf("/api") === 0) {
    res.json({
      status: 0,
      msg: err.message,
    });
  } else {
    res.render("sites/error");
  }
});

module.exports = app;
