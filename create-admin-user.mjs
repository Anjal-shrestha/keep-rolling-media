import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'; // Import the main package

dotenv.config({ path: './.env.local' }); // Explicitly load .env.local

// --- Your User Model (Copied from src/models/User.ts for script use) ---
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);
// -----------------------------------------------------------------------

const MONGODB_URI = process.env.MONGODB_URI;

// --- !! IMPORTANT: SET YOUR ADMIN CREDENTIALS HERE !! ---
const ADMIN_EMAIL = 'admin@keeprollingmedia.com';
const ADMIN_PASSWORD = 'YourStrongPassword123!'; 

const createAdmin = async () => {
  if (!MONGODB_URI) {
    console.error('🔴 MONGODB_URI not found in .env.local file.');
    return;
  }

  console.log('Connecting to database...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Database connected.');

  const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
  if (existingAdmin) {
    console.log('🟡 Admin user already exists.');
    await mongoose.connection.close();
    return;
  }

  console.log('Creating admin user...');
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const adminUser = new User({
    email: ADMIN_EMAIL,
    password: hashedPassword,
  });

  await adminUser.save();
  console.log('✅ Admin user created successfully!');
  await mongoose.connection.close();
};

createAdmin().catch((err) => {
  console.error('🔴 Error creating admin user:', err);
  mongoose.connection.close();
});