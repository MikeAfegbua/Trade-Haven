'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun, TrendingUp, User, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WalletButton } from '@/components/wallet';
import { useWalletStore } from '@/store/wallet';

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { isConnected } = useWalletStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ethos-teal">
                        <TrendingUp className="h-5 w-5 text-black" />
                    </div>
                    <span className="text-xl font-bold">TradeHaven</span>
                </Link>

                <nav className="flex items-center gap-6">
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
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary transition-colors hover:bg-muted"
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </button>
                    )}

                    {mounted && <WalletButton />}
                </nav>
            </div>
        </header>
    );
}
