import { NextResponse } from 'next/server';

export async function GET() {
  const education = [
    {
      id: 'stanford-cs',
      institution: 'Stanford University',
      degree: 'Master of Science in Computer Science',
      field: 'Artificial Intelligence & Machine Learning',
      period: '2020 - 2022',
      description: 'Focused on AI/ML with coursework in deep learning, computer vision, and natural language processing',
      achievements: [
        'Graduated Summa Cum Laude (GPA: 3.9/4.0)',
        'Teaching Assistant for CS229 (Machine Learning)',
        'Research in Large Language Models',
        'Published 2 papers in AI conferences'
      ],
      coursework: [
        'CS229 - Machine Learning',
        'CS231N - Computer Vision',
        'CS224N - Natural Language Processing',
        'CS332 - Advanced Computer Networks'
      ]
    },
    {
      id: 'berkeley-eecs',
      institution: 'UC Berkeley',
      degree: 'Bachelor of Science',
      field: 'Electrical Engineering & Computer Science',
      period: '2016 - 2020',
      description: 'Strong foundation in computer science fundamentals and electrical engineering principles',
      achievements: [
        'Dean\'s List for 6 semesters',
        'President of Computer Science Society',
        'Winner of UC Berkeley Hackathon 2019',
        'Completed undergraduate thesis on distributed systems'
      ],
      coursework: [
        'CS61A - Structure and Interpretation of Computer Programs',
        'CS61B - Data Structures',
        'CS162 - Operating Systems',
        'CS186 - Database Systems'
      ]
    }
  ];

  return NextResponse.json(education);
}