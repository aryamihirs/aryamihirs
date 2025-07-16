// Unified Case Study structure that can represent work experiences, projects, etc.
export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  category: 'work' | 'project' | 'education' | 'research';
  type: 'experience' | 'project' | 'case-study' | 'research';
  
  // Organization/Company info
  company?: string;
  role?: string;
  duration?: string;
  period?: string;
  
  // Content sections
  problem?: string;
  solution?: string;
  approach?: string;
  challenges?: string;
  outcomes?: string;
  
  // Impact and metrics
  impact?: {
    metrics: string[];
    testimonials: string[];
    achievements: string[];
  };
  
  // Technical details
  techStack?: string[];
  tools?: string[];
  methodologies?: string[];
  
  // Links and resources
  demoUrl?: string;
  prototypeUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  
  // Media
  screenshots: string[];
  coverImage?: string;
  
  // Metadata
  tags: string[];
  skills: string[];
  stakeholders?: string[];
  teamSize?: string;
  status: 'active' | 'completed' | 'archived' | 'ongoing';
  featured: boolean;
  priority: number; // for ordering
  
  // Filtering and organization
  companySlug?: string; // for company-specific pages
  projectType?: 'product' | 'engineering' | 'research' | 'consulting';
  
  // Learning outcomes
  learnings?: string[];
  contributions?: string[];
  
  // Dates
  startDate?: string;
  endDate?: string;
  publishedDate?: string;
}

// Keep original interfaces for backward compatibility during migration
export interface Experience {
  id: string;
  title: string;
  company: string;
  role: string;
  duration: string;
  summary: string;
  problem: string;
  stakeholders: string[];
  solution: string;
  impact: {
    metrics: string[];
    testimonials: string[];
  };
  contributions: string[];
  learnings: string[];
  tags: string[];
  featured: boolean;
  demoUrl?: string;
  prototypeUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'active' | 'completed' | 'archived';
  highlights: string[];
  screenshots: string[];
  tags: string[];
  featured: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  coverImage: string;
  readTime: string;
  content: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  description: string;
  achievements: string[];
  coursework: string[];
}

export interface SearchResult {
  id: string;
  type: 'experience' | 'project' | 'blog' | 'education' | 'case-study';
  title: string;
  summary: string;
  relevance: number;
  citation: string;
  category?: string;
  company?: string;
  tags?: string[];
}