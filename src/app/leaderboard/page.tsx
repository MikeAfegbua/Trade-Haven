'use client';

import Link from 'next/link';
import { EthosScoreBadge } from '@/components/ethos';
import { formatAddress } from '@/lib/utils';
import { calculateTraderScore } from '@/lib/signals';
import { Trophy, TrendingUp, Target, Award, CheckCircle, AlertTriangle, Flame, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_LEADERBOARD = [
    {
        address: '0xfedcba9876543210fedcba9876543210fedcba98',
        username: 'powellruggedme',
        ethosScore: 1923,
        winRate: 78.5,
        totalSignals: 124,
        avgReturn: 34.2,
        successfulSignals: 97,
    },
    {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        username: 'zachxbt',
        ethosScore: 1847,
        winRate: 72.3,
        totalSignals: 89,
        avgReturn: 28.7,
        successfulSignals: 64,
    },
    {
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        username: 'serpinxbt',
        ethosScore: 1562,
        winRate: 68.9,
        totalSignals: 156,
        avgReturn: 22.4,
        successfulSignals: 107,
    },
    {
        address: '0x9876543210fedcba9876543210fedcba98765432',
        username: '0xGiwax',
        ethosScore: 982,
        winRate: 51.2,
        totalSignals: 234,
        avgReturn: 8.3,
        successfulSignals: 119,
    },
    {
        address: '0x1111222233334444555566667777888899990000',
        username: '1st_Bernice',
        ethosScore: 458,
        winRate: 38.7,
        totalSignals: 45,
        avgReturn: -12.5,
        successfulSignals: 17,
    },
].map((trader) => ({
    ...trader,
    traderScore: calculateTraderScore(trader.ethosScore, trader.winRate, trader.totalSignals),
    isVerified: trader.ethosScore >= 1400,
})).sort((a, b) => b.traderScore - a.traderScore).map((t, i) => ({ ...t, rank: i + 1 }));

export default function LeaderboardPage() {
    const topTrader = MOCK_LEADERBOARD[0];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ethos-teal/20 bg-ethos-teal/10 px-4 py-1.5 text-sm">
                    <Trophy className="h-4 w-4 text-ethos-teal" />
                    <span className="text-ethos-teal">Reputation + Performance = Rank</span>
                </div>
                <h1 className="mb-2 text-4xl font-bold">Trader Leaderboard</h1>
                <p className="text-muted-foreground">
                    Ranked by Trader Score: 40% Ethos reputation + 50% trading performance + 10% experience
                </p>
            </div>

            <div className="mb-8 rounded-xl border border-ethos-teal/30 bg-gradient-to-r from-ethos-teal/10 to-transparent p-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ethos-teal/20 text-3xl font-bold">
                            {topTrader.username[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 rounded-full bg-yellow-500 p-1.5">
                            <Trophy className="h-4 w-4 text-yellow-900" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold">{topTrader.username}</h2>
                            {topTrader.isVerified && <CheckCircle className="h-5 w-5 text-ethos-teal" />}
                            <Flame className="h-5 w-5 text-orange-500" />
                        </div>
                        <p className="text-muted-foreground">{formatAddress(topTrader.address)}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="font-mono text-3xl font-bold text-ethos-teal">{topTrader.traderScore}</p>
                            <p className="text-sm text-muted-foreground">Trader Score</p>
                        </div>
                        <div>
                            <p className="font-mono text-3xl font-bold">{topTrader.ethosScore}</p>
                            <p className="text-sm text-muted-foreground">Ethos Score</p>
                        </div>
                        <div>
                            <p className="font-mono text-3xl font-bold text-ethos-green">{topTrader.winRate}%</p>
                            <p className="text-sm text-muted-foreground">Win Rate</p>
                        </div>
                        <div>
                            <p className="font-mono text-3xl font-bold text-ethos-green">+{topTrader.avgReturn}%</p>
                            <p className="text-sm text-muted-foreground">Avg Return</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full">
                    <thead className="bg-secondary">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Trader</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                <div className="flex items-center gap-1">
                                    <Flame className="h-4 w-4 text-ethos-teal" />
                                    Trader Score
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Ethos Score</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                <div className="flex items-center gap-1">
                                    <Target className="h-4 w-4" />
                                    Win Rate
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Signals</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="h-4 w-4" />
                                    Avg Return
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {MOCK_LEADERBOARD.map((trader) => (
                            <tr key={trader.address} className="transition-colors hover:bg-secondary/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {trader.rank <= 3 ? (
                                            <div
                                                className={cn(
                                                    'flex h-8 w-8 items-center justify-center rounded-full',
                                                    trader.rank === 1
                                                        ? 'bg-yellow-500/20 text-yellow-500'
                                                        : trader.rank === 2
                                                            ? 'bg-gray-400/20 text-gray-400'
                                                            : 'bg-amber-600/20 text-amber-600'
                                                )}
                                            >
                                                <Award className="h-4 w-4" />
                                            </div>
                                        ) : (
                                            <span className="flex h-8 w-8 items-center justify-center text-muted-foreground">
                                                {trader.rank}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg font-bold">
                                                {trader.username?.[0]}
                                            </div>
                                            {trader.traderScore >= 80 && (
                                                <div className="absolute -bottom-1 -right-1 rounded-full bg-ethos-teal p-0.5">
                                                    <Flame className="h-3 w-3 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <p className="font-medium">{trader.username}</p>
                                                {trader.isVerified ? (
                                                    <CheckCircle className="h-4 w-4 text-ethos-teal" />
                                                ) : (
                                                    <AlertTriangle className="h-4 w-4 text-ethos-yellow" />
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {formatAddress(trader.address)}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary">
                                            <div
                                                className={cn(
                                                    'h-full rounded-full',
                                                    trader.traderScore >= 80
                                                        ? 'bg-ethos-teal'
                                                        : trader.traderScore >= 60
                                                            ? 'bg-ethos-green'
                                                            : trader.traderScore >= 40
                                                                ? 'bg-ethos-yellow'
                                                                : 'bg-ethos-red'
                                                )}
                                                style={{ width: `${trader.traderScore}%` }}
                                            />
                                        </div>
                                        <span className="font-mono font-bold">{trader.traderScore}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <EthosScoreBadge
                                        score={trader.ethosScore}
                                        address={trader.address}
                                        showLabel
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={cn(
                                            'font-mono',
                                            trader.winRate >= 60
                                                ? 'text-ethos-green'
                                                : trader.winRate >= 50
                                                    ? 'text-foreground'
                                                    : 'text-ethos-red'
                                        )}
                                    >
                                        {trader.winRate}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">{trader.totalSignals}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={cn(
                                            'font-mono',
                                            trader.avgReturn >= 0 ? 'text-ethos-green' : 'text-ethos-red'
                                        )}
                                    >
                                        {trader.avgReturn >= 0 ? '+' : ''}
                                        {trader.avgReturn}%
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href={`https://app.ethos.network/profile/${trader.address}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground transition-colors hover:text-ethos-teal"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 rounded-xl border border-border bg-secondary/30 p-6">
                <h3 className="mb-3 font-semibold">How Trader Score Works</h3>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-card p-4">
                        <p className="mb-1 font-mono text-2xl font-bold text-ethos-teal">40%</p>
                        <p className="text-sm font-medium">Ethos Reputation</p>
                        <p className="text-xs text-muted-foreground">On-chain credibility score from Ethos Network</p>
                    </div>
                    <div className="rounded-lg bg-card p-4">
                        <p className="mb-1 font-mono text-2xl font-bold text-ethos-green">50%</p>
                        <p className="text-sm font-medium">Trading Performance</p>
                        <p className="text-xs text-muted-foreground">Win rate and average returns on signals</p>
                    </div>
                    <div className="rounded-lg bg-card p-4">
                        <p className="mb-1 font-mono text-2xl font-bold text-muted-foreground">10%</p>
                        <p className="text-sm font-medium">Experience</p>
                        <p className="text-xs text-muted-foreground">Total signals posted (capped at 100)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
