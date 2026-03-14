'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockJobs } from '@/lib/mock-data';
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Briefcase, DollarSign, Clock, Building, Users, CheckCircle, MessageSquare } from 'lucide-react';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = mockJobs.find(j => j.id === params.id);
  const { role } = useAuth();
  const [isApplied, setIsApplied] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Job not found</p>
            <Button asChild className="mt-4">
              <Link href="/seeker/jobs">Back to Jobs</Link>
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
        <div className="mx-auto max-w-4xl">
          <Button variant="outline" asChild className="mb-8">
            <Link href={role === 'seeker' ? '/seeker/jobs' : '/'}>← Back</Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Job Details - Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-primary/20 p-4 rounded-lg">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
                    <p className="text-lg text-muted-foreground">{job.companyName}</p>
                  </div>
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
                <h2 className="text-xl font-semibold text-foreground mb-4">About this opportunity</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
              </Card>

              {/* Requirements */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Requirements</h2>
                <div className="space-y-3">
                  {job.requiredSkills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{skill}</span>
                    </div>
                  ))}
                  {job.minimumGrade && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">
                        Minimum grade: <span className="font-semibold capitalize">{job.minimumGrade}</span>
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Details */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Job Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Duration</p>
                      <p className="font-medium text-foreground">{job.duration || 'Ongoing'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Applicants</p>
                      <p className="font-medium text-foreground">{job.applicants} people applied</p>
                    </div>
                  </div>
                  {job.deadline && (
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Application Deadline</p>
                        <p className="font-medium text-foreground">{new Date(job.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Employer Info */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">About the employer</h2>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{job.companyName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Hiring for: {job.requiredSkills.join(', ')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 space-y-4">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-foreground mb-1">${job.pay.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{job.currency}</p>
                </div>

                {role === 'seeker' && !isApplied && (
                  <Button
                    onClick={() => setIsApplied(true)}
                    className="w-full"
                    size="lg"
                  >
                    Apply Now
                  </Button>
                )}

                {role === 'seeker' && isApplied && (
                  <Button
                    disabled
                    className="w-full"
                    size="lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Application Sent
                  </Button>
                )}

                {role === 'employer' && (
                  <Button className="w-full" size="lg" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Applications
                  </Button>
                )}

                {role !== 'seeker' && !isApplied && (
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <Link href="/auth/signup">Create Account</Link>
                  </Button>
                )}

                {/* Job Stats */}
                <div className="border-t border-border pt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Posted on</span>
                    <span className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Applicants</span>
                    <span className="font-medium">{job.applicants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-700 dark:text-green-400">
                      {job.status}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
