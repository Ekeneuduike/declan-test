'use client';

import { Card } from '@/components/ui/card';
import { Empty } from '@/components/ui/empty';

export default function ApplicationsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
        <p className="text-muted-foreground mt-1">Track your job applications and their status</p>
      </div>

      <Card>
        <Empty
          icon="📋"
          title="No applications yet"
          description="Start applying to jobs to see them appear here"
        />
      </Card>
    </div>
  );
}
