'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [role, setRole] = useState<UserRole>('seeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('details');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock user IDs based on role
      const userId = role === 'seeker' ? 'seeker-1' : 'employer-1';
      login(userId, role);

      // Redirect based on role
      const redirectUrl = role === 'seeker' ? '/seeker/dashboard' : '/employer/dashboard';
      router.push(redirectUrl);
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-8">
          {step === 'role' ? (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">Join Declan</h1>
                <p className="text-muted-foreground">Choose your role to get started</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleRoleSelect('seeker')}
                  className="w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
                >
                  <h3 className="font-semibold text-foreground mb-1">I'm a Job Seeker</h3>
                  <p className="text-sm text-muted-foreground">Find opportunities and showcase your skills</p>
                </button>

                <button
                  onClick={() => handleRoleSelect('employer')}
                  className="w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
                >
                  <h3 className="font-semibold text-foreground mb-1">I'm an Employer</h3>
                  <p className="text-sm text-muted-foreground">Post jobs and hire verified talent</p>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-1">Create Account</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  You're signing up as a {role === 'seeker' ? 'Job Seeker' : 'Employer'}
                </p>
                <button
                  type="button"
                  onClick={() => setStep('role')}
                  className="text-xs text-primary hover:underline"
                >
                  Change role
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !formData.name || !formData.email}
                className="w-full"
                size="lg"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </Card>
      </div>

      <Footer />
    </div>
  );
}
