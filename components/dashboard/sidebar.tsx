'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Server, 
  Rocket, 
  Globe, 
  CreditCard, 
  Settings,
  User,
  UserCog,
  Ticket,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Environments', 
    href: '/dashboard/environments', 
    icon: Server 
  },
  { 
    name: 'Deployments', 
    href: '/dashboard/deployments', 
    icon: Rocket 
  },
  { 
    name: 'Account Settings', 
    href: '/dashboard/account', 
    icon: UserCog 
  },
  { 
    name: 'Support Tickets', 
    href: '/dashboard/support-tickets', 
    icon: Ticket 
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg bg-card/50 text-foreground"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 z-30',
          'md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo section */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <img 
            src="/images/logo.svg" 
            alt="Corefinity Logo" 
            className="h-8 w-auto"
          />
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-8 space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 text-sm font-medium relative',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-card after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent-orange after:rounded-full'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/15'
                )}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer section */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <div className="px-4 py-3 rounded-lg bg-accent-orange/10 border border-accent-orange/20">
            <p className="text-xs text-sidebar-foreground/70 font-medium">Usage</p>
            <p className="text-sm font-bold text-sidebar-foreground mt-1">45% of quota</p>
            <div className="w-full bg-sidebar-border rounded-full h-1.5 mt-2">
              <div 
                className="h-1.5 rounded-full bg-accent-orange"
                style={{ width: '45%' }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
