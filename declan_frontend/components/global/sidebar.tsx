'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Briefcase, 
  Code,
  CreditCard,
  Star,
  User,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  variant?: 'seeker' | 'employer';
}

export function Sidebar({ variant = 'seeker' }: SidebarProps) {
  const pathname = usePathname();
  const { role } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (role !== variant) return null;

  const baseRoute = `/${variant}`;

  const seekerLinks = [
    { label: 'Dashboard', href: `${baseRoute}/dashboard`, icon: LayoutDashboard },
    { label: 'Challenges', href: `${baseRoute}/screening`, icon: Code },
    { label: 'Find Jobs', href: `${baseRoute}/jobs`, icon: Briefcase },
    { label: 'My Applications', href: `${baseRoute}/applications`, icon: Briefcase },
    { label: 'Payments', href: `${baseRoute}/payments`, icon: CreditCard },
    { label: 'Reviews', href: `${baseRoute}/reviews`, icon: Star },
    { label: 'Profile', href: `${baseRoute}/profile`, icon: User },
  ];

  const employerLinks = [
    { label: 'Dashboard', href: `${baseRoute}/dashboard`, icon: LayoutDashboard },
    { label: 'Post Job', href: `${baseRoute}/jobs/new`, icon: Briefcase },
    { label: 'My Jobs', href: `${baseRoute}/jobs`, icon: Briefcase },
    { label: 'Matches', href: `${baseRoute}/matches`, icon: Code },
    { label: 'Payments', href: `${baseRoute}/payments`, icon: CreditCard },
    { label: 'Profile', href: `${baseRoute}/profile`, icon: User },
  ];

  const links = variant === 'seeker' ? seekerLinks : employerLinks;

  return (
    <aside className={cn(
      "border-r border-border bg-card transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="sticky top-0">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!isCollapsed && (
            <span className="font-bold text-foreground">Menu</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium">{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
