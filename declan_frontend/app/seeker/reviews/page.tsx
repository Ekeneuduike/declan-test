'use client';

import { Card } from '@/components/ui/card';
import { Empty } from '@/components/ui/empty';
import { mockReviews, getUserReviews } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  const { user } = useAuth();
  const userReviews = user ? getUserReviews(user.id) : [];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reviews & Ratings</h1>
        <p className="text-muted-foreground mt-1">See what employers think about your work</p>
      </div>

      {userReviews.length === 0 ? (
        <Card>
          <Empty
            icon="⭐"
            title="No reviews yet"
            description="Complete your first job to receive reviews from employers"
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {userReviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
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
                    <span className="text-sm font-semibold text-foreground">{review.rating}.0</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    From an employer • {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-foreground">{review.comment}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
