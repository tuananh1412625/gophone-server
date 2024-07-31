var db = require("../config/ConnectDB");

const messageSchema = new db.mongoose.Schema({
  account: { type: String, required: true },
  message: { type: String, required: true },
  recipient: { type: String, required: true }, // Thêm trường recipient
  timestamp: { type: Date, default: Date.now }
});

let message = db.mongoose.model("message", messageSchema);
module.exports = { message };
