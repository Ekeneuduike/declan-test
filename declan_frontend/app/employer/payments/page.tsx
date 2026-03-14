'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { EmployerProfile } from '@/lib/types';
import { DollarSign, Plus, CreditCard } from 'lucide-react';

export default function PaymentsPage() {
  const { user } = useAuth();
  const employer = user as EmployerProfile;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payments & Funding</h1>
        <p className="text-muted-foreground mt-1">Manage your account balance and deposits</p>
      </div>

      {/* Fund Balance */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Account Balance</p>
            <p className="text-4xl font-bold text-foreground">${(employer?.fundBalance || 0).toLocaleString()}</p>
          </div>
          <div className="bg-primary/20 p-4 rounded-lg">
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button size="lg" className="h-auto py-6 gap-3 justify-start">
          <Plus className="w-5 h-5 flex-shrink-0" />
          <div className="text-left">
            <div className="font-semibold">Add Funds</div>
            <div className="text-xs opacity-90">Deposit funds via wallet or card</div>
          </div>
        </Button>

        <Button variant="outline" size="lg" className="h-auto py-6 gap-3 justify-start">
          <CreditCard className="w-5 h-5 flex-shrink-0" />
          <div className="text-left">
            <div className="font-semibold">Withdrawal</div>
            <div className="text-xs">Request payment of available balance</div>
          </div>
        </Button>
      </div>

      {/* Transaction History */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Transaction History</h2>
        <p className="text-muted-foreground">No transactions yet. Deposits and payments will appear here.</p>
      </Card>
    </div>
  );
}
