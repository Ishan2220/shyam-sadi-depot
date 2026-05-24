const express = require("express");
const router = express.Router();
const connectDB = require("../lib/db");
const Inquiry = require("../models/Inquiry");

// POST /api/inquiry — Submit a new bulk order inquiry
router.post("/", async (req, res) => {
  try {
    await connectDB();
    const inquiry = await Inquiry.create(req.body);

    // Send WhatsApp notification to shop owner
    const ownerPhone = "918604744771";
    const msg = encodeURIComponent(
      `🛒 NEW BULK INQUIRY!\n\n` +
      `👤 ${inquiry.fullName}\n` +
      `🏢 ${inquiry.companyName || 'N/A'}\n` +
      `📞 ${inquiry.phone}\n` +
      `📧 ${inquiry.email}\n` +
      `📍 ${inquiry.city}, ${inquiry.state}\n` +
      `💼 Type: ${inquiry.businessType}\n` +
      `📦 Qty: ${inquiry.estimatedQuantity}\n` +
      `📝 ${inquiry.message || 'No additional notes'}`
    );

    res.status(201).json({
      message: "Inquiry submitted successfully!",
      inquiry,
      whatsappNotifyUrl: `https://wa.me/${ownerPhone}?text=${msg}`,
    });
  } catch (error) {
    console.error("POST /api/inquiry error:", error);
    res.status(500).json({ error: "Failed to submit inquiry" });
  }
});

// GET /api/inquiry — List all inquiries (admin)
router.get("/", async (req, res) => {
  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
    res.json(inquiries);
  } catch (error) {
    console.error("GET /api/inquiry error:", error);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

// PUT /api/inquiry/:id — Update inquiry status (admin)
router.put("/:id", async (req, res) => {
  try {
    await connectDB();
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    res.json(inquiry);
  } catch (error) {
    console.error("PUT /api/inquiry/:id error:", error);
    res.status(500).json({ error: "Failed to update inquiry" });
  }
});

// DELETE /api/inquiry/:id — Delete inquiry (admin)
router.delete("/:id", async (req, res) => {
  try {
    await connectDB();
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    res.json({ message: "Inquiry deleted" });
  } catch (error) {
    console.error("DELETE /api/inquiry/:id error:", error);
    res.status(500).json({ error: "Failed to delete inquiry" });
  }
});

module.exports = router;
