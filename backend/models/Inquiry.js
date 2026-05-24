const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema(
  {
    // Inquirer details
    fullName: { type: String, required: true },
    companyName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },

    // Business details
    businessType: {
      type: String,
      enum: ["retailer", "wholesaler", "distributor", "boutique", "event_planner", "other"],
      required: true,
    },
    gstNumber: { type: String, default: "" },

    // Order details
    productCategories: [{ type: String }],
    estimatedQuantity: { type: String, required: true },
    preferredDeliveryDate: { type: String, default: "" },

    // Additional info
    message: { type: String, default: "" },
    referenceSource: {
      type: String,
      enum: ["google", "social_media", "word_of_mouth", "exhibition", "repeat_customer", "other"],
      default: "other",
    },

    // Status tracking
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "negotiating", "confirmed", "completed", "cancelled"],
      default: "new",
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", InquirySchema);
