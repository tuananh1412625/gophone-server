var db = require("../config/ConnectDB")

const voucherSchema = new db.mongoose.Schema({
    code: { type: String, unique: true, required: true },
    type: { type: String, enum: ['percentage', 'fixed'], required: true },
    value: { type: Number, required: true },
    min_order_value: { type: Number },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    usage_limit: { type: Number },
    used_count: { type: Number, default: 0 }
  });
  
let Voucher = db.mongoose.model('Voucher', voucherSchema);
module.exports = { Voucher };