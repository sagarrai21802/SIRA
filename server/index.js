import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import { v2 as cloudinary } from 'cloudinary';
import { GoogleGenerativeAI } from "@google/generative-ai";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
dotenv.config();

const app = express();

// Configure CORS to allow requests from Vercel subdomains and localhost variants
const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  process.env.FRONTEND_URL || 'http://localhost:3000'
]);

const vercelSubdomainRegex = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser or same-origin requests with no Origin header
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin) || vercelSubdomainRegex.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
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
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Define profile schema
const profileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String },
  full_name: { type: String },
  phone: { type: String },
  avatar_url: { type: String },
  gender: { type: String },
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
  // LinkedIn OAuth tokens and member URN for posting
  linkedin_access_token: { type: String },
  linkedin_refresh_token: { type: String },
  linkedin_expires_at: { type: Date },
  linkedin_member_urn: { type: String },
  is_profile_complete: { type: Boolean, default: false },
  profile_completed_at: { type: String },
  created_at: { type: String },
  updated_at: { type: String }
});

const User = mongoose.model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema);

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// JWT Secret (in production, use a proper secret)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, full_name, phone } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = randomUUID();
    const user = new User({
      id: userId,
      email,
      password: hashedPassword
    });

    await user.save();

    // Create profile
    const profile = new Profile({
      id: userId,
      email,
      full_name: full_name || null,
      phone: phone || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    await profile.save();

    res.json({ 
      message: 'User created successfully',
      user: {
        id: userId,
        email,
        full_name: full_name || null,
        phone: phone || null
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('JWT_SECRET present:', !!process.env.JWT_SECRET);
    console.log('MONGODB_URI present:', !!process.env.MONGODB_URI);
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log('User found:', user.id);

    // Check if user has a password set (for existing users who might not have one)
    if (!user.password) {
      console.log('User has no password set:', user.id);
      return res.status(400).json({
        error: 'Account needs password setup. Please register a new account or contact support.',
        needsPasswordSetup: true
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('Invalid password for user:', user.id);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log('Password valid for user:', user.id);

    // Get user profile
    const profile = await Profile.findOne({ id: user.id });
    console.log('Profile found:', !!profile, 'for user:', user.id);

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('JWT token created for user:', user.id);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: profile?.full_name || null,
        phone: profile?.phone || null,
        avatar_url: profile?.avatar_url || null,
        company_name: profile?.company_name || null,
        industry: profile?.industry || null,
        business_type: profile?.business_type || null,
        location: profile?.location || null,
        company_size: profile?.company_size || null,
        target_audience: profile?.target_audience || null,
        brand_voice: profile?.brand_voice || null,
        goals: profile?.goals || null,
        linkedin_url: profile?.linkedin_url || null,
        instagram_url: profile?.instagram_url || null,
        facebook_url: profile?.facebook_url || null,
        created_at: user.createdAt.toISOString(),
        updated_at: profile?.updated_at || user.createdAt.toISOString()
      }
    });
    console.log('Login successful for user:', user.id);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

// Get current user endpoint
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = await Profile.findOne({ id: user.id });
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        full_name: profile?.full_name || null,
        phone: profile?.phone || null,
        avatar_url: profile?.avatar_url || null,
        company_name: profile?.company_name || null,
        industry: profile?.industry || null,
        business_type: profile?.business_type || null,
        location: profile?.location || null,
        company_size: profile?.company_size || null,
        target_audience: profile?.target_audience || null,
        brand_voice: profile?.brand_voice || null,
        goals: profile?.goals || null,
        linkedin_url: profile?.linkedin_url || null,
        instagram_url: profile?.instagram_url || null,
        facebook_url: profile?.facebook_url || null,
        linkedin_connected: Boolean(profile?.linkedin_access_token && profile?.linkedin_member_urn),
        created_at: user.createdAt.toISOString(),
        updated_at: profile?.updated_at || user.createdAt.toISOString()
      }
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: err.message || 'Failed to get user' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  // In a real app, you might want to blacklist the token
  res.json({ message: 'Logged out successfully' });
});

// Set password for existing users (migration endpoint)
app.post('/api/auth/set-password', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user already has a password
    if (user.password) {
      return res.status(400).json({ error: 'User already has a password set' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user with password
    await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    res.json({ message: 'Password set successfully' });
  } catch (err) {
    console.error('Set password error:', err);
    res.status(500).json({ error: err.message || 'Failed to set password' });
  }
});

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

// ---- Deletion/Complaint Requests ----
const deletionComplaintSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  content_url: { type: String },
  content_type: { type: String, enum: ['text', 'image', 'post', 'other'], required: true },
  reason: { type: String, enum: ['inaccurate', 'harmful', 'copyright', 'privacy', 'other'], required: true },
  details: { type: String, required: true },
  created_at: { type: String, required: true },
  status: { type: String, enum: ['received', 'in_review', 'resolved'], default: 'received' }
});
const DeletionComplaint = mongoose.model('DeletionComplaint', deletionComplaintSchema);

app.post('/api/deletion-complaints', async (req, res) => {
  try {
    const { name, email, content_url, content_type, reason, details } = req.body || {};
    if (!name || !email || !content_type || !reason || !details) {
      return res.status(400).json({ error: 'name, email, content_type, reason, details required' });
    }
    if (String(details).trim().length < 20) {
      return res.status(400).json({ error: 'details must be at least 20 characters' });
    }
    const doc = {
      id: randomUUID(),
      name: String(name).trim(),
      email: String(email).trim(),
      content_url: content_url ? String(content_url).trim() : null,
      content_type: String(content_type),
      reason: String(reason),
      details: String(details).trim(),
      created_at: new Date().toISOString(),
      status: 'received'
    };
    await DeletionComplaint.create(doc);
    res.json({ ok: true, id: doc.id });
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

// Edit an existing image using Gemini by providing the original image and an edit prompt
app.post('/api/edit-image', async (req, res) => {
  try {
    const { image_url, prompt } = req.body || {};
    if (!image_url || !prompt) {
      return res.status(400).json({ error: 'image_url and prompt required' });
    }

    // Fetch the original image and convert to base64
    const originalResp = await fetch(image_url);
    if (!originalResp.ok) {
      return res.status(400).json({ error: 'Failed to fetch original image' });
    }
    const contentType = originalResp.headers.get('content-type') || 'image/png';
    const originalArrayBuffer = await originalResp.arrayBuffer();
    const originalBuffer = Buffer.from(originalArrayBuffer);
    const base64Image = originalBuffer.toString('base64');

    // Call Gemini image model with prompt + inline image
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
                { text: String(prompt) },
                {
                  inlineData: {
                    mimeType: contentType,
                    data: base64Image
                  }
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
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    if (!data.candidates || data.candidates.length === 0) {
      return res.status(500).json({ error: 'No candidate returned from Gemini' });
    }

    // Extract the generated image inlineData
    const candidate = data.candidates[0];
    const imagePart = candidate.content?.parts?.find(p => p.inlineData?.data);
    if (!imagePart) {
      return res.status(500).json({ error: 'No image returned from Gemini' });
    }

    const editedBase64 = imagePart.inlineData.data;
    const editedMimeType = imagePart.inlineData.mimeType || 'image/png';
    const editedBuffer = Buffer.from(editedBase64, 'base64');

    // Upload edited image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'sira-generated-images',
          public_id: `image_edit_${Date.now()}_${randomUUID().slice(0, 8)}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(editedBuffer);
    });

    res.json({
      ok: true,
      image_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      content_type: editedMimeType
    });
  } catch (err) {
    console.error('Image edit error:', err);
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

// Enhance an image edit prompt into a single optimized paragraph (no lists, no bullets)
app.post('/api/enhance-image-prompt', async (req, res) => {
  try {
    const { prompt } = req.body || {};
    if (!prompt || !String(prompt).trim()) {
      return res.status(400).json({ error: 'prompt required' });
    }

    const systemInstruction = `Rewrite the user's image edit request into ONE optimized paragraph that will guide an image-editing model to produce a high-quality, realistic result. Requirements:\n- No bullet points or numbering.\n- No preface or commentary. Output ONLY the paragraph.\n- Preserve subject identity and key details.\n- Keep lighting, perspective, and composition coherent unless explicitly changed.\n- Avoid artifacts, banding, halos, or over-smoothing.\n- Use concise, direct language; include style cues only if relevant.`;

    const merged = `${systemInstruction}\n\nUser request: ${String(prompt)}`;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: merged }] }
          ]
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json(errData);
    }
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join(' ');
    if (!text) return res.status(500).json({ error: 'No text returned' });

    // Normalize whitespace, ensure single paragraph
    const paragraph = String(text).replace(/\s+/g, ' ').trim();
    res.json({ ok: true, prompt: paragraph });
  } catch (err) {
    console.error('Enhance prompt error:', err);
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

// ---- LinkedIn OAuth & Posting ----
app.post('/api/linkedin/exchange-code', authenticateToken, async (req, res) => {
  try {
    const { code, redirect_uri: providedRedirect } = req.body || {};
    if (!code) {
      return res.status(400).json({ error: 'code required' });
    }
    if (!providedRedirect) {
      return res.status(400).json({ error: 'redirect_uri required' });
    }

    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';

    const tokenResp = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: providedRedirect,
        client_id: clientId,
        client_secret: clientSecret
      })
    });

    const tokenData = await tokenResp.json();
    if (!tokenResp.ok) {
      return res.status(tokenResp.status).json(tokenData);
    }

    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in; // seconds
    const refreshToken = tokenData.refresh_token || null;

    // Prefer OIDC userinfo when openid is used; fallback to /v2/me if available
    let memberId = null;
    let userinfoResp = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (userinfoResp.ok) {
      const ui = await userinfoResp.json();
      memberId = ui && (ui.sub || ui.user_id || null);
    } else {
      const meResp = await fetch('https://api.linkedin.com/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (meResp.ok) {
        const meData = await meResp.json();
        memberId = meData && meData.id;
      } else {
        const errData = await meResp.json().catch(() => ({}));
        return res.status(meResp.status).json(errData);
      }
    }

    if (!memberId) {
      return res.status(400).json({ error: 'Failed to determine LinkedIn member id' });
    }
    const memberUrn = `urn:li:person:${memberId}`;

    const expiresAt = new Date(Date.now() + (expiresIn || 0) * 1000);

    await Profile.updateOne(
      { id: req.user.userId },
      {
        $set: {
          linkedin_access_token: accessToken,
          linkedin_refresh_token: refreshToken,
          linkedin_expires_at: expiresAt,
          linkedin_member_urn: memberUrn,
          updated_at: new Date().toISOString()
        }
      },
      { upsert: true }
    );

    res.json({ ok: true, member_urn: memberUrn });
  } catch (err) {
    console.error('LinkedIn exchange error:', err);
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

app.get('/api/linkedin/status', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ id: req.user.userId }).lean();
    res.json({
      connected: Boolean(profile?.linkedin_access_token && profile?.linkedin_member_urn),
      member_urn: profile?.linkedin_member_urn || null,
      expires_at: profile?.linkedin_expires_at || null
    });
  } catch (err) {
    res.status(500).json({ error: err && err.message ? err.message : 'Internal error' });
  }
});

