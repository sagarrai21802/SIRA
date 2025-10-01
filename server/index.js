import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import { v2 as cloudinary } from 'cloudinary';
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Also increase URL-encoded limit

// MongoDB URI
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('Missing MongoDB URI');
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    console.log('Scheduled posts request received');
    console.log('Request body size:', JSON.stringify(req.body).length, 'characters');
    console.log('Content length:', req.body.content?.length || 0, 'characters');
    
    const { user_id, content, image_url, scheduled_at, status, platform } = req.body;
    if (!user_id || !content || !scheduled_at) return res.status(400).json({ error: 'user_id, content, scheduled_at required' });
    
    // Validate content length (max 10,000 characters)
    if (content.length > 10000) {
      return res.status(400).json({ error: 'Content too long. Maximum 10,000 characters allowed.' });
    }
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
    
    // Validate content length if content is being updated
    if (updates.content && updates.content.length > 10000) {
      return res.status(400).json({ error: 'Content too long. Maximum 10,000 characters allowed.' });
    }
    
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

// ---- Image Generations ----
const imageGenerationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  prompt: { type: String, required: true },
  cloudinary_url: { type: String, required: true },
  cloudinary_public_id: { type: String, required: true },
  image_type: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  quality: { type: String, required: true },
  created_at: { type: String, required: true }
});
const ImageGeneration = mongoose.model('ImageGeneration', imageGenerationSchema);

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

// ---- Image Generation ----
app.post('/api/generate-image', async (req, res) => {
  try {
    const { user_id, prompt, image_type, width, height, quality } = req.body;
    
    if (!user_id || !prompt || !image_type || !width || !height || !quality) {
      return res.status(400).json({ error: 'user_id, prompt, image_type, width, height, quality required' });
    }

    // Generate image using Gemini REST API
    const fullPrompt = `${prompt} | Style: ${image_type} | Size: ${width}x${height} | Quality: ${quality}`;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt
                }
              ]
            }
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"]
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No candidate returned from Gemini");
    }

    const candidate = data.candidates[0];
    const imagePart = candidate.content.parts.find(
      (p) => p.inlineData?.data
    );
    if (!imagePart) throw new Error("No image returned from Gemini");

    const base64Data = imagePart.inlineData.data;
    const mimeType = imagePart.inlineData.mimeType;
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'sira-generated-images',
          public_id: `image_${Date.now()}_${randomUUID().slice(0, 8)}`,
          transformation: [
            { width: width, height: height, crop: 'fill' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(imageBuffer);
    });

    // Save to MongoDB
    const doc = {
      id: randomUUID(),
      user_id,
      prompt,
      cloudinary_url: uploadResult.secure_url,
      cloudinary_public_id: uploadResult.public_id,
      image_type,
      width: parseInt(width),
      height: parseInt(height),
      quality,
      created_at: new Date().toISOString()
    };

    await ImageGeneration.create(doc);

    res.json({ 
      ok: true, 
      image_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      item: doc
    });

  } catch (err) {
    console.error('Image generation error:', err);
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

// Get user's generated images
app.get('/api/image-generations', async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id required' });
    
    const items = await ImageGeneration.find({ user_id: String(user_id) })
      .sort({ created_at: -1 })
      .lean();
    
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

// Delete generated image
app.delete('/api/image-generations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id required' });
    
    const image = await ImageGeneration.findOne({ id });
    if (!image) return res.status(404).json({ error: 'Image not found' });
    
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinary_public_id);
    
    // Delete from MongoDB
    await ImageGeneration.deleteOne({ id });
    
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

// ---- Undetectable.AI Humanizer ----
app.get('/api/humanize/credits', async (req, res) => {
  try {
    const apiKey = process.env.UNDETECTABLE_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'UNDETECTABLE_API_KEY not configured' });

    const response = await fetch('https://humanize.undetectable.ai/check-user-credits', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'apikey': apiKey
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

app.post('/api/humanize/submit', async (req, res) => {
  try {
    const { content, readability, purpose, strength, model } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'content required' });
    }
    
    if (content.length < 50) {
      return res.status(400).json({ error: 'Content must be at least 50 characters long' });
    }

    const apiKey = process.env.UNDETECTABLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'UNDETECTABLE_API_KEY not configured' });
    }

    const response = await fetch('https://humanize.undetectable.ai/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        content,
        readability: readability || 'High School',
        purpose: purpose || 'General Writing',
        strength: strength || 'More Human',
        model: model || 'v11'
      })
    });

    const data = await response.json();
    
    // Handle API errors properly
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

app.post('/api/humanize/document', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'document id required' });
    }

    const apiKey = process.env.UNDETECTABLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'UNDETECTABLE_API_KEY not configured' });
    }

    const response = await fetch('https://humanize.undetectable.ai/document', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({ id })
    });

    const data = await response.json();
    
    // Handle API errors properly
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
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
      db.collection('templategenerations').countDocuments(filter).catch(() => 0),
    ]);
    res.json({ content, image, project, template });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));