'use client';

import { Card } from '@/components/ui/card';
import { Empty } from '@/components/ui/empty';
import { mockSeekers } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Award, Star } from 'lucide-react';

export default function MatchesPage() {
  const topMatches = Object.values(mockSeekers).slice(0, 3);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Recommended Talent</h1>
        <p className="text-muted-foreground mt-1">AI-matched candidates for your open positions</p>
      </div>

      {topMatches.length === 0 ? (
        <Card>
          <Empty
            icon="🎯"
            title="No matches yet"
            description="Post a job to start receiving AI-powered talent recommendations"
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {topMatches.map((seeker) => (
            <Card key={seeker.id} className="p-6 hover:shadow-lg transition">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {seeker.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{seeker.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{seeker.bio}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-accent" />
                        <span className="capitalize">{seeker.grade?.level || 'Unrated'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-accent" />
                        <span>{seeker.averageRating?.toFixed(1) || '0.0'} ({seeker.totalReviews} reviews)</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {seeker.skills?.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                      {seeker.skills && seeker.skills.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          +{seeker.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">Message</Button>
                  <Button>Invite</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
