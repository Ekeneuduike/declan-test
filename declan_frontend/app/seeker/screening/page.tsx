'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { mockChallenges } from '@/lib/mock-data';
import { Code, Timer, Trophy, ArrowRight } from 'lucide-react';

export default function ScreeningPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Screening Challenges</h1>
        <p className="text-muted-foreground">
          Complete challenges to showcase your skills and improve your grade
        </p>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="bg-primary/20 p-3 rounded-lg">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">How Grading Works</h3>
            <p className="text-sm text-muted-foreground">
              Complete challenges to earn grades. Employers can see your best grade, which demonstrates your skill level.
              Higher grades unlock better job opportunities.
            </p>
          </div>
        </div>
      </Card>

      {/* Challenges Grid */}
      <div className="grid gap-6">
        {mockChallenges.map((challenge) => (
          <Card key={challenge.id} className="p-6 hover:shadow-lg transition">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Challenge Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`px-2 py-1 rounded-full border text-xs font-medium capitalize ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Timer className="w-4 h-4" />
                    <span>{challenge.timeLimit} minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code className="w-4 h-4" />
                    <span className="capitalize">{challenge.language}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {challenge.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <Button asChild size="lg" className="w-full lg:w-auto gap-2">
                  <Link href={`/seeker/screening/${challenge.id}`}>
                    Start Challenge <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
