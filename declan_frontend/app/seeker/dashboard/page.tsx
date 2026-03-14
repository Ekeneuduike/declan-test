'use client';

import { useAuth } from '@/lib/auth-context';
import { SeekerProfile } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Code, 
  Briefcase, 
  DollarSign, 
  Award,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function SeekerDashboard() {
  const { user } = useAuth();
  const seeker = user as SeekerProfile;

  const getBadgeColor = (level?: string) => {
    switch (level) {
      case 'advanced':
      case 'expert':
        return 'bg-accent/20 text-accent border-accent/30';
      case 'intermediate':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'beginner':
        return 'bg-muted text-muted-foreground border-muted/30';
      default:
        return 'bg-muted text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {seeker?.name?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Track your progress and find amazing opportunities
        </p>
      </div>

      {/* Grade Badge & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Grade Card */}
        <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your Grade</p>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getBadgeColor(seeker?.grade?.level)}`}>
                <Award className="w-4 h-4" />
                <span className="font-semibold text-sm capitalize">{seeker?.grade?.level || 'Unrated'}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">{seeker?.grade?.challengeTitle || 'Take a challenge to earn your grade'}</p>
        </Card>

        {/* Challenges Completed */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Challenges</p>
              <p className="text-2xl font-bold text-foreground">{seeker?.completedChallenges || 0}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Code className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        {/* Rating */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-foreground">{seeker?.averageRating?.toFixed(1) || '0.0'}</p>
                <span className="text-xs text-muted-foreground">/ 5.0</span>
              </div>
            </div>
            <div className="bg-accent/10 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">From {seeker?.totalReviews || 0} reviews</p>
        </Card>

        {/* Profile Views */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Skills</p>
              <p className="text-2xl font-bold text-foreground">{seeker?.skills?.length || 0}</p>
            </div>
            <div className="bg-secondary/10 p-3 rounded-lg">
              <Briefcase className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 border-dashed cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Take a Challenge</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Complete coding challenges to improve your grade and attract more opportunities
              </p>
              <Button asChild size="sm">
                <Link href="/seeker/screening" className="gap-2">
                  View Challenges <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-dashed cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition">
          <div className="flex items-start gap-4">
            <div className="bg-accent/10 p-4 rounded-lg">
              <Briefcase className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Browse Jobs</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Check out new opportunities that match your skills and experience
              </p>
              <Button asChild size="sm" variant="outline">
                <Link href="/seeker/jobs" className="gap-2">
                  Find Jobs <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* My Skills Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Your Skills</h2>
        <div className="flex flex-wrap gap-2">
          {seeker?.skills?.map((skill) => (
            <div
              key={skill}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
            >
              {skill}
            </div>
          )) || <p className="text-muted-foreground">Add skills in your profile</p>}
        </div>
      </Card>

      {/* Recent Applications */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/seeker/applications">View all</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          You have no active applications yet. Start by browsing jobs and applying to positions that match your skills.
        </p>
      </Card>
    </div>
  );
}
