const Product = require('../models/product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

exports.getProductById = (req, res) => {
  res.json({ message: 'getProductById not implemented yet' });
};

exports.addProduct = (req, res) => {
  res.json({ message: 'addProduct not implemented yet' });
};
