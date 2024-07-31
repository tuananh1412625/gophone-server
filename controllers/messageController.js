const express = require('express');
const app = express();
const Message = require('../models/Message');

// Middleware để xử lý JSON
app.use(express.json());

// Tạo một tin nhắn mới
app.post('/api/messagessend', async (req, res) => {
    try {
        const { account, message, recipient } = req.body;
        if (!account || !message || !recipient) {
            return res.status(400).json({ error: 'Account, message, and recipient are required.' });
        }
        const newMessage = new Message({ account, message, recipient });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy tất cả tin nhắn
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy tin nhắn giữa user và admin
app.get('/api/messages/:username', async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ error: 'Username is required.' });
        }
        const messages = await Message.find({
            $or: [
                { account: username, recipient: 'Admin' },
                { account: 'Admin', recipient: username }
            ]
        }).sort('timestamp');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});