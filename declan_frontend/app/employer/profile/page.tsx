'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { EmployerProfile } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Save, X, Star, TrendingUp } from 'lucide-react';

export default function EmployerProfilePage() {
  const { user } = useAuth();
  const employer = user as EmployerProfile;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: employer?.companyName || '',
    companyDescription: employer?.companyDescription || '',
    website: employer?.website || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Company Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your company information</p>
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

      {/* Company Overview */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {employer?.companyName?.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">{employer?.companyName}</h2>
            <p className="text-muted-foreground">{employer?.companyDescription}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Rating</p>
            <p className="text-xl font-bold text-primary flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary" />
              {employer?.averageRating?.toFixed(1) || '0.0'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Reviews</p>
            <p className="text-xl font-bold text-accent">{employer?.totalReviews || 0}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Member Since</p>
            <p className="text-xl font-bold text-foreground">
              {employer?.createdAt ? new Date(employer.createdAt).getFullYear() : '2024'}
            </p>
          </div>
        </div>
      </Card>

      {/* Edit Form */}
      {isEditing && (
        <Card className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
            <Input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Company Description</label>
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleInputChange}
              placeholder="Tell candidates about your company..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary resize-none h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Website</label>
            <Input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://yourcompany.com"
            />
          </div>

          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </Card>
      )}

      {/* Company Info */}
      {!isEditing && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Company Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="text-foreground">{employer?.companyDescription}</p>
            </div>
            {employer?.website && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Website</p>
                <a href={employer.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {employer.website}
                </a>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Account Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Email</p>
            <p className="text-foreground">{employer?.email}</p>
          </div>
          {employer?.walletAddress && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Web3 Wallet</p>
              <p className="text-foreground font-mono text-sm">
                {employer.walletAddress.substring(0, 6)}...{employer.walletAddress.substring(-4)}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
