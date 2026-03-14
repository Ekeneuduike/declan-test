'use client';

import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Shield, TrendingUp, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm font-medium text-primary">Web3 Powered Hiring</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Screened Talent</span> on Web3
            </h1>

            <p className="mb-8 text-lg text-muted-foreground sm:text-xl leading-relaxed">
              Declan connects job seekers with verified skills to employers looking for quality talent. Every candidate is screened through our rigorous assessment system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup" className="gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">Verified Talent</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">5K+</p>
                <p className="text-sm text-muted-foreground">Jobs Posted</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Match Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Job Seekers Section */}
      <section className="py-20 sm:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">For Job Seekers</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Showcase your skills through our screening challenges and get matched with high-paying opportunities. Build your reputation and earn better positions.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Complete technical screening challenges',
                  'Get verified skill badges and grades',
                  'Find jobs matched to your expertise',
                  'Earn secure payments via escrow',
                  'Build your professional reputation'
                ].map((feature) => (
                  <li key={feature} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" asChild>
                <Link href="/auth/signup" className="w-full sm:w-auto">
                  Become a Seeker
                </Link>
              </Button>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-12 flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Grow your career with verified opportunities</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="py-20 sm:py-28 border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 p-12 flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">Hire pre-vetted, quality talent instantly</p>
              </div>
            </Card>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">For Employers</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Post jobs and get matched with verified talent. Every candidate has passed our screening challenges, ensuring you hire the best.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Access verified, screened candidates',
                  'View candidate skill levels and grades',
                  'Smart matching based on requirements',
                  'Secure escrow-based payments',
                  'Transparent hiring with dispute resolution'
                ].map((feature) => (
                  <li key={feature} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" asChild>
                <Link href="/auth/signup" className="w-full sm:w-auto">
                  Find Talent
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for successful hiring and career growth on Web3
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Screening',
                description: 'Candidates are verified through rigorous technical assessments and skill challenges',
              },
              {
                icon: Zap,
                title: 'Smart Matching',
                description: 'Our algorithm matches employers with the perfect candidates based on skills and requirements',
              },
              {
                icon: TrendingUp,
                title: 'Escrow Payments',
                description: 'Secure payments with milestone-based fund release and transparent dispute resolution',
              },
            ].map((feature) => (
              <Card key={feature.title} className="p-6 hover:border-primary/50 transition">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 border-t border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of talent and employers building the future of work on Web3.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup" className="gap-2">
                Create Account <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
