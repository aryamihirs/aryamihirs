import { NextResponse } from 'next/server';

export async function GET() {
  const posts = [
    {
      slug: 'building-ai-agents',
      title: 'Building Production-Ready AI Agents',
      date: '2024-01-15',
      summary: 'A comprehensive guide to building, deploying, and scaling AI agents in production environments. Learn about architecture patterns, monitoring, and best practices.',
      tags: ['AI', 'Engineering', 'Product', 'LLMs'],
      coverImage: '',
      readTime: '8 min',
      content: `# Building Production-Ready AI Agents

      AI agents are becoming increasingly important in modern applications, but building them for production requires careful consideration of architecture, monitoring, and user experience.

      ## Key Considerations

      1. **Architecture Design**: Choose the right patterns for your use case
      2. **Monitoring & Observability**: Track performance and user interactions
      3. **Safety & Reliability**: Implement guardrails and fallback mechanisms
      4. **User Experience**: Design intuitive interfaces for AI interactions

      ## Implementation Strategies

      When building AI agents, consider these proven patterns:
      - RAG (Retrieval-Augmented Generation) for knowledge-based queries
      - Multi-agent systems for complex workflows
      - Human-in-the-loop for critical decisions

      The future of AI agents lies in their ability to seamlessly integrate into existing workflows while providing intelligent assistance that feels natural and trustworthy.`
    },
    {
      slug: 'product-management-ai',
      title: 'Product Management in the Age of AI',
      date: '2024-01-10',
      summary: 'How AI is transforming product management and what PMs need to know to stay ahead. Exploring new frameworks, tools, and methodologies.',
      tags: ['Product Management', 'AI', 'Strategy', 'Leadership'],
      coverImage: '',
      readTime: '6 min',
      content: `# Product Management in the Age of AI

      The role of product managers is evolving rapidly as AI becomes central to product development. Here's how to adapt and thrive.

      ## The New PM Skillset

      Modern product managers need to understand:
      - AI capabilities and limitations
      - Data requirements for ML models
      - User experience implications of AI features
      - Ethical considerations in AI products

      ## Framework for AI Product Development

      1. **Problem Definition**: Clearly articulate the problem AI will solve
      2. **Data Strategy**: Ensure access to quality training data
      3. **User Research**: Understand how users interact with AI features
      4. **Metrics & Success**: Define meaningful KPIs for AI features

      The most successful AI products are those where AI enhances human capabilities rather than replacing them entirely.`
    },
    {
      slug: 'rag-architecture-guide',
      title: 'Complete Guide to RAG Architecture',
      date: '2024-01-05',
      summary: 'Deep dive into Retrieval-Augmented Generation systems and how to build them effectively. From vector databases to prompt engineering.',
      tags: ['AI', 'RAG', 'Architecture', 'Vector Databases'],
      coverImage: '',
      readTime: '10 min',
      content: `# Complete Guide to RAG Architecture

      Retrieval-Augmented Generation (RAG) has become the go-to pattern for building AI applications that need access to external knowledge.

      ## Core Components

      A typical RAG system consists of:
      1. **Document Ingestion**: Processing and chunking source documents
      2. **Vector Database**: Storing embeddings for semantic search
      3. **Retrieval System**: Finding relevant context for queries
      4. **Generation**: Using LLMs to synthesize responses

      ## Best Practices

      - **Chunk Size Optimization**: Balance context and specificity
      - **Embedding Quality**: Choose the right embedding model
      - **Retrieval Strategies**: Implement hybrid search (semantic + keyword)
      - **Context Management**: Handle long contexts efficiently

      ## Common Pitfalls

      - Over-chunking documents (losing context)
      - Under-chunking documents (irrelevant results)
      - Ignoring metadata (missing important filtering)
      - Poor prompt engineering (inconsistent outputs)

      RAG systems work best when you carefully balance retrieval accuracy with generation quality.`
    },
    {
      slug: 'scaling-product-teams',
      title: 'Scaling Product Teams: Lessons from 0 to 100',
      date: '2023-12-20',
      summary: 'Insights from scaling product organizations, building processes that work, and maintaining quality as teams grow rapidly.',
      tags: ['Product Management', 'Leadership', 'Scaling', 'Team Building'],
      coverImage: '',
      readTime: '7 min',
      content: `# Scaling Product Teams: Lessons from 0 to 100

      Scaling product teams is one of the hardest challenges in growing organizations. Here are key lessons learned.

      ## Phase 1: Foundation (0-10 people)
      - Establish core processes
      - Define product principles
      - Build strong documentation habits

      ## Phase 2: Structure (10-30 people)
      - Implement squad/tribe models
      - Create clear communication channels
      - Develop career progression frameworks

      ## Phase 3: Systems (30+ people)
      - Standardize tools and processes
      - Build self-service capabilities
      - Focus on leadership development

      The key is to build systems that scale, not just hire more people.`
    }
  ];

  return NextResponse.json(posts);
}