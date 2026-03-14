'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockJobs } from '@/lib/mock-data';
import { Briefcase, DollarSign, Clock, Users, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SeekerJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'gig' | 'full-time'>('all');

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'all' || job.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Find Jobs</h1>
        <p className="text-muted-foreground">
          Browse opportunities matched to your skills and experience
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search jobs, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'gig', 'full-time'] as const).map((type) => (
            <Button
              key={type}
              variant={filterType === type ? 'default' : 'outline'}
              onClick={() => setFilterType(type)}
              size="sm"
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              {type === 'all' ? 'All' : type === 'gig' ? 'Gigs' : 'Full-time'}
            </Button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No jobs found matching your criteria</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setFilterType('all');
            }}>
              Clear Filters
            </Button>
          </Card>
        ) : (
          filteredJobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.companyName}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

                  {/* Job Details */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">${job.pay.toLocaleString()} {job.currency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground capitalize">{job.type === 'gig' ? 'Contract' : 'Full-time'}</span>
                    </div>
                    {job.duration && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{job.duration}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{job.applicants} applicants</span>
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
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

                {/* Action Button */}
                <div className="flex-shrink-0 lg:pt-2">
                  <Button asChild size="lg" className="w-full lg:w-auto">
                    <Link href={`/jobs/${job.id}`}>View Job</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
