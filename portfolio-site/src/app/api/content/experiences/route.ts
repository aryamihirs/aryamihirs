import { NextResponse } from 'next/server';

export async function GET() {
  const experiences = [
    {
      id: 'ai-search-tool',
      title: 'AI-Powered Search Platform',
      company: 'TechCorp',
      role: 'Senior Product Manager',
      duration: '2023 - Present',
      summary: 'Led the development of an enterprise AI search tool that increased search accuracy by 85%',
      problem: 'Enterprise employees spent 30% of their time searching for information across siloed systems',
      stakeholders: ['Engineering', 'Data Science', 'Sales', 'Customer Success'],
      solution: 'Built a unified AI-powered search platform using RAG architecture and semantic search',
      impact: {
        metrics: ['85% improvement in search accuracy', '30% reduction in time-to-find information', '$2M annual cost savings'],
        testimonials: ['This tool transformed how our team works - VP of Engineering']
      },
      contributions: [
        'Defined product vision and roadmap',
        'Led cross-functional team of 12',
        'Implemented user research program',
        'Drove technical architecture decisions'
      ],
      learnings: [
        'Importance of iterative development with user feedback',
        'Building trust in AI systems through transparency',
        'Balancing technical complexity with user simplicity'
      ],
      tags: ['AI', 'Search', 'Enterprise', 'Product Management'],
      featured: true,
      demoUrl: 'https://demo.example.com',
      prototypeUrl: 'https://figma.com/example'
    },
    {
      id: 'product-analytics-platform',
      title: 'Product Analytics Platform',
      company: 'DataCorp',
      role: 'Product Manager',
      duration: '2022 - 2023',
      summary: 'Built a comprehensive analytics platform that helped product teams make data-driven decisions',
      problem: 'Product teams lacked unified view of user behavior and product performance metrics',
      stakeholders: ['Engineering', 'Data Science', 'Product Teams', 'Leadership'],
      solution: 'Created an integrated analytics dashboard with real-time insights and predictive analytics',
      impact: {
        metrics: ['50% faster decision making', '40% increase in feature adoption', '25% improvement in user retention'],
        testimonials: ['Game-changer for our product development process - Head of Product']
      },
      contributions: [
        'Led product discovery and user research',
        'Designed comprehensive analytics framework',
        'Managed stakeholder alignment across 5 teams',
        'Drove adoption through training and support'
      ],
      learnings: [
        'Critical importance of data governance',
        'Value of self-service analytics for product teams',
        'Building products that scale with organizational growth'
      ],
      tags: ['Analytics', 'Data', 'Product Management', 'Dashboards'],
      featured: true,
      demoUrl: 'https://analytics-demo.example.com',
      prototypeUrl: 'https://figma.com/analytics-prototype'
    }
  ];

  return NextResponse.json(experiences);
}