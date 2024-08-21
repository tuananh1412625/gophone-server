const Voucher = require('../models/Voucher');

const createVoucher = async (req, res) => {
  try {
    const voucher = new Voucher(req.body);
    await voucher.save();
    res.status(201).send(voucher);
  } catch (error) {
    res.status(400).send(error);
  }
};

const applyVoucher = async (req, res) => {
  const { code, order_value } = req.body;

  try {
    const voucher = await Voucher.findOne({ code, start_date: { $lte: new Date() }, end_date: { $gte: new Date() } });

    if (!voucher) {
      return res.status(404).send({ error: 'Voucher not found or expired!' });
    }

    if (voucher.min_order_value && order_value < voucher.min_order_value) {
      return res.status(400).send({ error: 'Order value not sufficient for this voucher!' });
    }

    if (voucher.usage_limit && voucher.used_count >= voucher.usage_limit) {
      return res.status(400).send({ error: 'Voucher usage limit reached!' });
    }

    let discount = 0;
    if (voucher.type === 'percentage') {
      discount = (voucher.value / 100) * order_value;
    } else if (voucher.type === 'fixed') {
      discount = voucher.value;
    }

    voucher.used_count += 1;
    await voucher.save();

    res.send({ discount });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.send(vouchers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) {
      return res.status(404).send({ error: 'Voucher not found!' });
    }
    res.send(voucher);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!voucher) {
      return res.status(404).send({ error: 'Voucher not found!' });
    }
    res.send(voucher);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteVoucher = async (req, res) => {
  try {
    await Voucher.findByIdAndRemove(req.params.id);
    res.status(204).send({ message: 'Voucher deleted successfully!' });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createVoucher,
  applyVoucher,
  getVoucher,
  getAllVouchers,
  updateVoucher,
  deleteVoucher
};