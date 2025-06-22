import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Automotive', 'Other']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  coverImage: {
    type: String,
    required: true
  },
  additionalImages: [{
    type: String
  }]
}, {
  timestamps: true
});

export default mongoose.model('Item', itemSchema);