const express = require("express");
const router = express.Router();
const { getOrdersByUserId, getAllOrders } = require("../controllers/Purchar.controller");

router.get("/user/:userId", getOrdersByUserId);
router.get("/", getAllOrders);

module.exports = router;
