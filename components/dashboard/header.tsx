'use client';

import { Search, Bell, Settings, LogOut, User, Moon, Sun, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-center sm:justify-between px-4 pl-14 md:px-6 sticky top-0 z-20 shadow-card">
      {/* Left section - Search */}
      <div className="max-w-[160px] w-full sm:flex-1 sm:max-w-xs md:max-w-md relative mr-2 sm:mr-0">
        <div className="relative flex items-center">
          <Search 
            size={16} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search..."
            className={cn(
              'w-full h-9 pl-9 pr-4 rounded-lg bg-background border border-border',
              'text-foreground placeholder:text-muted-foreground text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all'
            )}
          />
        </div>
      </div>

      {/* Right section - Notifications and User Menu */}
      <div className="flex items-center gap-1 sm:gap-4 sm:ml-auto">
        {/* Notifications */}
        <button className="relative flex items-center justify-center w-9 h-9 hover:bg-background rounded-lg transition-colors">
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* Theme Toggle */}
        {mounted ? (
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center w-9 h-9 hover:bg-background rounded-lg transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-foreground" />
            ) : (
              <Moon size={20} className="text-foreground" />
            )}
          </button>
        ) : (
          <div className="w-9 h-9" />
        )}

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1 sm:p-2 hover:bg-background rounded-lg transition-colors"
          >
            <img 
              src="/images/profile-jimmy.jpg" 
              alt="Jimmy Fallon"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-foreground">Jimmy Fallon</p>
              <p className="text-xs text-muted-foreground">Enterprise Plan</p>
            </div>
          </button>

          {/* Dropdown menu */}
          {isProfileOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <div className="p-4 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Jimmy Fallon</p>
                <p className="text-xs text-muted-foreground">jimmy@example.com</p>
              </div>
              <nav className="p-2 space-y-1">
                <Link 
                  href="/dashboard/account"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-background rounded-md transition-colors"
                >
                  <Settings size={16} />
                  Account Settings
                </Link>
                <Link 
                  href="/dashboard/account?tab=ssh-keys"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-background rounded-md transition-colors"
                >
                  <Lock size={16} />
                  SSH Keys
                </Link>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                  <LogOut size={16} />
                  Logout
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
