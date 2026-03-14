'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { SeekerProfile } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Award, Mail, MapPin, Link2, Edit2, Save, X } from 'lucide-react';

export default function SeekerProfilePage() {
  const { user } = useAuth();
  const seeker = user as SeekerProfile;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: seeker?.name || '',
    email: seeker?.email || '',
    bio: seeker?.bio || '',
    portfolio: seeker?.portfolio || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // In a real app, this would call an API to update the profile
    setIsEditing(false);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and settings</p>
        </div>
        <Button
          variant={isEditing ? 'outline' : 'default'}
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Profile Overview */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {seeker?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{seeker?.name}</h2>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" />
              {seeker?.email}
            </p>
            {seeker?.walletAddress && (
              <p className="text-xs text-muted-foreground font-mono mt-2">
                {seeker.walletAddress.substring(0, 6)}...{seeker.walletAddress.substring(-4)}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Grade</p>
            <p className="text-xl font-bold text-primary capitalize">{seeker?.grade?.level || 'Unrated'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Rating</p>
            <p className="text-xl font-bold text-accent">{seeker?.averageRating?.toFixed(1) || '0.0'} / 5</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Reviews</p>
            <p className="text-xl font-bold text-foreground">{seeker?.totalReviews || 0}</p>
          </div>
        </div>
      </Card>

      {/* Edit Form */}
      {isEditing && (
        <Card className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary resize-none h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Portfolio Link</label>
            <Input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleInputChange}
              placeholder="https://yourportfolio.com"
            />
          </div>

          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </Card>
      )}

      {/* Bio Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Bio</h2>
        <p className="text-muted-foreground leading-relaxed">
          {seeker?.bio || 'No bio yet. Add one to help employers understand your background and interests.'}
        </p>
      </Card>

      {/* Skills Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {seeker?.skills?.map((skill) => (
            <div
              key={skill}
              className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
            >
              {skill}
            </div>
          )) || <p className="text-muted-foreground">No skills added yet</p>}
        </div>
        <Button variant="outline" className="gap-2">
          <Edit2 className="w-4 h-4" />
          Manage Skills
        </Button>
      </Card>

      {/* Grade History */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          Grade History
        </h2>
        
        {seeker?.grade ? (
          <div className="space-y-4">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{seeker.grade.challengeTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    Completed {new Date(seeker.grade.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{seeker.grade.score}</p>
                  <p className="text-xs text-muted-foreground">/ 100</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium bg-accent/20 text-accent capitalize`}>
                  {seeker.grade.level}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">
            No grades yet. Complete a challenge to get your first grade.
          </p>
        )}
      </Card>

      {/* Wallet Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Web3 Wallet</h2>
        <div className="space-y-4">
          {seeker?.walletAddress ? (
            <div className="p-4 bg-secondary/30 rounded-lg font-mono text-sm text-foreground">
              {seeker.walletAddress}
            </div>
          ) : (
            <p className="text-muted-foreground">No wallet connected. Connect your wallet on login.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
