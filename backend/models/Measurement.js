import mongoose from 'mongoose';

const measurementSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  contactDetails: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  measurements: {
    neck: { type: String, default: '' },
    shoulder: { type: String, default: '' },
    upperArm: { type: String, default: '' },
    chest: { type: String, default: '' },
    waist: { type: String, default: '' },
    hip: { type: String, default: '' },
    upperThigh: { type: String, default: '' },
    leftKnee: { type: String, default: '' },
    rightKnee: { type: String, default: '' },
    calf: { type: String, default: '' },
    ankle: { type: String, default: '' },
    length: { type: String, default: '' },
    weight: { type: String, default: '' },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Measurement', measurementSchema);
