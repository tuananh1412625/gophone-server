var express = require("express");
var router = express.Router();
var controller = require("../controllers/notification.controller");

router.get("/get-notifi-list/:userId", controller.allNotificationByUser);
router.put("/update-status/:notificationId", controller.updateStatusNotifi);
router.post("/postnotifi", controller.createNotification);

module.exports = router;