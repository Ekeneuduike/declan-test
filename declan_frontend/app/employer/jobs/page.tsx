'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockJobs, mockApplications } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Briefcase, Users, DollarSign, Plus, Edit2 } from 'lucide-react';

export default function EmployerJobsPage() {
  const { user } = useAuth();
  
  const employerJobs = mockJobs.filter(j => j.employerId === user?.id);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Job Postings</h1>
          <p className="text-muted-foreground">Manage your active and closed job listings</p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link href="/employer/jobs/new">
            <Plus className="w-4 h-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {employerJobs.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No jobs posted yet</p>
            <Button asChild>
              <Link href="/employer/jobs/new">Post Your First Job</Link>
            </Button>
          </Card>
        ) : (
          employerJobs.map((job) => {
            const jobApplications = mockApplications.filter(app => app.jobId === job.id);
            
            return (
              <Card key={job.id} className="p-6 hover:shadow-lg transition">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.description.substring(0, 100)}...</p>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground font-medium">${job.pay.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{jobApplications.length} applications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                          job.status === 'active' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                          job.status === 'closed' ? 'bg-red-500/20 text-red-700 dark:text-red-400' :
                          'bg-blue-500/20 text-blue-700 dark:text-blue-400'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 lg:flex-col">
                    <Button asChild variant="outline" className="flex-1 lg:flex-none">
                      <Link href={`/employer/jobs/${job.id}`}>View Details</Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/employer/jobs/${job.id}/edit`}>
                        <Edit2 className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
