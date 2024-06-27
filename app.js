var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var siteRouter = require("./routers/site.route");
var productsRouter = require("./routers/products.route");
var categoryRouter = require("./routers/category.route");
var reviewRoute = require("./routers/productRate.route");
var userRouter = require("./routers/account.route");
var orderRoute = require("./routers/order.route");
var cartRoute = require("./routers/cart.route");
var infoRoute = require("./routers/info.route");
var bannerRoute = require("./routers/banner.route");
var storeRoute = require("./routers/store.route");
var messageRoute = require("./routers/message.route");
var notifiRoute = require("./routers/notification.route");
var statisticalRoute = require('./routers/statistical.route'); 

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
app.use("/api", siteRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productsRouter);
app.use("/api/user", userRouter);
app.use("/api/store", storeRoute);
app.use("/api/review", reviewRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/info", infoRoute);
app.use("/api/banner", bannerRoute);
app.use('/api/message',messageRoute);
app.use('/api/notifi',notifiRoute);
app.use('/api/statistical', statisticalRoute);
var yeuthichRoute = require("./routers/yeuthich.route");
app.use('/api/yeuthich', yeuthichRoute);

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
