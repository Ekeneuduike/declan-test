'use client';

import { useAuth } from '@/lib/auth-context';
import { EmployerProfile } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { mockJobs, mockApplications } from '@/lib/mock-data';
import {
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Plus,
  Eye,
  UserCheck
} from 'lucide-react';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const employer = user as EmployerProfile;

  // Get employer's jobs and applications
  const employerJobs = mockJobs.filter(j => j.employerId === employer?.id);
  const employerApplications = mockApplications.filter(app => 
    employerJobs.some(job => job.id === app.jobId)
  );

  const totalApplications = employerApplications.length;
  const shortlistedCount = employerApplications.filter(a => 
    a.status === 'shortlisted' || a.status === 'hired'
  ).length;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {employer?.companyName}!
        </h1>
        <p className="text-muted-foreground">
          Manage your job postings and find the perfect talent
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Active Jobs</p>
              <p className="text-2xl font-bold text-foreground">{employerJobs.length}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Applications</p>
              <p className="text-2xl font-bold text-foreground">{totalApplications}</p>
            </div>
            <div className="bg-accent/10 p-3 rounded-lg">
              <Users className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Shortlisted</p>
              <p className="text-2xl font-bold text-foreground">{shortlistedCount}</p>
            </div>
            <div className="bg-secondary/10 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Fund Balance</p>
              <p className="text-2xl font-bold text-foreground">${(employer?.fundBalance || 0).toLocaleString()}</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 border-dashed cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Post a New Job</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a job posting and start finding qualified candidates
              </p>
              <Button asChild size="sm">
                <Link href="/employer/jobs/new" className="gap-2">
                  Post Job <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-dashed cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition">
          <div className="flex items-start gap-4">
            <div className="bg-accent/10 p-4 rounded-lg">
              <Eye className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">View All Applications</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Review and manage all applications from candidates
              </p>
              <Button asChild size="sm" variant="outline">
                <Link href="/employer/jobs" className="gap-2">
                  See Applications <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Jobs */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Your Recent Jobs</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/employer/jobs">View all</Link>
          </Button>
        </div>

        {employerJobs.length === 0 ? (
          <p className="text-muted-foreground">No jobs posted yet. Create your first job to get started.</p>
        ) : (
          <div className="space-y-4">
            {employerJobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="flex items-start justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {job.applicants} applicants • ${job.pay.toLocaleString()}
                  </p>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/employer/jobs/${job.id}`}>View</Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
