const Message = require('../models/Message');


exports.sendMessage = async (req, res) => {
  try {
    const { senderId, recipientId, content } = req.body;
    if (!senderId || !recipientId || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const message = new Message({ sender: senderId, recipient: recipientId, content });
    await message.save();

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
};

exports.getMessagesForRecipient = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const messages = await Message.find({ recipient: recipientId }).populate('sender');

    res.status(200).json({ data: messages });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
};
