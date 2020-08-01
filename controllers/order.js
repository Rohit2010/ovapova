const { Order, ProductCart } = require("../models/order");
exports.getOrderById = (req, res) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in db",
        });
      }
      req.order = order;
      next();
    });
};
exports.createOrder = (req, res) => {
  // console.log("here =>", req.body.Order)
  req.body.Order.user = req.profile;
  // console.log("step2 =>", req.body.Order)
  const order = new Order(req.body.Order);
  order.status = "Processing";
  
  order.save((err, order) => {
    if (err) {
      console.log("First Err ====", err);
      return res.status(400).json({
        error: "failed to save your order in db",
      });
    } else {
     
      res.json(order);
    }
  });
  
};

exports.getAllOrders = (req, res) => {
  Order.find().exec((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "NO order found in db",
      });
    }
    res.json(order);
  });
};
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "cannot update order status",
        });
      }
      res.json(order);
    }
  );
};
