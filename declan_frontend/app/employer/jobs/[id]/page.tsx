'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockJobs, mockApplications } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowLeft, Users, DollarSign, Briefcase, Edit2, Award, Star } from 'lucide-react';

export default function EmployerJobDetailPage({ params }: { params: { id: string } }) {
  const job = mockJobs.find(j => j.id === params.id);
  const jobApplications = mockApplications.filter(app => app.jobId === params.id);

  if (!job) {
    return (
      <div className="p-6 lg:p-8">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Job not found</p>
          <Button asChild className="mt-4">
            <Link href="/employer/jobs">Back to Jobs</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const shortlistedCount = jobApplications.filter(a => 
    a.status === 'shortlisted' || a.status === 'hired'
  ).length;
  const rejectedCount = jobApplications.filter(a => a.status === 'rejected').length;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <Button variant="outline" asChild>
        <Link href="/employer/jobs" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Job Details - Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
                <p className="text-muted-foreground">{job.companyName}</p>
              </div>
              <Button asChild variant="outline" size="icon">
                <Link href={`/employer/jobs/${job.id}/edit`}>
                  <Edit2 className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Pay</p>
                <p className="text-2xl font-bold text-foreground">${job.pay.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Type</p>
                <p className="text-lg font-semibold text-primary capitalize">{job.type === 'gig' ? 'Contract' : 'Full-time'}</p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Job Description</h2>
            <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
          </Card>

          {/* Requirements */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Requirements</h2>
            <div className="space-y-2">
              {job.requiredSkills.map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Applications */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Applications ({jobApplications.length})</h2>
            
            {jobApplications.length === 0 ? (
              <p className="text-muted-foreground">No applications yet</p>
            ) : (
              <div className="space-y-4">
                {jobApplications.map((app) => (
                  <div key={app.id} className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{app.seekerName}</h3>
                        <p className="text-xs text-muted-foreground">
                          Applied {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                        app.status === 'hired' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                        app.status === 'shortlisted' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                        app.status === 'rejected' ? 'bg-red-500/20 text-red-700 dark:text-red-400' :
                        'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    {app.grade && (
                      <div className="flex items-center gap-4 mb-3 p-3 bg-background/50 rounded">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium text-foreground capitalize">{app.grade.level}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Score: {app.grade.score}/100</div>
                      </div>
                    )}

                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24 space-y-6">
            {/* Stats */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total Applications</span>
                  </div>
                  <span className="font-semibold">{jobApplications.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Shortlisted</span>
                  </div>
                  <span className="font-semibold text-accent">{shortlistedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Rejected</span>
                  </div>
                  <span className="font-semibold">{rejectedCount}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border" />

            {/* Job Info */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Job Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Posted</p>
                  <p className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">{job.duration || 'Ongoing'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Status</p>
                  <p className={`font-medium capitalize ${
                    job.status === 'active' ? 'text-green-600 dark:text-green-400' : ''
                  }`}>
                    {job.status}
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              Close Job
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
