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