# AI-Powered Portfolio Website

A modern portfolio website built with Next.js 15, featuring AI-powered search capabilities using Google Gemini and a unified case study architecture.

## 🚀 Current Implementation Status

### ✅ **Working Features**

**Backend & APIs:**
- **Full API Infrastructure** - All content endpoints functional
- **AI-Powered Search** - Google Gemini integration with RAG architecture
- **Unified Data Model** - CaseStudy interface supporting work, projects, education, and research
- **Content APIs** - `/api/content/*` endpoints for all content types
- **Python Search Engine** - LangChain + FAISS for semantic search

**Frontend Pages:**
- **Case Study Detail Pages** - Fully functional at `/case-study/[id]`
- **Homepage** - Basic structure (needs UI implementation)

### 🚧 **In Progress**

The main homepage UI components need to be rebuilt:
- Hero section with AI search integration
- Unified CaseStudies component
- Blog section
- Education timeline
- Consulting CTA

## 🛠 Tech Stack

**Frontend:**
- Next.js 15.4.1 with App Router
- React 19.1.0 with TypeScript
- Tailwind CSS v4
- Framer Motion (for animations)
- Lucide React (icons)

**Backend:**
- Next.js API Routes
- Python AI Search (Google Gemini + LangChain)
- FAISS vector database
- JSON/Markdown content management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-site
   ```

2. **Install Node dependencies**
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
   Create a `.env.local` file:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   PYTHON_PATH=/path/to/portfolio-env/bin/python  # Optional: defaults to python3
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
portfolio-site/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API endpoints
│   │   │   ├── content/       # Content APIs
│   │   │   └── search/        # AI search endpoint
│   │   ├── case-study/[id]/   # Dynamic case study pages
│   │   └── page.tsx           # Homepage (minimal)
│   ├── components/            # React components
│   ├── lib/                   # Python AI search scripts
│   └── types/                 # TypeScript definitions
├── content/                   # Content storage
│   ├── blogs/                # Blog markdown files
│   ├── education/            # Education JSON
│   ├── experiences/          # Work experience JSON
│   └── projects/             # Project JSON
└── public/                   # Static assets
```

## 🔧 Configuration

### Content Management

Content is stored in the `content/` directory:
- **Experiences**: JSON files defining work experiences
- **Projects**: JSON files for personal/open source projects
- **Blogs**: Markdown files with frontmatter
- **Education**: JSON files for academic background

### AI Search Setup

The AI search requires:
1. Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Python environment with required packages
3. Environment variables properly configured

## 📝 API Endpoints

- `GET /api/content/case-studies` - Returns unified case study data
- `GET /api/content/experiences` - Returns work experiences
- `GET /api/content/projects` - Returns projects
- `GET /api/content/blogs` - Returns blog posts
- `GET /api/content/education` - Returns education data
- `POST /api/search` - AI-powered search with query in body

## 🎨 Design System

- **Colors**: Neutral palette with sage accents
- **Typography**: Inter font with responsive sizing
- **Layout**: Max-width containers with consistent spacing
- **Components**: Card-based design with hover effects

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   - `GOOGLE_API_KEY`
   - `PYTHON_PATH` (if using custom Python path)
4. Deploy!

### Important Notes

- Python dependencies must be installed on the deployment server
- Consider using Docker for consistent Python environment
- AI search falls back to basic search if API key is missing

## 🔗 Current Limitations

1. **Homepage UI** - Currently minimal, needs component implementation
2. **Python Dependency** - AI search requires Python runtime
3. **No Image Assets** - Images referenced in content need to be added

## 📈 Performance

- Lighthouse scores optimized for Core Web Vitals
- Code splitting at route level
- Minimal JavaScript bundle with Tailwind CSS v4
- Static generation where possible

---

Built with Next.js, TypeScript, Tailwind CSS, and Google Gemini AI