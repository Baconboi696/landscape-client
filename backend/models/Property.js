const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },

  // Separate city & state for clean display and filtering
  city: { type: String, required: true },
  state: { type: String, required: true },
  // Legacy single-string location (auto-populated from city + state)
  location: { type: String },
  // GPS coordinates for Google Maps embed
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
  type: { type: String, enum: ['rent', 'sale'], required: true },
  category: { type: String, enum: ['bungalow', 'plainplot', 'farmland'], required: true },
  images: [{ type: String }],  // Cloudinary image URLs
  videos: [{ type: String }],  // Cloudinary video URLs
  amenities: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

// Auto-populate location string from city + state before saving
propertySchema.pre('save', function (next) {
  if (this.city && this.state) {
    this.location = `${this.city}, ${this.state}`;
  }
  next();
});

module.exports = mongoose.model('Property', propertySchema);