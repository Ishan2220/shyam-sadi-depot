const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const connectDB = require("../lib/db");

// GET /api/products — list all products
router.get("/", async (req, res) => {
  try {
    await connectDB();
    let products = await Product.find({}).lean();
    
    // Map _id to id for frontend compatibility
    const mapped = products.map((p) => ({ ...p, id: p.id || p._id.toString() }));
    res.json(mapped);
  } catch (error) {
    console.error("GET /api/products error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /api/products — create a product
router.post("/", async (req, res) => {
  try {
    await connectDB();
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("POST /api/products error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// GET /api/products/:id — get single product
router.get("/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    let product;
    
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id).lean();
    }
    
    if (!product) {
      product = await Product.findOne({ id }).lean();
    }
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ ...product, id: product.id || product._id.toString() });
  } catch (error) {
    console.error("GET /api/products/:id error:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// PUT /api/products/:id — update product
router.put("/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    let product;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    }

    if (!product) {
      product = await Product.findOneAndUpdate({ id }, req.body, { new: true });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("PUT /api/products/:id error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE /api/products/:id — delete product
router.delete("/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    let product;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findByIdAndDelete(id);
    }

    if (!product) {
      product = await Product.findOneAndDelete({ id });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE /api/products/:id error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
