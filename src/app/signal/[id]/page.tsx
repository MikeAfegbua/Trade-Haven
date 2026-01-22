'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Signal, MIN_ETHOS_SCORE_TO_ENDORSE } from '@/types';
import { getSignalById } from '@/lib/signals';
import { EthosScoreBadge } from '@/components/ethos';
import { formatAddress, formatTimestamp } from '@/lib/utils';
import { cn } from '@/lib/utils';
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Target,
    ShieldAlert,
    Clock,
    CheckCircle,
    AlertTriangle,
    Flame,
    Award,
    ExternalLink,
    BarChart3,
    Users,
    Loader2,
} from 'lucide-react';

const MOCK_USER = {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    ethosScore: 1520,
};

export default function SignalDetailPage() {
    const params = useParams();
    const [signal, setSignal] = useState<Signal | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadSignal() {
            if (params.id) {
                const data = await getSignalById(params.id as string);
                setSignal(data);
                setIsLoading(false);
            }
        }
        loadSignal();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-ethos-teal" />
            </div>
        );
    }

    if (!signal) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-bold">Signal Not Found</h1>
                    <Link href="/" className="text-ethos-teal hover:underline">
                        ← Back to Signals
                    </Link>
                </div>
            </div>
        );
    }

    const isLong = signal.direction === 'long';
    const potentialPnl = isLong
        ? ((signal.target - signal.entry) / signal.entry) * 100
        : ((signal.entry - signal.target) / signal.entry) * 100;

    const currentPnl = signal.currentPrice
        ? isLong
            ? ((signal.currentPrice - signal.entry) / signal.entry) * 100
            : ((signal.entry - signal.currentPrice) / signal.entry) * 100
        : 0;

    const risk = signal.stopLoss
        ? isLong
            ? ((signal.entry - signal.stopLoss) / signal.entry) * 100
            : ((signal.stopLoss - signal.entry) / signal.entry) * 100
        : 0;

    const timeRemaining = signal.expiresAt - Date.now();
    const hoursRemaining = Math.max(0, Math.floor(timeRemaining / 3600000));

    const canEndorse = MOCK_USER.ethosScore >= MIN_ETHOS_SCORE_TO_ENDORSE;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Signals
            </Link>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <div className="mb-6 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-2xl font-bold">
                                        {signal.author.username?.[0] || '?'}
                                    </div>
                                    {signal.author.traderScore >= 80 && (
                                        <div className="absolute -bottom-1 -right-1 rounded-full bg-ethos-teal p-1">
                                            <Flame className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold">
                                            {signal.author.username || formatAddress(signal.author.address)}
                                        </span>
                                        {signal.isVerified ? (
                                            <CheckCircle className="h-5 w-5 text-ethos-teal" />
                                        ) : (
                                            <AlertTriangle className="h-5 w-5 text-ethos-yellow" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <EthosScoreBadge
                                            score={signal.author.ethosScore}
                                            address={signal.author.address}
                                            showLabel
                                        />
                                        <span className="text-sm text-muted-foreground">
                                            {signal.author.winRate.toFixed(0)}% win rate
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div
                                    className={cn(
                                        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-lg font-bold',
                                        isLong ? 'bg-ethos-green/10 text-ethos-green' : 'bg-ethos-red/10 text-ethos-red'
                                    )}
                                >
                                    {isLong ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                                    {signal.direction.toUpperCase()} {signal.token}
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {formatTimestamp(signal.timestamp)}
                                </p>
                            </div>
                        </div>

                        <div className="mb-6 grid grid-cols-4 gap-4">
                            <div className="rounded-xl bg-secondary p-4">
                                <p className="mb-1 text-sm text-muted-foreground">Entry</p>
                                <p className="font-mono text-xl font-bold">${signal.entry.toLocaleString()}</p>
                            </div>
                            <div className="rounded-xl bg-secondary p-4">
                                <div className="mb-1 flex items-center gap-1">
                                    <Target className="h-4 w-4 text-ethos-green" />
                                    <p className="text-sm text-muted-foreground">Target</p>
                                </div>
                                <p className="font-mono text-xl font-bold text-ethos-green">
                                    ${signal.target.toLocaleString()}
                                </p>
                            </div>
                            {signal.stopLoss && (
                                <div className="rounded-xl bg-secondary p-4">
                                    <div className="mb-1 flex items-center gap-1">
                                        <ShieldAlert className="h-4 w-4 text-ethos-red" />
                                        <p className="text-sm text-muted-foreground">Stop Loss</p>
                                    </div>
                                    <p className="font-mono text-xl font-bold text-ethos-red">
                                        ${signal.stopLoss.toLocaleString()}
                                    </p>
                                </div>
                            )}
                            <div className="rounded-xl bg-secondary p-4">
                                <div className="mb-1 flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <p className="text-sm text-muted-foreground">Time Left</p>
                                </div>
                                <p className="font-mono text-xl font-bold">
                                    {signal.status === 'active' ? `${hoursRemaining}h` : signal.status}
                                </p>
                            </div>
                        </div>

                        {signal.currentPrice && signal.status === 'active' && (
                            <div className="mb-6 rounded-xl border border-ethos-teal/20 bg-ethos-teal/5 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Price</p>
                                        <p className="font-mono text-2xl font-bold">${signal.currentPrice.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Unrealized P&L</p>
                                        <p
                                            className={cn(
                                                'font-mono text-2xl font-bold',
                                                currentPnl >= 0 ? 'text-ethos-green' : 'text-ethos-red'
                                            )}
                                        >
                                            {currentPnl >= 0 ? '+' : ''}
                                            {currentPnl.toFixed(2)}%
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className={cn(
                                            'h-full rounded-full transition-all',
                                            currentPnl >= 0 ? 'bg-ethos-green' : 'bg-ethos-red'
                                        )}
                                        style={{
                                            width: `${Math.min(Math.abs(currentPnl / potentialPnl) * 100, 100)}%`,
                                        }}
                                    />
                                </div>
                                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                                    <span>Entry</span>
                                    <span>Target ({potentialPnl.toFixed(1)}%)</span>
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="mb-2 font-semibold">Analysis & Reasoning</h3>
                            <p className="text-muted-foreground">{signal.reasoning}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 rounded-xl bg-secondary p-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-ethos-green">+{potentialPnl.toFixed(1)}%</p>
                                <p className="text-sm text-muted-foreground">Potential Gain</p>
                            </div>
                            {risk > 0 && (
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-ethos-red">-{risk.toFixed(1)}%</p>
                                    <p className="text-sm text-muted-foreground">Max Risk</p>
                                </div>
                            )}
                            {risk > 0 && (
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{(potentialPnl / risk).toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">Risk/Reward</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h3 className="mb-4 flex items-center gap-2 font-semibold">
                            <Award className="h-5 w-5 text-ethos-teal" />
                            Endorsements ({signal.endorsements.length})
                        </h3>

                        {signal.endorsements.length > 0 ? (
                            <div className="space-y-3">
                                {signal.endorsements.map((e) => (
                                    <div
                                        key={e.id}
                                        className="flex items-center justify-between rounded-lg bg-secondary p-3"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                                                {e.endorser.username?.[0] || '?'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {e.endorser.username || formatAddress(e.endorser.address)}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatTimestamp(e.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                        <EthosScoreBadge
                                            score={e.endorser.ethosScore}
                                            address={e.endorser.address}
                                            size="sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No endorsements yet</p>
                        )}

                        <div className="mt-4 border-t border-border pt-4">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Total Weight</span>
                                <span className="font-mono font-bold">
                                    {signal.endorsementWeight.toLocaleString()}
                                </span>
                            </div>

                            {canEndorse && signal.status === 'active' ? (
                                <button className="w-full rounded-lg bg-ethos-teal py-2.5 font-medium text-white transition-colors hover:bg-ethos-teal-dark">
                                    Endorse This Signal
                                </button>
                            ) : signal.status === 'active' ? (
                                <div className="rounded-lg bg-secondary p-3 text-center text-sm text-muted-foreground">
                                    Need {MIN_ETHOS_SCORE_TO_ENDORSE}+ Ethos to endorse
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h3 className="mb-4 flex items-center gap-2 font-semibold">
                            <BarChart3 className="h-5 w-5 text-ethos-teal" />
                            Trader Stats
                        </h3>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Trader Score</span>
                                <span className="font-mono font-bold">{signal.author.traderScore}/100</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Win Rate</span>
                                <span
                                    className={cn(
                                        'font-mono font-bold',
                                        signal.author.winRate >= 60 ? 'text-ethos-green' : 'text-ethos-yellow'
                                    )}
                                >
                                    {signal.author.winRate.toFixed(1)}%
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Total Signals</span>
                                <span className="font-mono font-bold">{signal.author.totalSignals}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Ethos Score</span>
                                <span className="font-mono font-bold">{signal.author.ethosScore}</span>
                            </div>
                        </div>

                        <a
                            href={`https://app.ethos.network/profile/${signal.author.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                        >
                            View on Ethos
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>

                    {!signal.isVerified && (
                        <div className="rounded-2xl border border-ethos-yellow/20 bg-ethos-yellow/5 p-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-ethos-yellow" />
                                <div>
                                    <h4 className="font-semibold text-ethos-yellow">Unverified Signal</h4>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        This trader has an Ethos score below 1400. Exercise caution and do your own
                                        research before acting on this signal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
