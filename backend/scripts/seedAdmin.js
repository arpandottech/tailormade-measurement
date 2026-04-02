import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/measurementdb');

    // Check if an admin already exists
    const adminExists = await Admin.findOne({ username: 'admin' });

    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit();
    }

    // Create the default admin
    const defaultAdmin = new Admin({
      username: 'admin',
      password: 'password123', // Hardcoded default, can be changed later
    });

    await defaultAdmin.save();
    console.log('Admin user created successfully (username: admin, password: password123)');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
