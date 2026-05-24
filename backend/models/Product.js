const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    shortDescription: { type: String, required: false },
    retailPrice: { type: Number, required: false },
    comparePrice: { type: Number, required: false },
    wholesalePrice: { type: Number, required: false },
    category: { type: String, required: true },
    subcategory: { type: String, required: true, default: "General" },
    categorySlug: { type: String },
    images: [{ type: String }],
    colors: [{ type: String }],
    fabrics: [{ type: String }],
    designs: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },
    moq: { type: Number, default: 1 },
    isTrending: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
