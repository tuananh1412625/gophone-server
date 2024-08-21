// models/message.js
const db = require("../config/ConnectDB");

const messageSchema = new db.mongoose.Schema(
  {
    sender: { type: db.mongoose.Schema.Types.ObjectId, ref: 'account', required: true },
    recipient: { type: db.mongoose.Schema.Types.ObjectId, ref: 'account', required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Message = db.mongoose.model('Message', messageSchema);
module.exports = Message;
