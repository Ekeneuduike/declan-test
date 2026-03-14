'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockChallenges } from '@/lib/mock-data';
import { Code, Timer, Copy, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';

export default function ChallengePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const challenge = mockChallenges.find(c => c.id === params.id);
  const [code, setCode] = useState(challenge?.boilerplate || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!challenge) {
    return (
      <div className="p-6 lg:p-8">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Challenge not found</p>
          <Button asChild className="mt-4">
            <Link href="/seeker/screening">Back to Challenges</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate code evaluation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowResult(true);
    setIsSubmitting(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/seeker/screening">← Back to Challenges</Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Problem Statement - Left Side */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h1 className="text-2xl font-bold text-foreground mb-4">{challenge.title}</h1>
            
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Description</p>
                <p className="text-sm text-foreground">{challenge.description}</p>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    challenge.difficulty === 'beginner' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                    challenge.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                    'bg-red-500/20 text-red-700 dark:text-red-400'
                  }`}>
                    {challenge.difficulty}
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">{challenge.language}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Timer className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{challenge.timeLimit} minutes</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Test Cases</p>
                <pre className="bg-secondary/50 p-3 rounded text-xs text-foreground overflow-auto max-h-40">
                  {challenge.testCases}
                </pre>
              </div>
            </div>
          </Card>
        </div>

        {/* Code Editor - Right Side */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="bg-secondary/50 border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground capitalize">{challenge.language}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(code);
                }}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>

            <div className="p-6 bg-[#1e1e1e] dark:bg-[#1e1e1e]">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 bg-[#1e1e1e] text-white font-mono text-sm p-4 rounded border border-secondary/30 focus:outline-none focus:border-primary resize-none"
                spellCheck="false"
              />
            </div>
          </Card>

          {/* Submission Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              asChild
            >
              <Link href="/seeker/screening">Cancel</Link>
            </Button>
            <Button
              onClick={() => setShowConfirm(true)}
              disabled={isSubmitting}
              size="lg"
              className="gap-2"
            >
              {isSubmitting ? 'Evaluating...' : 'Submit Code'}
            </Button>
          </div>

          {/* Confirmation Dialog */}
          {showConfirm && (
            <Card className="p-6 bg-accent/10 border-accent/30">
              <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-3 rounded-lg">
                  <Code className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Submit Your Solution?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You have {challenge.timeLimit} minutes to submit. Your code will be evaluated against the test cases.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowConfirm(false)}
                    >
                      Continue Coding
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      size="sm"
                      className="gap-2"
                    >
                      {isSubmitting ? 'Evaluating...' : 'Submit Now'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Result Dialog */}
          {showResult && (
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-primary/30">
              <div className="text-center">
                <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Great Job!</h3>
                <p className="text-muted-foreground mb-6">
                  Your solution passed 8 out of 8 test cases.
                </p>
                
                <div className="bg-background/50 rounded p-4 mb-6 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Score</p>
                      <p className="text-2xl font-bold text-primary">95/100</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Your Grade</p>
                      <p className="text-2xl font-bold text-accent">Advanced</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/seeker/screening">View Challenges</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/seeker/jobs">Find Jobs</Link>
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
