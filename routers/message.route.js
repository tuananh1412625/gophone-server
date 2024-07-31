const express = require('express');
const messageController = require('../controllers/messageController');

module.exports = (io) => {
    const router = express.Router();

    router.post('/messages', (req, res) => messageController.createMessage(req, res, io));
    router.get('/messages', messageController.getAllMessages);
    router.get('/messages/:username', messageController.getMessagesBetweenUserAndAdmin); // Thêm route mới

    return router;
};
