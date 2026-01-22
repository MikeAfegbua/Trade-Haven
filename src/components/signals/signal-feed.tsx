'use client';

import { useEffect, useMemo, useState } from 'react';
import { SignalCard } from './signal-card';
import { SignalFilters } from './signal-filters';
import { CreateSignalModal } from './create-signal-modal';
import { useSignalsStore } from '@/store/signals';
import { getSignals } from '@/lib/signals';
import { Loader2, Plus, TrendingUp, Shield, Zap } from 'lucide-react';
import { CreateSignalInput } from '@/types';

const MOCK_USER = {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    ethosScore: 1520,
};

export function SignalFeed() {
    const { signals, filter, sort, isLoading, setSignals, setLoading } = useSignalsStore();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        async function loadSignals() {
            setLoading(true);
            const data = await getSignals();
            setSignals(data);
            setLoading(false);
        }
        loadSignals();
    }, [setSignals, setLoading]);

    const filteredAndSortedSignals = useMemo(() => {
        let result = [...signals];

        if (filter === 'long' || filter === 'short') {
            result = result.filter((s) => s.direction === filter);
        } else if (filter === 'verified') {
            result = result.filter((s) => s.isVerified);
        }

        switch (sort) {
            case 'weighted':
                break;
            case 'reputation':
                result.sort((a, b) => b.author.ethosScore - a.author.ethosScore);
                break;
            case 'newest':
                result.sort((a, b) => b.timestamp - a.timestamp);
                break;
            case 'performance':
                result.sort((a, b) => b.author.traderScore - a.author.traderScore);
                break;
        }

        return result;
    }, [signals, filter, sort]);

    const handleCreateSignal = async (input: CreateSignalInput) => {
        console.log('Creating signal:', input);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-ethos-teal" />
            </div>
        );
    }

    const verifiedCount = signals.filter(s => s.isVerified).length;
    const activeCount = signals.filter(s => s.status === 'active').length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Trading Signals</h2>
                    <p className="text-sm text-muted-foreground">
                        Ranked by reputation × performance × endorsements
                    </p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-ethos-teal px-4 py-2 font-medium text-white transition-colors hover:bg-ethos-teal-dark"
                >
                    <Plus className="h-4 w-4" />
                    Post Signal
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-ethos-teal" />
                        <span className="text-2xl font-bold">{activeCount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Active Signals</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-ethos-green" />
                        <span className="text-2xl font-bold">{verifiedCount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Verified Traders</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-ethos-yellow" />
                        <span className="text-2xl font-bold">
                            {signals.filter(s => s.status === 'hit').length}
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Signals Hit</p>
                </div>
            </div>

            <SignalFilters />

            <div className="grid gap-4 md:grid-cols-2">
                {filteredAndSortedSignals.map((signal) => (
                    <SignalCard
                        key={signal.id}
                        signal={signal}
                        userEthosScore={MOCK_USER.ethosScore}
                        onEndorse={() => console.log('Endorse', signal.id)}
                    />
                ))}
            </div>

            {filteredAndSortedSignals.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-lg text-muted-foreground">No signals found</p>
                </div>
            )}

            <CreateSignalModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                userEthosScore={MOCK_USER.ethosScore}
                userAddress={MOCK_USER.address}
                onSubmit={handleCreateSignal}
            />
        </div>
    );
}
