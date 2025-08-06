# SIRA - AI-Powered Marketing Platform

SIRA is a comprehensive marketing platform designed for solo founders, startups, and content teams. It provides AI-powered tools for content generation, image creation, SEO optimization, and campaign management.

## Features

- **AI Content Generator**: Create blog posts, social media content, emails, and ad copy
- **Image Generator**: Generate stunning visuals using AI-powered image creation
- **SEO Toolkit**: Optimize content with meta tags, keyword analysis, and readability tools
- **User Authentication**: Secure login and registration with Supabase
- **Dark Mode**: Beautiful dark and light theme support
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **UI Components**: Custom components with Lucide React icons
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SIRA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   To get these values:
   1. Go to [Supabase](https://supabase.com) and create a new project
   2. Navigate to Settings > API
   3. Copy the Project URL and anon/public key

4. **Set up the database**
   
   In your Supabase dashboard, run the following SQL to create the required tables:

   ```sql
   -- Create content_generations table
   CREATE TABLE content_generations (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     project_id UUID,
     content_type TEXT NOT NULL,
     prompt TEXT NOT NULL,
     generated_content TEXT NOT NULL,
     tone TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create image_generations table
   CREATE TABLE image_generations (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     project_id UUID,
     prompt TEXT NOT NULL,
     image_url TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create projects table
   CREATE TABLE projects (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     name TEXT NOT NULL,
     description TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create brand_settings table
   CREATE TABLE brand_settings (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     brand_name TEXT,
     brand_tone TEXT DEFAULT 'professional',
     primary_color TEXT,
     logo_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;
   ALTER TABLE image_generations ENABLE ROW LEVEL SECURITY;
   ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
   ALTER TABLE brand_settings ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view their own content generations" ON content_generations
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert their own content generations" ON content_generations
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can view their own image generations" ON image_generations
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert their own image generations" ON image_generations
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can view their own projects" ON projects
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert their own projects" ON projects
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can view their own brand settings" ON brand_settings
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert their own brand settings" ON brand_settings
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Footer components
│   └── UI/            # Button, Input, Card components
├── hooks/              # Custom React hooks
├── lib/                # External library configurations
├── pages/              # Page components
│   └── Auth/          # Login, Signup pages
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

## Features in Detail

### Content Generator
- Generate blog posts, social media content, emails, and ad copy
- Choose from different content types and tones
- Copy or download generated content
- Automatic saving to database

### Image Generator
- Create AI-powered images from text prompts
- Multiple style options (realistic, artistic, cartoon, etc.)
- Different size options (square, landscape, portrait)
- Daily quota system with upgrade prompts

### SEO Toolkit
- Meta tag generator with character limits
- Keyword analysis with difficulty and volume metrics
- Readability analysis with suggestions
- Schema markup generator for structured data

### Dashboard
- Overview of user's content and image generation stats
- Quick action buttons for common tasks
- Recent activity tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Advanced AI content generation with multiple models
- [ ] Image editing and manipulation tools
- [ ] Campaign management and scheduling
- [ ] Analytics and performance tracking
- [ ] Team collaboration features
- [ ] API for third-party integrations