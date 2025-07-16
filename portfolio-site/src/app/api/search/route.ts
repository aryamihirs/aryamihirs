import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { SearchResult } from '@/types/content';
import { spawn } from 'child_process';

async function loadContent() {
  const contentDir = path.join(process.cwd(), 'content');
  const content: Record<string, any>[] = [];

  try {
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
  } catch (error) {
    console.error('Error loading content:', error);
  }

  return content;
}

function searchContent(content: Record<string, any>[], query: string): SearchResult[] {
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

function generateBasicResponse(query: string, results: SearchResult[]): string {
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

async function runPythonSearch(query: string): Promise<{ results: SearchResult[], response: string }> {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(process.cwd(), 'src/lib/search_api.py');
    const contentDir = path.join(process.cwd(), 'content');
    
    const python = spawn('/Users/aryamihirs/projects/product/aryamihirs/portfolio-env/bin/python', [pythonScript], {
      cwd: process.cwd(),
      env: { 
        ...process.env,
        CONTENT_DIR: contentDir,
        PYTHONPATH: path.join(process.cwd(), 'src/lib')
      }
    });

    let output = '';
    let error = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      error += data.toString();
    });

    python.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script error:', error);
        reject(new Error('Python search failed'));
        return;
      }

      try {
        const result = JSON.parse(output);
        if (result.error) {
          reject(new Error(result.error));
          return;
        }
        resolve(result);
      } catch (parseError) {
        console.error('Failed to parse Python output:', output);
        reject(new Error('Failed to parse search results'));
      }
    });

    // Send query to Python script
    python.stdin.write(JSON.stringify({ query }));
    python.stdin.end();
  });
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

    // Try AI-powered search first, fallback to basic search
    try {
      if (process.env.GOOGLE_API_KEY) {
        const aiResults = await runPythonSearch(query);
        return NextResponse.json(aiResults);
      }
    } catch (error) {
      console.warn('AI search failed, falling back to basic search:', error);
    }

    // Fallback to basic search
    const content = await loadContent();
    const results = searchContent(content, query);
    const response = generateBasicResponse(query, results);

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