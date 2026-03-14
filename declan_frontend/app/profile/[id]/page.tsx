'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import { mockSeekers, getUserReviews } from '@/lib/mock-data';
import { Award, Star, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function PublicProfilePage({ params }: { params: { id: string } }) {
  const seeker = mockSeekers[params.id];
  const reviews = seeker ? getUserReviews(seeker.id) : [];

  if (!seeker) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Profile not found</p>
            <Button asChild className="mt-4">
              <a href="/seeker/jobs">Back to Jobs</a>
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Profile Header */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 mb-8">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                {seeker.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">{seeker.name}</h1>
                <p className="text-muted-foreground mb-4">{seeker.bio}</p>

                <div className="flex flex-wrap gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Grade</p>
                      <p className="font-semibold capitalize">{seeker.grade?.level || 'Unrated'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="font-semibold">{seeker.averageRating?.toFixed(1) || '0.0'} / 5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="gap-2">
                <Mail className="w-4 h-4" />
                Hire Now
              </Button>
              <Button variant="outline" size="lg">
                Send Message
              </Button>
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {seeker.skills?.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Experience */}
          {seeker.grade && (
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Experience</h2>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{seeker.grade.challengeTitle}</h3>
                      <p className="text-sm text-muted-foreground">
                        Completed {new Date(seeker.grade.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{seeker.grade.score}</p>
                      <p className="text-xs text-muted-foreground">/ 100</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Reviews */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Reviews ({reviews.length})
            </h2>

            {reviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'fill-accent text-accent' : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold ml-2">{review.rating}.0 stars</span>
                    </div>
                    <p className="text-foreground text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
