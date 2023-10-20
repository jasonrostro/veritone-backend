const db = require("../config/db.config");
const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, count } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      count,
      purchased: false,
    });
    res.status(201).json({ message: "Successfully created", product: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, count, purchased } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.name = name;
    product.description = description;
    product.count = count;
    product.purchased = purchased;
    await product.save();
    res.status(200).json({ message: "Successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
