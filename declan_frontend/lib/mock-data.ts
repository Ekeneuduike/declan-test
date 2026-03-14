import { SeekerProfile, EmployerProfile, Challenge, Job, Grade, Application, Escrow, Review, Dispute } from './types';

// Mock Seekers
export const mockSeekers: Record<string, SeekerProfile> = {
  'seeker-1': {
    id: 'seeker-1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    role: 'seeker',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f42472',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Full-stack developer with 3 years experience in React and Node.js',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    grade: {
      challengeId: 'challenge-1',
      challengeTitle: 'React Component Challenge',
      score: 95,
      level: 'advanced',
      completedAt: new Date('2024-01-15'),
      codeSubmitted: 'function Component() { return <div>Hello</div>; }',
    },
    completedChallenges: 5,
    averageRating: 4.8,
    totalReviews: 12,
    createdAt: new Date('2023-06-01'),
  },
  'seeker-2': {
    id: 'seeker-2',
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    role: 'seeker',
    walletAddress: '0x1234567890123456789012345678901234567890',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    bio: 'Backend developer specializing in microservices',
    skills: ['Python', 'Go', 'Docker', 'Kubernetes', 'GraphQL'],
    grade: {
      challengeId: 'challenge-2',
      challengeTitle: 'Backend API Challenge',
      score: 88,
      level: 'intermediate',
      completedAt: new Date('2024-01-20'),
      codeSubmitted: 'def api_handler(): pass',
    },
    completedChallenges: 3,
    averageRating: 4.5,
    totalReviews: 8,
    createdAt: new Date('2023-08-15'),
  },
};

// Mock Employers
export const mockEmployers: Record<string, EmployerProfile> = {
  'employer-1': {
    id: 'employer-1',
    name: 'Tech Corp Inc',
    email: 'hire@techcorp.com',
    role: 'employer',
    walletAddress: '0x98765432109876543210987654321098765432101',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
    bio: '',
    companyName: 'Tech Corp Inc',
    companyDescription: 'Leading technology company building innovative solutions',
    website: 'https://techcorp.com',
    averageRating: 4.7,
    totalReviews: 24,
    fundBalance: 50000,
    createdAt: new Date('2022-03-10'),
  },
  'employer-2': {
    id: 'employer-2',
    name: 'StartUp Labs',
    email: 'jobs@startuplabs.com',
    role: 'employer',
    walletAddress: '0x1111111111111111111111111111111111111111',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SL',
    bio: '',
    companyName: 'StartUp Labs',
    companyDescription: 'Innovative startup accelerator and development hub',
    website: 'https://startuplabs.com',
    averageRating: 4.3,
    totalReviews: 15,
    fundBalance: 25000,
    createdAt: new Date('2023-01-15'),
  },
};

// Mock Challenges
export const mockChallenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'React Component Challenge',
    description: 'Build a dynamic React component that manages state and handles user interactions',
    difficulty: 'intermediate',
    language: 'javascript',
    timeLimit: 45,
    boilerplate: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      {/* Add buttons here */}
    </div>
  );
}`,
    testCases: `expect(component.find('button')).toBeDefined();
expect(initial_count).toBe(0);`,
    skills: ['React', 'JavaScript', 'State Management'],
  },
  {
    id: 'challenge-2',
    title: 'Backend API Challenge',
    description: 'Create a REST API endpoint that handles user data with proper validation',
    difficulty: 'intermediate',
    language: 'python',
    timeLimit: 60,
    boilerplate: `from flask import Flask, request

app = Flask(__name__)

@app.route('/api/users', methods=['POST'])
def create_user():
    # Implement validation and creation logic
    pass`,
    testCases: `assert response.status_code == 201
assert 'user_id' in response.json()`,
    skills: ['Python', 'Flask', 'API Design'],
  },
  {
    id: 'challenge-3',
    title: 'Algorithm Problem: Fibonacci',
    description: 'Implement an optimized Fibonacci sequence generator',
    difficulty: 'beginner',
    language: 'python',
    timeLimit: 30,
    boilerplate: `def fibonacci(n):
    """Generate fibonacci sequence up to n terms"""
    pass

# Test your function
print(fibonacci(10))`,
    testCases: `assert fibonacci(5) == [0, 1, 1, 2, 3]
