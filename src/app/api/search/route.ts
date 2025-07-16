import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { SearchResult } from '@/types/content';

async function loadContent() {
  const contentDir = path.join(process.cwd(), 'content');
  const content: any[] = [];

  // Load experiences
  const experiencesDir = path.join(contentDir, 'experiences');
  const experienceFiles = await fs.readdir(experiencesDir);
  for (const file of experienceFiles) {
    if (file.endsWith('.json')) {
      const data = await fs.readFile(path.join(experiencesDir, file), 'utf-8');
      const experience = JSON.parse(data);
      content.push({ type: 'experience', ...experience });
    }
  }

  // Load projects
  const projectsDir = path.join(contentDir, 'projects');
  const projectFiles = await fs.readdir(projectsDir);
  for (const file of projectFiles) {
    if (file.endsWith('.json')) {
      const data = await fs.readFile(path.join(projectsDir, file), 'utf-8');
      const project = JSON.parse(data);
      content.push({ type: 'project', ...project });
    }
  }

  // Load blogs
  const blogsDir = path.join(contentDir, 'blogs');
  const blogFiles = await fs.readdir(blogsDir);
  for (const file of blogFiles) {
    if (file.endsWith('.md')) {
      const data = await fs.readFile(path.join(blogsDir, file), 'utf-8');
      const { data: frontmatter, content: blogContent } = matter(data);
      content.push({
        type: 'blog',
        id: file.replace('.md', ''),
        content: blogContent,
        ...frontmatter,
      });
    }
  }

  // Load education
  const educationDir = path.join(contentDir, 'education');
  const educationFiles = await fs.readdir(educationDir);
  for (const file of educationFiles) {
    if (file.endsWith('.json')) {
      const data = await fs.readFile(path.join(educationDir, file), 'utf-8');
      const education = JSON.parse(data);
      content.push({ type: 'education', ...education });
    }
  }

  return content;
}

function searchContent(content: any[], query: string): SearchResult[] {
  const queryLower = query.toLowerCase();
  const results: SearchResult[] = [];

  content.forEach((item) => {
    let relevance = 0;
    let matchedText = '';

    // Search in different fields based on content type
    const searchableText = JSON.stringify(item).toLowerCase();
    
    if (searchableText.includes(queryLower)) {
      relevance = 1;
      
      // Higher relevance for title matches
      if (item.title?.toLowerCase().includes(queryLower)) {
        relevance = 3;
        matchedText = item.title;
      }
      
      // Check specific fields
      if (item.summary?.toLowerCase().includes(queryLower)) {
        relevance = Math.max(relevance, 2);
        matchedText = matchedText || item.summary;
      }
      
      if (item.description?.toLowerCase().includes(queryLower)) {
        relevance = Math.max(relevance, 2);
        matchedText = matchedText || item.description;
      }

      if (relevance > 0) {
        const citationType = item.type.charAt(0).toUpperCase() + item.type.slice(1);
        results.push({
          id: item.id,
          type: item.type,
          title: item.title || item.institution || 'Untitled',
          summary: item.summary || item.description || matchedText,
          relevance,
          citation: `${citationType}: ${item.title || item.institution}`,
        });
      }
    }
  });

  // Sort by relevance
  return results.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
}

function generateResponse(query: string, results: SearchResult[]): string {
  if (results.length === 0) {
    return "I couldn't find specific information about that in my portfolio. Feel free to ask about my experiences, projects, education, or blog posts!";
  }

  const topResult = results[0];
  let response = '';

  switch (topResult.type) {
    case 'experience':
      response = `Based on my experience with ${topResult.title}, ${topResult.summary}`;
      break;
    case 'project':
      response = `I've worked on ${topResult.title}. ${topResult.summary}`;
      break;
    case 'blog':
      response = `I wrote about this in my blog post "${topResult.title}". ${topResult.summary}`;
      break;
    case 'education':
      response = `Regarding my education, ${topResult.summary}`;
      break;
  }

  if (results.length > 1) {
    response += ' I also have related experience in other areas that might interest you.';
  }

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid query' },
        { status: 400 }
      );
    }

    const content = await loadContent();
    const results = searchContent(content, query);
    const response = generateResponse(query, results);

    return NextResponse.json({
      results,
      response,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}