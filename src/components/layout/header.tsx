'use client';

import { useTheme } from 'next-themes';
import {
  Moon,
  Sun,
  TrendingUp,
  User,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WalletButton } from '@/components/wallet';
import { useWalletStore } from '@/store/wallet';
import { cn } from '@/lib/utils';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected } = useWalletStore();

  useEffect(() => setMounted(true), []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Detect if dark mode
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-ethos-teal">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-semibold tracking-tight">
            TradeHaven
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Signals
          </Link>

          <Link
            href="/leaderboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Leaderboard
          </Link>

          {mounted && isConnected && (
            <Link
              href="/my-signals"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <User className="h-4 w-4" />
              My Signals
            </Link>
          )}

          <a
            href="https://app.ethos.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View Reputation
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {mounted && (
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary transition-colors hover:bg-muted"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          {mounted && <WalletButton />}
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary transition-colors hover:bg-muted"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary transition-colors hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden transition-opacity duration-300',
          mobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        {/* Backdrop */}
        <div
          onClick={closeMobileMenu}
          className={cn(
            'absolute inset-0 transition-colors',
            isDark ? 'bg-black/50' : 'bg-black/30'
          )}
        />

        {/* Drawer */}
        <aside
          className={cn(
            'absolute right-0 top-0 h-[50%] w-[55%] max-w-sm shadow-xl transition-transform duration-300 rounded-l-xl',
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
            isDark ? 'bg-background text-white' : 'bg-white text-slate-900'
          )}
        >
          {/* Drawer Header */}
          <div
            className={cn(
              'flex items-center justify-between px-4 py-4 border-b',
              isDark ? 'border-slate-700' : 'border-gray-200'
            )}
          >
            <span className="text-base font-semibold tracking-tight">Menu</span>
            <button
              onClick={closeMobileMenu}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
                isDark
                  ? 'border-slate-700 bg-slate-800'
                  : 'border-gray-200 bg-gray-100'
              )}
            >
              <X className={cn(isDark ? 'text-white' : 'text-slate-900')} />
            </button>
          </div>

          {/* Drawer Navigation */}
          <nav className="flex flex-col gap-2 p-5">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={cn(
                'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
              )}
            >
              Signals
            </Link>

            <Link
              href="/leaderboard"
              onClick={closeMobileMenu}
              className={cn(
                'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
              )}
            >
              Leaderboard
            </Link>

            {mounted && isConnected && (
              <Link
                href="/my-signals"
                onClick={closeMobileMenu}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                  isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
                )}
              >
                <User className={cn('h-4 w-4', isDark ? 'text-white' : 'text-slate-900')} />
                My Signals
              </Link>
            )}

            <a
              href="https://app.ethos.network/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
              )}
            >
              View Reputation
              <ExternalLink
                className={cn('h-4 w-4', isDark ? 'text-white' : 'text-slate-900')}
              />
            </a>

            <div className="mt-4 w-full">{mounted && <WalletButton />}</div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