assert fibonacci(1) == [0]`,
    skills: ['Algorithms', 'Python', 'Problem Solving'],
  },
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior React Developer',
    description: 'We are looking for an experienced React developer to build our new dashboard platform. You will work with a talented team of engineers.',
    requiredSkills: ['React', 'TypeScript', 'Node.js'],
    minimumGrade: 'advanced',
    type: 'full-time',
    pay: 120000,
    currency: 'USD',
    duration: 'Ongoing',
    employerId: 'employer-1',
    employerName: 'Tech Corp Inc',
    companyName: 'Tech Corp Inc',
    applicants: 24,
    status: 'active',
    createdAt: new Date('2024-01-10'),
    deadline: new Date('2024-02-10'),
  },
  {
    id: 'job-2',
    title: 'Python Backend Contract',
    description: 'Build scalable microservices using Python and FastAPI for our API platform. 8-week contract position.',
    requiredSkills: ['Python', 'FastAPI', 'PostgreSQL'],
    minimumGrade: 'intermediate',
    type: 'gig',
    pay: 15000,
    currency: 'USD',
    duration: '8 weeks',
    employerId: 'employer-2',
    employerName: 'StartUp Labs',
    companyName: 'StartUp Labs',
    applicants: 18,
    status: 'active',
    createdAt: new Date('2024-01-12'),
    deadline: new Date('2024-01-26'),
  },
  {
    id: 'job-3',
    title: 'Frontend UI Developer',
    description: 'Help us redesign our customer portal with modern UI/UX practices. Focus on accessibility and performance.',
    requiredSkills: ['React', 'Tailwind CSS', 'Figma'],
    minimumGrade: 'intermediate',
    type: 'gig',
    pay: 8000,
    currency: 'USD',
    duration: '4 weeks',
    employerId: 'employer-1',
    employerName: 'Tech Corp Inc',
    companyName: 'Tech Corp Inc',
    applicants: 31,
    status: 'active',
    createdAt: new Date('2024-01-08'),
    deadline: new Date('2024-01-25'),
  },
];

// Mock Grades
export const mockGrades: Grade[] = [
  {
    challengeId: 'challenge-1',
    challengeTitle: 'React Component Challenge',
    score: 95,
    level: 'advanced',
    completedAt: new Date('2024-01-15'),
    codeSubmitted: 'const Component = () => <div>Advanced</div>;',
  },
  {
    challengeId: 'challenge-2',
    challengeTitle: 'Backend API Challenge',
    score: 87,
    level: 'intermediate',
    completedAt: new Date('2024-01-18'),
    codeSubmitted: 'def create_user(): return {"status": "created"}',
  },
  {
    challengeId: 'challenge-3',
    challengeTitle: 'Algorithm Problem: Fibonacci',
    score: 92,
    level: 'advanced',
    completedAt: new Date('2024-01-20'),
    codeSubmitted: 'def fibonacci(n): return [fibonacci(n-1) + fibonacci(n-2)]',
  },
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    seekerId: 'seeker-1',
    seekerName: 'Alex Chen',
    status: 'shortlisted',
    appliedAt: new Date('2024-01-12'),
    grade: mockGrades[0],
    coverLetter: 'I am very interested in this position as it aligns with my expertise.',
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    seekerId: 'seeker-2',
    seekerName: 'Jordan Smith',
    status: 'reviewed',
    appliedAt: new Date('2024-01-13'),
    grade: mockGrades[1],
  },
  {
    id: 'app-3',
    jobId: 'job-3',
    seekerId: 'seeker-1',
    seekerName: 'Alex Chen',
    status: 'applied',
    appliedAt: new Date('2024-01-14'),
  },
];

// Mock Escrow
export const mockEscrows: Escrow[] = [
  {
    id: 'escrow-1',
    jobId: 'job-2',
    seekerId: 'seeker-2',
    employerId: 'employer-2',
    amount: 15000,
    status: 'locked',
    timeline: [
      { date: new Date('2024-01-14'), event: 'Work Started', status: 'completed' },
      { date: new Date('2024-02-04'), event: 'Milestone 1 - 50% Payment', status: 'completed' },
      { date: new Date('2024-02-18'), event: 'Work Completion', status: 'pending' },
      { date: new Date('2024-02-25'), event: 'Final Payment Release', status: 'pending' },
    ],
    createdAt: new Date('2024-01-14'),
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'review-1',
    fromUserId: 'employer-1',
    toUserId: 'seeker-1',
    rating: 5,
    comment: 'Excellent work! Alex delivered high-quality code on time.',
    jobId: 'job-1',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'review-2',
    fromUserId: 'seeker-1',
    toUserId: 'employer-1',
    rating: 4,
    comment: 'Great company to work with. Clear communication and fair pay.',
    jobId: 'job-1',
    createdAt: new Date('2024-01-20'),
  },
];

// Mock Disputes
export const mockDisputes: Dispute[] = [
  {
    id: 'dispute-1',
    escrowId: 'escrow-1',
    claimantId: 'seeker-2',
    claimantRole: 'seeker',
    description: 'Employer requested additional work beyond scope',
    status: 'open',
    createdAt: new Date('2024-02-10'),
  },
];

// Helper functions
export function getUserById(id: string) {
  return mockSeekers[id] || mockEmployers[id] || null;
}

export function getJobById(id: string) {
  return mockJobs.find(job => job.id === id);
}

export function getSeekerApplications(seekerId: string) {
  return mockApplications.filter(app => app.seekerId === seekerId);
}

export function getJobApplications(jobId: string) {
  return mockApplications.filter(app => app.jobId === jobId);
}

export function getUserReviews(userId: string) {
  return mockReviews.filter(review => review.toUserId === userId);
}

export function getAverageRating(userId: string) {
  const reviews = getUserReviews(userId);
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}
