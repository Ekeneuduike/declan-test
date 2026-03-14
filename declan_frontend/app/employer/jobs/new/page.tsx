'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeft, Plus, X } from 'lucide-react';

export default function NewJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>(['']);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    minimumGrade: '',
    type: 'full-time' as 'full-time' | 'gig',
    pay: '',
    duration: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Redirect to jobs list
    router.push('/employer/jobs');
  };

  const isFormValid = 
    formData.title &&
    formData.description &&
    formData.pay &&
    skills.filter(s => s.trim()).length > 0;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <Button variant="outline" asChild className="mb-4">
        <Link href="/employer/jobs" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Post a New Job</h1>
        <p className="text-muted-foreground">Create a job posting to find the right talent</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Job Title */}
        <Card className="p-6">
          <label className="block text-sm font-semibold text-foreground mb-3">Job Title *</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Senior React Developer"
            required
          />
        </Card>

        {/* Description */}
        <Card className="p-6">
          <label className="block text-sm font-semibold text-foreground mb-3">Job Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the role, responsibilities, and what you're looking for..."
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary resize-none h-32"
            required
          />
        </Card>

        {/* Job Type and Pay */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <label className="block text-sm font-semibold text-foreground mb-3">Job Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
            >
              <option value="full-time">Full-time</option>
              <option value="gig">Contract/Gig</option>
            </select>
          </Card>

          <Card className="p-6">
            <label className="block text-sm font-semibold text-foreground mb-3">Pay (USD) *</label>
            <Input
              type="number"
              name="pay"
              value={formData.pay}
              onChange={handleInputChange}
              placeholder="e.g., 120000"
              required
            />
          </Card>
        </div>

        {/* Duration */}
        <Card className="p-6">
          <label className="block text-sm font-semibold text-foreground mb-3">Duration</label>
          <Input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 3 months, Ongoing"
          />
        </Card>

        {/* Minimum Grade */}
        <Card className="p-6">
          <label className="block text-sm font-semibold text-foreground mb-3">Minimum Grade Level</label>
          <select
            name="minimumGrade"
            value={formData.minimumGrade}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
          >
            <option value="">Any Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </Card>

        {/* Required Skills */}
        <Card className="p-6 space-y-4">
          <label className="block text-sm font-semibold text-foreground">Required Skills *</label>
          
          {skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder="e.g., React, TypeScript"
              />
              {skills.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(index)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addSkill}
            className="w-full gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" asChild>
            <Link href="/employer/jobs">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            size="lg"
          >
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </Button>
        </div>
      </form>
    </div>
  );
}
