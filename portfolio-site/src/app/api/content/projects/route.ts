import { NextResponse } from 'next/server';

export async function GET() {
  const projects = [
    {
      id: 'rag-agent',
      title: 'Open Source RAG Agent Framework',
      description: 'Built a flexible RAG agent framework for conversational AI applications with support for multiple LLMs and vector databases',
      techStack: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI', 'Docker'],
      githubUrl: 'https://github.com/username/rag-agent',
      liveUrl: 'https://rag-demo.example.com',
      status: 'active',
      highlights: [
        '10k+ GitHub stars',
        'Used by 50+ companies',
        'Modular architecture for easy customization',
        'Support for 15+ vector databases'
      ],
      screenshots: [],
      tags: ['AI', 'RAG', 'Open Source', 'Python'],
      featured: true
    },
    {
      id: 'portfolio-ai-search',
      title: 'AI-Powered Portfolio Website',
      description: 'This very website! Built with Next.js, featuring AI-powered search using Google Gemini and beautiful animations',
      techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Google Gemini', 'Vercel'],
      githubUrl: 'https://github.com/username/portfolio-site',
      liveUrl: 'https://yourportfolio.com',
      status: 'active',
      highlights: [
        'AI-powered semantic search',
        'Beautiful glass morphism design',
        'Responsive animations',
        'Modern tech stack'
      ],
      screenshots: [],
      tags: ['Next.js', 'AI', 'Web Development', 'Design'],
      featured: true
    },
    {
      id: 'product-metrics-dashboard',
      title: 'Real-time Product Metrics Dashboard',
      description: 'A comprehensive dashboard for tracking product KPIs with real-time data visualization and alerting',
      techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
      githubUrl: 'https://github.com/username/metrics-dashboard',
      liveUrl: 'https://metrics-demo.example.com',
      status: 'completed',
      highlights: [
        'Real-time data streaming',
        'Interactive visualizations',
        'Custom alerting system',
        'Multi-tenant architecture'
      ],
      screenshots: [],
      tags: ['React', 'Data Visualization', 'Analytics', 'Real-time'],
      featured: false
    }
  ];

  return NextResponse.json(projects);
}