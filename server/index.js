import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoUri = process.env.MONGODB_URI;
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
  full_name: { type: String },
  phone: { type: String },
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
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
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
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

// Get profile by id
app.get('/api/profiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id required' });
    const profile = await Profile.findOne({ id }).lean();
    if (!profile) return res.status(404).json({ error: 'not found' });
    res.json({ profile });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

// ---- Content Generations ----
const contentGenerationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  prompt: { type: String, required: true },
  generated_content: { type: String },
  content_type: { type: String, required: true },
  tone: { type: String },
  created_at: { type: String, required: true }
});
const ContentGeneration = mongoose.model('ContentGeneration', contentGenerationSchema);

app.post('/api/content-generations', async (req, res) => {
  try {
    const { user_id, prompt, generated_content, content_type, tone } = req.body;
    if (!user_id || !prompt || !content_type) return res.status(400).json({ error: 'user_id, prompt, content_type required' });
    const doc = {
      id: randomUUID(),
      user_id,
      prompt,
      generated_content: generated_content ?? null,
      content_type,
      tone: tone ?? null,
      created_at: new Date().toISOString()
    };
    await ContentGeneration.create(doc);
    res.json({ ok: true, item: doc });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

app.get('/api/content-generations', async (req, res) => {
  try {
    const { user_id, content_type } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id required' });
    const filter = { user_id: String(user_id) };
    if (content_type) filter.content_type = String(content_type);
    const items = await ContentGeneration.find(filter).sort({ created_at: -1 }).lean();
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

app.delete('/api/content-generations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id required' });
    await ContentGeneration.deleteOne({ id });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

// ---- Template Generations ----
const templateGenerationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  platform: { type: String, required: true },
  prompt: { type: String, required: true },
  template_content: { type: String, required: true },
  created_at: { type: String, required: true }
});
const TemplateGeneration = mongoose.model('TemplateGeneration', templateGenerationSchema);

app.post('/api/template-generations', async (req, res) => {
  try {
    const { user_id, platform, prompt, template_content } = req.body;
    if (!user_id || !platform || !prompt || !template_content) return res.status(400).json({ error: 'user_id, platform, prompt, template_content required' });
    const doc = {
      id: randomUUID(),
      user_id,
      platform,
      prompt,
      template_content,
      created_at: new Date().toISOString()
    };
    await TemplateGeneration.create(doc);
    res.json({ ok: true, item: doc });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

app.get('/api/template-generations/daily-count', async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id required' });
    const now = new Date();
    const yyyy = now.getUTCFullYear();
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(now.getUTCDate()).padStart(2, '0');
    const start = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
    const end = `${yyyy}-${mm}-${dd}T23:59:59.999Z`;
    const count = await TemplateGeneration.countDocuments({ user_id: String(user_id), created_at: { $gte: start, $lt: end } });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

// ---- Scheduled Posts ----
const scheduledPostSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  content: { type: String, required: true },
  image_url: { type: String },
  scheduled_at: { type: String, required: true },
  status: { type: String, default: 'scheduled' },
  platform: { type: String }
});
const ScheduledPost = mongoose.model('ScheduledPost', scheduledPostSchema);

app.post('/api/scheduled-posts', async (req, res) => {
  try {
    const { user_id, content, image_url, scheduled_at, status, platform } = req.body;
    if (!user_id || !content || !scheduled_at) return res.status(400).json({ error: 'user_id, content, scheduled_at required' });
    const doc = {
      id: randomUUID(),
      user_id,
      content,
      image_url: image_url ?? null,
      scheduled_at,
      status: status ?? 'scheduled',
      platform: platform ?? null
    };
    await ScheduledPost.create(doc);
    res.json({ ok: true, item: doc });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

app.get('/api/scheduled-posts', async (req, res) => {
  try {
    const { user_id, from, to } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id required' });
    const filter = { user_id: String(user_id) };
    if (from || to) {
      filter.scheduled_at = {};
      if (from) filter.scheduled_at.$gte = String(from);
      if (to) filter.scheduled_at.$lte = String(to);
    }
    const items = await ScheduledPost.find(filter).sort({ scheduled_at: -1 }).lean();
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

app.patch('/api/scheduled-posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};
    if (!id) return res.status(400).json({ error: 'id required' });
    await ScheduledPost.updateOne({ id }, { $set: updates });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

app.delete('/api/scheduled-posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id required' });
    await ScheduledPost.deleteOne({ id });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

// ---- Feedback ----
const feedbackSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: String, required: true }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'name, email, message required' });
    const doc = { id: randomUUID(), name, email, message, created_at: new Date().toISOString() };
    await Feedback.create(doc);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

// ---- Simple counts for dashboard (no models required) ----
app.get('/api/stats/counts', async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id required' });
    const db = mongoose.connection.db;
    const filter = { user_id: String(user_id) };
    const [content, image, project, template] = await Promise.all([
      db.collection('contentgenerations').countDocuments(filter).catch(() => 0),
      db.collection('imagegenerations').countDocuments(filter).catch(() => 0),
      db.collection('projects').countDocuments(filter).catch(() => 0),
      db.collection('templates').countDocuments(filter).catch(() => 0),
    ]);
    res.json({ content, image, project, template });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));