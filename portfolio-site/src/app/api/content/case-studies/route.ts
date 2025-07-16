import { NextResponse } from 'next/server';
import { CaseStudy } from '@/types/content';

export async function GET() {
  const caseStudies: CaseStudy[] = [
    {
      id: 'shopify-ai-assistant',
      title: 'AI-Powered Product Discovery Assistant',
      summary: 'Led development of an AI assistant that increased product discovery by 40% and reduced customer support tickets by 25%',
      category: 'work',
      type: 'experience',
      company: 'Shopify',
      companySlug: 'shopify',
      role: 'Senior Product Manager',
      duration: '2023 - Present',
      period: '8 months',
      problem: 'Customers struggled to find relevant products in large catalogs, leading to high bounce rates and low conversion',
      solution: 'Built an AI assistant using natural language processing to understand customer intent and recommend personalized products',
      approach: 'Implemented RAG architecture with product embeddings, user behavior analysis, and real-time personalization',
      challenges: 'Balancing AI accuracy with performance, ensuring data privacy, and training the model on diverse product catalogs',
      outcomes: 'Deployed across 50,000+ stores with 40% increase in product discovery and 25% reduction in support tickets',
      impact: {
        metrics: [
          '40% increase in product discovery rate',
          '25% reduction in customer support tickets',
          '15% improvement in conversion rates',
          '50,000+ stores using the feature'
        ],
        testimonials: [
          'This AI assistant transformed how our customers shop - they find what they need faster than ever',
          'The personalization is incredible, it feels like having a personal shopping assistant'
        ],
        achievements: [
          'Launched to 50,000+ Shopify stores',
          'Featured in Shopify\'s annual product keynote',
          'Won internal innovation award'
        ]
      },
      techStack: ['Python', 'TensorFlow', 'OpenAI', 'Pinecone', 'React', 'GraphQL'],
      tools: ['Figma', 'Mixpanel', 'Amplitude', 'Kubernetes', 'AWS'],
      methodologies: ['Design Thinking', 'Agile', 'User Research', 'A/B Testing'],
      stakeholders: ['Engineering', 'Design', 'Data Science', 'Customer Success'],
      teamSize: '12 people',
      tags: ['AI', 'Product Management', 'E-commerce', 'Personalization', 'Machine Learning'],
      skills: ['Product Strategy', 'AI/ML', 'User Research', 'Data Analysis', 'Leadership'],
      status: 'active',
      featured: true,
      priority: 1,
      projectType: 'product',
      learnings: [
        'AI product success depends heavily on data quality and user feedback loops',
        'Cross-functional collaboration is crucial for AI product development',
        'User trust is paramount when implementing AI recommendations'
      ],
      contributions: [
        'Defined product vision and strategy for AI assistant',
        'Led cross-functional team of 12 people',
        'Designed user research methodology for AI product validation',
        'Established metrics framework for AI product performance'
      ],
      screenshots: [],
      startDate: '2023-03-01',
      endDate: '2023-11-01',
      demoUrl: 'https://demo.shopify.com/ai-assistant',
      caseStudyUrl: 'https://shopify.com/case-studies/ai-assistant'
    },
    {
      id: 'fintech-fraud-detection',
      title: 'Real-time Fraud Detection System',
      summary: 'Built ML-powered fraud detection system that reduced false positives by 60% while maintaining 99.9% accuracy',
      category: 'work',
      type: 'experience',
      company: 'Stripe',
      companySlug: 'stripe',
      role: 'Product Manager, Risk',
      duration: '2022 - 2023',
      period: '14 months',
      problem: 'High false positive rates in fraud detection caused legitimate transactions to be blocked, frustrating customers',
      solution: 'Developed advanced ML models using ensemble learning and real-time feature engineering',
      approach: 'Implemented gradient boosting with real-time data streams, A/B testing framework, and continuous model retraining',
      challenges: 'Balancing fraud detection accuracy with false positive rates, real-time processing at scale, regulatory compliance',
      outcomes: 'Reduced false positives by 60% while maintaining 99.9% fraud detection accuracy across $50B+ in transactions',
      impact: {
        metrics: [
          '60% reduction in false positives',
          '99.9% fraud detection accuracy maintained',
          '$50B+ in transactions processed',
          '2.5x improvement in customer satisfaction'
        ],
        testimonials: [
          'This system has dramatically improved our customer experience while keeping fraud losses minimal',
          'The real-time processing capabilities are game-changing for our business'
        ],
        achievements: [
          'Processed $50B+ in transactions',
          'Deployed across 42 countries',
          'Integrated with 1000+ merchant systems'
        ]
      },
      techStack: ['Python', 'XGBoost', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Kubernetes'],
      tools: ['Jupyter', 'MLflow', 'Grafana', 'PagerDuty', 'Terraform'],
      methodologies: ['Machine Learning', 'Real-time Processing', 'A/B Testing', 'Risk Management'],
      stakeholders: ['Data Science', 'Engineering', 'Risk Operations', 'Compliance'],
      teamSize: '8 people',
      tags: ['Machine Learning', 'Fraud Detection', 'Fintech', 'Real-time Systems', 'Risk Management'],
      skills: ['ML Product Management', 'Risk Analysis', 'Data Science', 'Systems Architecture'],
      status: 'completed',
      featured: true,
      priority: 2,
      projectType: 'product',
      learnings: [
        'Real-time ML systems require careful architecture planning',
        'Regulatory compliance must be built into ML systems from day one',
        'Continuous model monitoring is essential for production ML'
      ],
      contributions: [
        'Designed ML system architecture and requirements',
        'Established fraud detection metrics and KPIs',
        'Led integration with existing risk management systems',
        'Developed testing framework for ML model validation'
      ],
      screenshots: [],
      startDate: '2022-01-01',
      endDate: '2023-02-28'
    },
    {
      id: 'rag-agent-framework',
      title: 'Open Source RAG Agent Framework',
      summary: 'Built a flexible RAG agent framework that gained 10k+ GitHub stars and is used by 50+ companies',
      category: 'project',
      type: 'project',
      duration: '2023 - Present',
      problem: 'Developers needed a simple way to build RAG applications without dealing with complex infrastructure',
      solution: 'Created an open-source framework with modular architecture supporting multiple LLMs and vector databases',
      approach: 'Built with Python, LangChain, and FastAPI with Docker containerization and comprehensive documentation',
      outcomes: 'Framework adopted by 50+ companies with 10k+ GitHub stars and active contributor community',
      impact: {
        metrics: [
          '10,000+ GitHub stars',
          '50+ companies using in production',
          '200+ contributors',
          '1M+ downloads on PyPI'
        ],
        testimonials: [
          'This framework saved us months of development time',
          'The modular architecture makes it easy to customize for our specific use case'
        ],
        achievements: [
          'Featured in AI newsletters and conferences',
          'Adopted by Fortune 500 companies',
          'Active open source community'
        ]
      },
      techStack: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'FAISS', 'FastAPI', 'Docker'],
      tools: ['GitHub', 'PyPI', 'Docker Hub', 'Sphinx', 'pytest'],
      methodologies: ['Open Source Development', 'API Design', 'Documentation', 'Community Building'],
      tags: ['AI', 'RAG', 'Open Source', 'Python', 'LangChain', 'Vector Databases'],
      skills: ['Software Architecture', 'API Design', 'Open Source', 'Community Management'],
      status: 'active',
      featured: true,
      priority: 3,
      projectType: 'engineering',
      learnings: [
        'Good documentation is crucial for open source adoption',
        'Community feedback drives better product decisions',
        'Modular architecture enables diverse use cases'
      ],
      contributions: [
        'Designed overall system architecture',
        'Implemented core RAG pipeline components',
        'Created comprehensive documentation and examples',
        'Built and maintained open source community'
      ],
      screenshots: [],
      githubUrl: 'https://github.com/aryamihirs/rag-agent-framework',
      startDate: '2023-06-01',
      liveUrl: 'https://rag-framework.dev'
    },
    {
      id: 'ai-product-analytics',
      title: 'AI-Powered Product Analytics Platform',
      summary: 'Developed analytics platform that automatically identifies product insights using machine learning',
      category: 'project',
      type: 'project',
      duration: '2023',
      problem: 'Product teams spend too much time manually analyzing data instead of acting on insights',
      solution: 'Built ML-powered analytics platform that automatically detects anomalies and suggests optimizations',
      approach: 'Used time series analysis, anomaly detection, and causal inference to surface actionable insights',
      outcomes: 'Platform saves product teams 10+ hours per week on analysis and increases insight discovery by 3x',
      impact: {
        metrics: [
          '10+ hours saved per week per team',
          '3x increase in insight discovery',
          '50+ product teams using the platform',
          '90% reduction in time to insight'
        ],
        testimonials: [
          'This platform transformed how we approach product analytics',
          'The automated insights are incredibly accurate and actionable'
        ],
        achievements: [
          'Deployed across multiple product teams',
          'Integrated with existing analytics stack',
          'Positive ROI within 3 months'
        ]
      },
      techStack: ['Python', 'Scikit-learn', 'Plotly', 'Streamlit', 'PostgreSQL', 'Docker'],
      tools: ['Jupyter', 'Git', 'AWS', 'Terraform', 'Grafana'],
      methodologies: ['Machine Learning', 'Time Series Analysis', 'Statistical Modeling', 'Product Analytics'],
      tags: ['AI', 'Analytics', 'Product Management', 'Data Science', 'Automation'],
      skills: ['Data Science', 'Product Analytics', 'Machine Learning', 'Visualization'],
      status: 'completed',
      featured: true,
      priority: 4,
      projectType: 'product',
      learnings: [
        'Automated insights must be explainable to build user trust',
        'Integration with existing workflows is crucial for adoption',
        'Real-time processing enables more timely decision making'
      ],
      contributions: [
        'Designed ML algorithms for insight detection',
        'Built user interface for insight consumption',
        'Developed integration APIs for existing tools',
        'Created documentation and training materials'
      ],
      screenshots: [],
      startDate: '2023-01-01',
      endDate: '2023-08-31',
      demoUrl: 'https://demo.productanalytics.ai'
    }
  ];

  return NextResponse.json(caseStudies);
}