const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = require("../models/Review");
const connectDB = require("../lib/db");

// Seed data
const SEED_REVIEWS = [
  // 4 Pure English
  { name: 'Priya Deshmukh', text: 'The bridal collection was absolutely amazing. The fixed rate policy made our shopping experience very easy and transparent.', rating: 5, isVisible: true },
  { name: 'Anita Kulkarni', text: 'They have a huge range of cotton sarees. There is plenty of variety in the summer collection, definitely worth a visit!', rating: 4, isVisible: true },
  { name: 'Rekha Jadhav', text: 'I bought a Kanjivaram saree for a wedding. It is original quality and the price is very reasonable. Highly recommend! 🙏', rating: 5, isVisible: true },
  { name: 'Manisha Shinde', text: 'The Paithani collection is outstanding! Real silk, beautiful designs, and they have been a trusted shop for over 25 years.', rating: 5, isVisible: true },
  
  // 4 Pure Marathi
  { name: 'सुनीता पाटील', text: 'साडीचा दर्जा खूपच उत्कृष्ट आहे ❤️ श्याम साडी डेपोला नक्की भेट द्या!', rating: 5, isVisible: true },
  { name: 'स्वाती मोरे', text: 'समारंभाच्या साड्यांचा संग्रह अप्रतिम आहे. येथील कर्मचारी खूप मदत करणारे आणि मैत्रीपूर्ण आहेत 😊', rating: 4, isVisible: true },
  { name: 'वैशाली चव्हाण', text: 'छापील साड्यांमध्ये नेहमी नवीन नक्षीकाम पाहायला मिळते. उत्तम दर्जाची हमी! या परिसरातील सर्वात चांगले साडीचे दुकान.', rating: 5, isVisible: true },
  { name: 'आशा भोसले', text: 'नऊवारी साडी आमच्या कौटुंबिक कार्यक्रमासाठी एकदम योग्य होती. अतिशय सुंदर आणि पारंपारिक पेहराव मिळाला 👌', rating: 5, isVisible: true },
];

// GET /api/reviews — public, returns visible reviews sorted by newest first (seeds if empty)
router.get("/", async (req, res) => {
  try {
    await connectDB();
    let reviews = await Review.find({ isVisible: true }).sort({ createdAt: -1 }).lean();
    if (reviews.length === 0) {
      await Review.insertMany(SEED_REVIEWS);
      reviews = await Review.find({ isVisible: true }).sort({ createdAt: -1 }).lean();
    }
    res.json(reviews);
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// GET /api/reviews/all — admin, returns ALL reviews regardless of visibility
router.get("/all", async (req, res) => {
  try {
    await connectDB();
    const reviews = await Review.find({}).sort({ createdAt: -1 }).lean();
    res.json(reviews);
  } catch (error) {
    console.error("GET /api/reviews/all error:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// POST /api/reviews — admin, create a new review
router.post("/", async (req, res) => {
  try {
    await connectDB();
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
});

// PUT /api/reviews/:id — admin, update a review
router.put("/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    let review;

    if (mongoose.Types.ObjectId.isValid(id)) {
      review = await Review.findByIdAndUpdate(id, req.body, { new: true });
    }

    if (!review) {
      review = await Review.findOneAndUpdate({ id }, req.body, { new: true });
    }

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    console.error("PUT /api/reviews/:id error:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
});

// DELETE /api/reviews/:id — admin, delete a review
router.delete("/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    let review;

    if (mongoose.Types.ObjectId.isValid(id)) {
      review = await Review.findByIdAndDelete(id);
    }

    if (!review) {
      review = await Review.findOneAndDelete({ id });
    }

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error("DELETE /api/reviews/:id error:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
});

module.exports = router;
