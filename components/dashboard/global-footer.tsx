'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function GlobalFooter() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      
      const day = now.getDate().toString().padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      
      setCurrentDate(`${day} ${month} ${year} - ${hours}:${minutes}:${seconds}`);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full mt-auto border-t border-border/40 py-6 px-4 md:px-8 bg-background/50 backdrop-blur-sm z-10 transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground/80 font-medium">
          <Link href="#" className="text-secondary/90 hover:text-secondary transition-colors underline-offset-4 hover:underline">
            Corefinity
          </Link>
          <span>&middot;</span>
          <span>&copy; {new Date().getFullYear()} Corefinity</span>
          <span>&middot;</span>
          <span>v1.9.3</span>
        </div>
        
        <Link 
          href="/changelog" 
          className="text-xs text-secondary/90 hover:text-secondary transition-colors font-medium underline-offset-4 hover:underline"
        >
          What's New?
        </Link>
        
        <div className="text-[11px] font-mono text-muted-foreground/60 tracking-wider">
          {currentDate}
        </div>
      </div>
    </footer>
  );
}