import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoUri = "mongodb+srv://sagarrai:Rai21802%40@cluster0.8vhu8vd.mongodb.net/SyraDB?retryWrites=true&w=majority"
if (!mongoUri) {
  console.error('Missing MongoDB URI');
  process.exit(1);
}

// Connect to MongoDB via Mongoose
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB via Mongoose'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define a simple user schema
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Define profile schema
const profileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String },
  company_name: { type: String },
  industry: { type: String },
  business_type: { type: String },
  location: { type: String },
  company_size: { type: String },
  target_audience: { type: String },
  brand_voice: { type: String },
  goals: { type: String },
  linkedin_url: { type: String },
  instagram_url: { type: String },
  facebook_url: { type: String },
  is_profile_complete: { type: Boolean, default: false },
  profile_completed_at: { type: String },
  created_at: { type: String },
  updated_at: { type: String }
});

const User = mongoose.model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema);

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Upsert user
app.post('/api/users/upsert', async (req, res) => {
  try {
    const { id, email } = req.body;
    if (!id) return res.status(400).json({ error: 'id required' });

    await User.updateOne(
      { id },
      { $setOnInsert: { id, email: email ?? null, createdAt: new Date() } },
      { upsert: true }
    );

    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal error' });
  }
});

// Upsert profile
app.post('/api/profiles/upsert', async (req, res) => {
  try {
    const { id, ...profileData } = req.body;
    if (!id) return res.status(400).json({ error: 'id required' });

    // Set timestamps
    const now = new Date().toISOString();
    const updateData = {
      ...profileData,
      updated_at: now,
      ...(profileData.is_profile_complete && !profileData.profile_completed_at ? { profile_completed_at: now } : {})
    };

    await Profile.updateOne(
      { id },
      { 
        $set: updateData,
        $setOnInsert: { 
          id, 
          created_at: now 
        }
      },
      { upsert: true }
    );

    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal error' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));