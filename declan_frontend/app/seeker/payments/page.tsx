'use client';

import { Card } from '@/components/ui/card';
import { Empty } from '@/components/ui/empty';
import { mockEscrows } from '@/lib/mock-data';

export default function PaymentsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payments & Escrow</h1>
        <p className="text-muted-foreground mt-1">Manage your payments and track escrow releases</p>
      </div>

      {mockEscrows.length === 0 ? (
        <Card>
          <Empty
            icon="💰"
            title="No active payments"
            description="Your payments will appear here once you complete a job"
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {mockEscrows.map((escrow) => (
            <Card key={escrow.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Job #{escrow.jobId}</h3>
                  <p className="text-sm text-muted-foreground">Escrow ID: {escrow.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${escrow.amount.toLocaleString()}</p>
                  <p className={`text-xs font-medium capitalize ${
                    escrow.status === 'locked' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
                  }`}>
                    {escrow.status}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Payment Timeline:</p>
                <div className="space-y-2">
                  {escrow.timeline.map((event, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <div className={`w-3 h-3 rounded-full ${
                        event.status === 'completed' ? 'bg-green-500' : 'bg-muted'
                      }`} />
                      <span className="text-muted-foreground">{event.event}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
