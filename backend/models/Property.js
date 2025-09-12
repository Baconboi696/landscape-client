const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['rent', 'sale'], required: true },
  category: { type: String, enum: ['bungalow', 'plainplot', 'farmland'], required: true },
  images: [{ type: String }], // Cloudinary URLs
  amenities: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Property', propertySchema);