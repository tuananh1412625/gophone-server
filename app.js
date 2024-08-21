const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require('multer');
const cors = require("cors");

const siteRouter = require("./routers/site.route");
const productsRouter = require("./routers/products.route");
const categoryRouter = require("./routers/category.route");
const reviewRoute = require("./routers/productRate.route");
const userRouter = require("./routers/account.route");
const orderRoute = require("./routers/order.route");
const cartRoute = require("./routers/cart.route");
const infoRoute = require("./routers/info.route");
const bannerRoute = require("./routers/banner.route");
const storeRoute = require("./routers/store.route");
const messageRoute = require("./routers/message.route");
const notifiRoute = require("./routers/notification.route");
const statisticalRoute = require('./routers/statistical.route');
const voucherRoutes = require('./routers/voucher.route');
const yeuthichRoute = require("./routers/yeuthich.route");
const Routerpurchar = require('./routers/Purchar.router');

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multer().none());
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.static(path.join(__dirname, "public")));

// Định nghĩa các route
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
app.use('/api/message', messageRoute);
app.use('/api/notifi', notifiRoute);
app.use('/api/statistical', statisticalRoute);
app.use('/api/yeuthich', yeuthichRoute);
// app.use('/api/voucher', voucherRoutes);
app.use('/api/purchar', Routerpurchar);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log lỗi
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);

  if (req.originalUrl.indexOf("/api") === 0) {
    res.json({
      status: 0,
      error: err,
    });
  } else {
    res.render("sites/error");
  }
});

module.exports = app;