import express from 'express';
import Measurement from '../models/Measurement.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create new measurement
// @route   POST /api/measurements
// @access  Public
router.post('/', async (req, res) => {
  const { customerName, contactDetails, category, measurements } = req.body;

  if (!customerName || !contactDetails || !category) {
    return res.status(400).json({ message: 'Name, contact, and category are required' });
  }

  try {
    const measurement = new Measurement({
      customerName,
      contactDetails,
      category,
      measurements: measurements || {},
    });

    const createdMeasurement = await measurement.save();
    res.status(201).json(createdMeasurement);
  } catch (error) {
    res.status(500).json({ message: 'Server error saving measurement' });
  }
});

// @desc    Get all measurements
// @route   GET /api/measurements
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
  try {
    const measurements = await Measurement.find({}).sort({ createdAt: -1 });
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching measurements' });
  }
});

export default router;
