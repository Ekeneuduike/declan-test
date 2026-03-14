// User Types
export type UserRole = 'seeker' | 'employer' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletAddress?: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

// Seeker Profile
export interface SeekerProfile extends User {
  skills: string[];
  grade?: Grade;
  portfolio?: string;
  bio: string;
  completedChallenges: number;
  averageRating: number;
  totalReviews: number;
}

// Employer Profile
export interface EmployerProfile extends User {
  companyName: string;
  companyDescription: string;
  website?: string;
  averageRating: number;
  totalReviews: number;
  fundBalance: number;
}

// Screening Challenge
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  timeLimit: number; // minutes
  boilerplate: string;
  testCases: string;
  skills: string[];
}

// Grade/Assessment Result
export interface Grade {
  challengeId: string;
  challengeTitle: string;
  score: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  completedAt: Date;
  codeSubmitted: string;
}

// Job Posting
export interface Job {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  minimumGrade?: 'beginner' | 'intermediate' | 'advanced';
  type: 'gig' | 'full-time';
  pay: number;
  currency: string;
  duration?: string; // e.g., "2 weeks", "3 months"
  employerId: string;
  employerName: string;
  companyName: string;
  applicants: number;
  status: 'active' | 'closed' | 'filled';
  createdAt: Date;
  deadline?: Date;
}

// Application
export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  seekerName: string;
  status: 'applied' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: Date;
  grade?: Grade;
  coverLetter?: string;
}

// Escrow/Payment
export interface Escrow {
  id: string;
  jobId: string;
  seekerId: string;
  employerId: string;
  amount: number;
  status: 'pending' | 'locked' | 'released' | 'refunded' | 'disputed';
  timeline: EscrowTimeline[];
  createdAt: Date;
  completionDate?: Date;
}

export interface EscrowTimeline {
  date: Date;
  event: string;
  status: 'completed' | 'pending';
}

// Review/Rating
export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  rating: number; // 1-5
  comment: string;
  jobId?: string;
  createdAt: Date;
}

// Dispute
export interface Dispute {
  id: string;
  escrowId: string;
  claimantId: string;
  claimantRole: 'seeker' | 'employer';
  description: string;
  evidence?: string[];
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  resolution?: string;
  createdAt: Date;
}
