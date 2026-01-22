'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, TrendingUp, Plus } from 'lucide-react';
import { SignalCard, CreateSignalModal } from '@/components/signals';
import { useSignalsStore } from '@/store/signals';
import { useWalletStore } from '@/store/wallet';
import { Signal, CreateSignalInput } from '@/types';

export default function MySignalsPage() {
    const router = useRouter();
    const { signals, addSignal } = useSignalsStore();
    const { isConnected, address, username, ethosScore, traderScore, winRate, totalSignals, incrementTotalSignals } = useWalletStore();
    const [mounted, setMounted] = useState(false);
    const [mySignals, setMySignals] = useState<Signal[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !isConnected) {
            router.push('/');
        }
    }, [mounted, isConnected, router]);

    useEffect(() => {
        if (isConnected && address) {
            const filtered = signals.filter(
                (signal) => signal.author.address.toLowerCase() === address.toLowerCase()
            );
            setMySignals(filtered);
        }
    }, [signals, address, isConnected]);

    if (!mounted || !isConnected) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-ethos-teal border-t-transparent" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 rounded-xl border border-border bg-card p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ethos-teal/20 text-2xl font-bold text-ethos-teal">
                            {username?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">@{username}</h1>
                            <p className="font-mono text-sm text-muted-foreground">
                                {address?.slice(0, 6)}...{address?.slice(-4)}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-ethos-teal">{ethosScore?.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Ethos Score</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">{traderScore?.toFixed(1)}</p>
                            <p className="text-xs text-muted-foreground">Trader Score</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-500">{winRate}%</p>
                            <p className="text-xs text-muted-foreground">Win Rate</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">{totalSignals}</p>
                            <p className="text-xs text-muted-foreground">Total Signals</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Signals ({mySignals.length})</h2>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-ethos-teal px-4 py-2 font-medium text-black transition-colors hover:bg-ethos-teal/90"
                >
                    <Plus className="h-4 w-4" />
                    Post Signal
                </button>
            </div>

            {mySignals.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-card/50 py-16">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold">No signals yet</h3>
                        <p className="mt-1 text-muted-foreground">
                            Post your first trading signal to start building your reputation
                        </p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="mt-2 flex items-center gap-2 rounded-lg bg-ethos-teal px-6 py-3 font-medium text-black transition-colors hover:bg-ethos-teal/90"
                    >
                        <Plus className="h-5 w-5" />
                        Post Your First Signal
                    </button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mySignals.map((signal) => (
                        <SignalCard key={signal.id} signal={signal} />
                    ))}
                </div>
            )}

            <div className="mt-8 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                    <div>
                        <p className="font-medium text-yellow-500">Reputation Reminder</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Your signals affect your trader score. Accurate predictions increase your score and visibility,
                            while inaccurate ones will cause it to decay. Post responsibly.
                        </p>
                    </div>
                </div>
            </div>

            <CreateSignalModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                isConnected={isConnected}
                userEthosScore={ethosScore || 0}
                userAddress={address || ''}
                onSubmit={(input: CreateSignalInput) => {
                    const timeframeHours = { '1h': 1, '4h': 4, '1d': 24, '1w': 168 };
                    const newSignal: Signal = {
                        id: `signal-${Date.now()}`,
                        author: {
                            address: address || '',
                            username: username || 'anonymous',
                            ethosScore: ethosScore || 0,
                            traderScore: traderScore || 0,
                            winRate: winRate || 0,
                            totalSignals: (totalSignals || 0) + 1,
                        },
                        token: input.token,
                        direction: input.direction,
                        entry: input.entry,
                        target: input.target,
                        stopLoss: input.stopLoss,
                        reasoning: input.reasoning,
                        timestamp: Date.now(),
                        expiresAt: Date.now() + (timeframeHours[input.timeframe] * 60 * 60 * 1000),
                        status: 'active',
                        currentPrice: input.entry,
                        isVerified: (ethosScore || 0) >= 1400,
                        endorsements: [],
                        endorsementWeight: 0,
                        votes: { up: 0, down: 0 },
                    };
                    addSignal(newSignal);
                    incrementTotalSignals();
                    setIsCreateModalOpen(false);
                }}
            />
        </div>
    );
}
