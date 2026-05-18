'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
    >
      {theme === 'dark' ? (
        <FiSun className="h-5 w-5 text-amber-400 animate-spin-slow" />
      ) : (
        <FiMoon className="h-5 w-5 text-slate-800 dark:text-slate-200" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
