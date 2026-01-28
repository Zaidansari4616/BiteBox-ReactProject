const Cart = require("../models/Cart");

/* GET USER CART */
exports.getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id });
  }

  res.json(cart.items);
};

/* UPDATE CART */
exports.updateCart = async (req, res) => {
  const { items } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items
    });
  } else {
    cart.items = items;
    await cart.save();
  }

  res.json(cart.items);
};
