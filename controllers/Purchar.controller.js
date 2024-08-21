const { order } = require("../models/Orders");
const optionModel = require("../models/Option"); 

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { status } = req.query;

    console.log(`Fetching orders for userId: ${userId}`);

    // Xây dựng điều kiện truy vấn
    const queryCondition = { user_id: userId };
    if (status) {
      queryCondition.status = status;
    }

    // Tìm đơn hàng theo điều kiện truy vấn
    const orders = await order.find(queryCondition)
      .sort({ updatedAt: -1 }) // Sắp xếp theo thời gian cập nhật mới nhất
      .populate(['user_id', 'info_id']) // Populating các trường liên quan
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng cho người dùng này." });
    }

    // Xử lý sản phẩm trong đơn hàng
    const result = await Promise.all(
      orders.map(async (order) => {
        const productsOrder = await Promise.all(
          order.productsOrder.map(async (productOrder) => {
            const option = await optionModel.option
              .findById(productOrder.option_id)
              .lean()
              .populate("product_id"); // Populating sản phẩm trong tùy chọn

            return {
              option_id: option,
              quantity: productOrder.quantity,
              discount_value: productOrder.discount_value,
            };
          })
        );

        return {
          _id: order._id,
          user_id: order.user_id,
          info_id: order.info_id,
          productsOrder,
          total_price: order.total_price,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        };
      })
    );

    return res.status(200).json({
      code: 200,
      result: result,
      message: "Lấy đơn hàng thành công.",
    });
  } catch (error) {
    console.error(`Error fetching orders for userId: ${req.params.userId}`, error);
    return res.status(500).json({ code: 500, message: "Đã xảy ra lỗi khi lấy đơn hàng", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    console.log('Fetching all orders');

    // Tìm tất cả các đơn hàng
    const orders = await order.find()
      .populate('productsOrder.option_id') // Populating sản phẩm trong đơn hàng
      .populate('info_id') // Populating thông tin liên quan
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    return res.status(200).json({
      code: 200,
      result: orders,
      message: "Lấy tất cả đơn hàng thành công.",
    });
  } catch (error) {
    console.error("Error fetching all orders", error);
    return res.status(500).json({ code: 500, message: "Đã xảy ra lỗi khi lấy tất cả đơn hàng", error: error.message });
  }
};

module.exports = {
  getOrdersByUserId,
  getAllOrders,
};