app.post('/api/linkedin/post', authenticateToken, async (req, res) => {
  try {
    const { content, image_url, image_urls } = req.body || {};
    if (!content) return res.status(400).json({ error: 'content required' });

    const profile = await Profile.findOne({ id: req.user.userId }).lean();
    if (!profile || !profile.linkedin_access_token || !profile.linkedin_member_urn) {
      return res.status(400).json({ error: 'LinkedIn not connected' });
    }

    const inputImageUrls = Array.isArray(image_urls) ? image_urls.filter(Boolean) : (image_url ? [image_url] : []);
    const mediaAssetUrns = [];

    for (const url of inputImageUrls) {
      // 1) Register upload with LinkedIn to obtain upload URL and asset URN
      const registerBody = {
        registerUploadRequest: {
          recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
          owner: profile.linkedin_member_urn,
          serviceRelationships: [
            { relationshipType: "OWNER", identifier: "urn:li:userGeneratedContent" }
          ]
        }
      };

      const registerResp = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${profile.linkedin_access_token}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(registerBody)
      });
      const registerData = await registerResp.json();
      if (!registerResp.ok) {
        return res.status(registerResp.status).json(registerData);
      }

      const mediaAssetUrn = registerData?.value?.asset;
      const uploadUrl = registerData?.value?.uploadMechanism?.
        ["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]?.uploadUrl;
      if (!mediaAssetUrn || !uploadUrl) {
        return res.status(500).json({ error: 'Failed to get LinkedIn upload URL' });
      }

      // 2) Download image data from the provided URL
      const imageResp = await fetch(url);
      if (!imageResp.ok) {
        return res.status(400).json({ error: 'Failed to fetch image from provided URL' });
      }
      const contentType = imageResp.headers.get('content-type') || 'image/jpeg';
      const arrayBuffer = await imageResp.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 3) Upload image binary to LinkedIn upload URL
      const uploadResp = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
          'Content-Length': String(buffer.length)
        },
        body: buffer
      });
      if (!uploadResp.ok) {
        const errText = await uploadResp.text();
        return res.status(uploadResp.status).json({ error: 'LinkedIn image upload failed', details: errText });
      }

      mediaAssetUrns.push(mediaAssetUrn);
    }

    // 4) Create UGC post with or without uploaded images
    const hasImages = mediaAssetUrns.length > 0;
    const ugcBody = hasImages ? {
      author: profile.linkedin_member_urn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text: content },
          shareMediaCategory: 'IMAGE',
          media: mediaAssetUrns.map((urn) => ({ status: 'READY', media: urn }))
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    } : {
      author: profile.linkedin_member_urn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text: content },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    const postResp = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${profile.linkedin_access_token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(ugcBody)
    });

    const postData = await postResp.json().catch(() => ({}));
    if (!postResp.ok) {
      return res.status(postResp.status).json(postData);
    }

    res.json({ ok: true, data: postData });
  } catch (err) {
    console.error('LinkedIn post error:', err);
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

// ---- Upload Profile Picture ----
app.post('/api/upload-profile-picture', async (req, res) => {
  try {
    const { image, filename, mimetype } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image, 'base64');

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'sira-profile-pictures',
          public_id: `profile_${Date.now()}_${randomUUID().slice(0, 8)}`,
          transformation: [
            { width: 256, height: 256, crop: 'fill' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(imageBuffer);
    });

    res.json({
      ok: true,
      image_url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    });

  } catch (err) {
    console.error('Profile picture upload error:', err);
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