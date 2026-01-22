'use client';

import { useState } from 'react';
import { X, AlertTriangle, Lock, TrendingUp, TrendingDown, Clock, Target, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MIN_ETHOS_SCORE_VERIFIED, CreateSignalInput } from '@/types';
import { EthosScoreBadge } from '@/components/ethos';

interface CreateSignalModalProps {
    isOpen: boolean;
    onClose: () => void;
    isConnected: boolean;
    userEthosScore: number;
    userAddress: string;
    onSubmit: (input: CreateSignalInput) => void;
}

const TIMEFRAMES = [
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '1d', label: '1 Day' },
    { value: '1w', label: '1 Week' },
] as const;

const POPULAR_TOKENS = ['BTC', 'ETH', 'SOL', 'LINK', 'ARB', 'OP', 'AVAX', 'MATIC'];

export function CreateSignalModal({ isOpen, onClose, isConnected, userEthosScore, userAddress, onSubmit }: CreateSignalModalProps) {
    const [direction, setDirection] = useState<'long' | 'short'>('long');
    const [token, setToken] = useState('');
    const [entry, setEntry] = useState('');
    const [target, setTarget] = useState('');
    const [stopLoss, setStopLoss] = useState('');
    const [reasoning, setReasoning] = useState('');
    const [timeframe, setTimeframe] = useState<'1h' | '4h' | '1d' | '1w'>('1d');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const canPost = isConnected;
    const isVerified = userEthosScore >= MIN_ETHOS_SCORE_VERIFIED;

    const potentialPnL = entry && target
        ? direction === 'long'
            ? ((parseFloat(target) - parseFloat(entry)) / parseFloat(entry)) * 100
            : ((parseFloat(entry) - parseFloat(target)) / parseFloat(entry)) * 100
        : 0;

    const risk = entry && stopLoss
        ? direction === 'long'
            ? ((parseFloat(entry) - parseFloat(stopLoss)) / parseFloat(entry)) * 100
            : ((parseFloat(stopLoss) - parseFloat(entry)) / parseFloat(entry)) * 100
        : 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canPost) return;

        setIsSubmitting(true);
        await onSubmit({
            token: token.toUpperCase(),
            direction,
            entry: parseFloat(entry),
            target: parseFloat(target),
            stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
            reasoning,
            timeframe,
        });
        setIsSubmitting(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Post Trading Signal</h2>
                    <button onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-secondary">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {!isConnected ? (
                    <div className="rounded-xl border border-ethos-teal/20 bg-ethos-teal/5 p-6 text-center">
                        <Lock className="mx-auto mb-4 h-12 w-12 text-ethos-teal" />
                        <h3 className="mb-2 text-lg font-semibold">Connect Wallet</h3>
                        <p className="mb-4 text-muted-foreground">
                            Connect your wallet to post trading signals.
                        </p>
                        <button
                            onClick={onClose}
                            className="inline-block rounded-lg bg-ethos-teal px-6 py-2 font-medium text-white transition-colors hover:bg-ethos-teal-dark"
                        >
                            Close & Connect Wallet
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {!isVerified && (
                            <div className="mb-4 flex items-start gap-3 rounded-lg border border-ethos-yellow/20 bg-ethos-yellow/5 p-3">
                                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-ethos-yellow" />
                                <div className="text-sm">
                                    <p className="font-medium text-ethos-yellow">Unverified Signal</p>
                                    <p className="text-muted-foreground">
                                        Your signal will have lower visibility. Build your Ethos score to {MIN_ETHOS_SCORE_VERIFIED}+ for verified status.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium">Direction</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setDirection('long')}
                                    className={cn(
                                        'flex items-center justify-center gap-2 rounded-lg border-2 py-3 font-medium transition-all',
                                        direction === 'long'
                                            ? 'border-ethos-green bg-ethos-green/10 text-ethos-green'
                                            : 'border-border hover:border-ethos-green/50'
                                    )}
                                >
                                    <TrendingUp className="h-5 w-5" />
                                    LONG
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDirection('short')}
                                    className={cn(
                                        'flex items-center justify-center gap-2 rounded-lg border-2 py-3 font-medium transition-all',
                                        direction === 'short'
                                            ? 'border-ethos-red bg-ethos-red/10 text-ethos-red'
                                            : 'border-border hover:border-ethos-red/50'
                                    )}
                                >
                                    <TrendingDown className="h-5 w-5" />
                                    SHORT
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium">Token</label>
                            <input
                                type="text"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="BTC, ETH, SOL..."
                                className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 outline-none transition-all focus:border-ethos-teal focus:ring-2 focus:ring-ethos-teal/20"
                                required
                            />
                            <div className="mt-2 flex flex-wrap gap-2">
                                {POPULAR_TOKENS.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setToken(t)}
                                        className={cn(
                                            'rounded-md px-2 py-1 text-xs font-medium transition-colors',
                                            token === t
                                                ? 'bg-ethos-teal text-white'
                                                : 'bg-secondary hover:bg-muted'
                                        )}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4 grid grid-cols-3 gap-3">
                            <div>
                                <label className="mb-2 flex items-center gap-1 text-sm font-medium">
                                    Entry
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={entry}
                                    onChange={(e) => setEntry(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 font-mono outline-none transition-all focus:border-ethos-teal focus:ring-2 focus:ring-ethos-teal/20"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 flex items-center gap-1 text-sm font-medium">
                                    <Target className="h-3 w-3 text-ethos-green" />
                                    Target
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={target}
                                    onChange={(e) => setTarget(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 font-mono outline-none transition-all focus:border-ethos-green focus:ring-2 focus:ring-ethos-green/20"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 flex items-center gap-1 text-sm font-medium">
                                    <ShieldAlert className="h-3 w-3 text-ethos-red" />
                                    Stop Loss
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={stopLoss}
                                    onChange={(e) => setStopLoss(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 font-mono outline-none transition-all focus:border-ethos-red focus:ring-2 focus:ring-ethos-red/20"
                                />
                            </div>
                        </div>

                        {entry && target && (
                            <div className="mb-4 flex gap-4 rounded-lg bg-secondary p-3">
                                <div>
                                    <span className="text-xs text-muted-foreground">Potential P&L</span>
                                    <p className={cn('font-mono font-semibold', potentialPnL >= 0 ? 'text-ethos-green' : 'text-ethos-red')}>
                                        {potentialPnL >= 0 ? '+' : ''}{potentialPnL.toFixed(2)}%
                                    </p>
                                </div>
                                {stopLoss && (
                                    <div>
                                        <span className="text-xs text-muted-foreground">Risk</span>
                                        <p className="font-mono font-semibold text-ethos-red">-{risk.toFixed(2)}%</p>
                                    </div>
                                )}
                                {stopLoss && risk > 0 && (
                                    <div>
                                        <span className="text-xs text-muted-foreground">R:R Ratio</span>
                                        <p className="font-mono font-semibold">{(potentialPnL / risk).toFixed(2)}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="mb-2 flex items-center gap-1 text-sm font-medium">
                                <Clock className="h-3 w-3" />
                                Timeframe
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {TIMEFRAMES.map((tf) => (
                                    <button
                                        key={tf.value}
                                        type="button"
                                        onClick={() => setTimeframe(tf.value)}
                                        className={cn(
                                            'rounded-lg border py-2 text-sm font-medium transition-all',
                                            timeframe === tf.value
                                                ? 'border-ethos-teal bg-ethos-teal/10 text-ethos-teal'
                                                : 'border-border hover:border-ethos-teal/50'
                                        )}
                                    >
                                        {tf.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium">Reasoning</label>
                            <textarea
                                value={reasoning}
                                onChange={(e) => setReasoning(e.target.value)}
                                placeholder="Explain your thesis... (technical analysis, fundamentals, catalysts)"
                                rows={3}
                                className="w-full resize-none rounded-lg border border-border bg-secondary px-4 py-2.5 outline-none transition-all focus:border-ethos-teal focus:ring-2 focus:ring-ethos-teal/20"
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 rounded-lg border border-border py-2.5 font-medium transition-colors hover:bg-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 rounded-lg bg-ethos-teal py-2.5 font-medium text-white transition-colors hover:bg-ethos-teal-dark disabled:opacity-50"
                            >
                                {isSubmitting ? 'Posting...' : 'Post Signal'}
                            </button>
                        </div>

                        <p className="mt-4 text-center text-xs text-muted-foreground">
                            ⚠️ Your signal outcome will affect your Trader Score
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
