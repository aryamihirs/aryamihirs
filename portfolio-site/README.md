# AI-Powered Portfolio Website

A stunning, interactive portfolio website built with Next.js, featuring AI-powered search capabilities using Google Gemini.

## 🚀 Features

- **Animated Hero Section**: Dynamic text animations with "I code." → "I build." → "I launch."
- **AI-Powered Search**: Intelligent search using RAG (Retrieval-Augmented Generation) with Google Gemini
- **Experience Showcase**: Interactive case studies with detailed project breakdowns
- **Projects Gallery**: Open source projects with GitHub integration
- **Blog Section**: Insights on AI, product management, and technology
- **Education Timeline**: Academic background with achievements
- **Consulting CTA**: Contact forms and consultation booking

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, Framer Motion
- **AI/ML**: Google Gemini, LangChain, FAISS vector store
- **Content**: JSON/Markdown with frontmatter
- **Styling**: TailwindCSS with custom animations
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Python environment for AI features**
   ```bash
   python3 -m venv portfolio-env
   source portfolio-env/bin/activate  # On Windows: portfolio-env\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Google Gemini API key:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Content Management

All content is stored in the `content/` directory:

- `content/experiences/` - Professional experience (JSON)
- `content/projects/` - Personal/open source projects (JSON)  
- `content/blogs/` - Blog posts (Markdown with frontmatter)
- `content/education/` - Educational background (JSON)

### AI Search Setup

The AI search uses Google Gemini for embeddings and response generation. To enable:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env.local` file
3. The search will automatically use AI when the API key is available, falling back to basic search otherwise

## 📝 Customization

### Adding New Experiences

Create a new JSON file in `content/experiences/`:

```json
{
  "id": "unique-id",
  "title": "Experience Title",
  "company": "Company Name",
  "role": "Your Role",
  "duration": "2023 - Present",
  "summary": "Brief description",
  "problem": "Problem you solved",
  "solution": "How you solved it",
  "impact": {
    "metrics": ["Metric 1", "Metric 2"],
    "testimonials": ["Quote from stakeholder"]
  },
  "tags": ["AI", "Product"],
  "featured": true
}
```

### Adding Blog Posts

Create a new Markdown file in `content/blogs/`:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-15"
summary: "Brief description of the post"
tags: ["AI", "Technology"]
coverImage: "/images/cover.jpg"
readTime: "5 min"
---

# Your Blog Content Here

Write your blog content in Markdown format.
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 🔗 Current Status

✅ **Completed Features:**
- Hero section with text animations
- AI-powered search with Gemini integration
- Experience showcase with modal details
- Projects gallery with GitHub integration
- Blog section with content management
- Education timeline
- Consulting CTA with contact modal
- Responsive design with dark mode support
- Content management system

🔄 **Running:**
- Development server on http://localhost:3001
- All sections fully functional
- AI search ready (requires GOOGLE_API_KEY)

---

Built with ❤️ and AI using Next.js, TypeScript, and Google Gemini