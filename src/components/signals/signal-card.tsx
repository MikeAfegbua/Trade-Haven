import { Signal } from '@/types';
import { EthosScoreBadge } from '@/components/ethos';
import { EndorseButton } from './endorse-button';
import { formatAddress, formatTimestamp } from '@/lib/utils';
import { TrendingUp, TrendingDown, Target, ShieldAlert, Clock, CheckCircle, AlertTriangle, Flame, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SignalCardProps {
    signal: Signal;
    onEndorse?: () => void;
    compact?: boolean;
}

export function SignalCard({ signal, onEndorse, compact = false }: SignalCardProps) {
    const isLong = signal.direction === 'long';
    const potentialPnl = isLong
        ? ((signal.target - signal.entry) / signal.entry) * 100
        : ((signal.entry - signal.target) / signal.entry) * 100;

    const currentPnl = signal.currentPrice
        ? isLong
            ? ((signal.currentPrice - signal.entry) / signal.entry) * 100
            : ((signal.entry - signal.currentPrice) / signal.entry) * 100
        : 0;

    const timeRemaining = signal.expiresAt - Date.now();
    const hoursRemaining = Math.max(0, Math.floor(timeRemaining / 3600000));
    const isExpiringSoon = timeRemaining > 0 && timeRemaining < 3600000;

    return (
        <Link href={`/signal/${signal.id}`} className="block h-full">
            <div className={cn(
                'group relative h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 ease-out hover:border-ethos-teal/50 hover:shadow-lg hover:shadow-ethos-teal/10 hover:-translate-y-1 hover:scale-[1.02]',
                compact ? 'p-4' : 'p-5'
            )}>
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-ethos-teal/10 to-transparent transition-transform duration-300 group-hover:scale-150" />

                <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg font-bold">
                                {signal.author.username?.[0] || '?'}
                            </div>
                            {signal.author.traderScore >= 80 && (
                                <div className="absolute -bottom-1 -right-1 rounded-full bg-ethos-teal p-0.5">
                                    <Flame className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">
                                    {signal.author.username || formatAddress(signal.author.address)}
                                </span>
                                {signal.isVerified ? (
                                    <CheckCircle className="h-4 w-4 text-ethos-teal" />
                                ) : (
                                    <AlertTriangle className="h-4 w-4 text-ethos-yellow" />
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{signal.author.winRate.toFixed(0)}% win</span>
                                <span>•</span>
                                <span>Score {signal.author.traderScore}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <div
                            className={cn(
                                'flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold',
                                isLong ? 'bg-ethos-green/10 text-ethos-green' : 'bg-ethos-red/10 text-ethos-red'
                            )}
                        >
                            {isLong ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            {signal.direction.toUpperCase()}
                        </div>
                        <EthosScoreBadge score={signal.author.ethosScore} address={signal.author.address} size="sm" asLink={false} />
                    </div>
                </div>

                <div className="mb-3">
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">{signal.token}</span>
                            {signal.status === 'active' && signal.currentPrice && (
                                <span className={cn(
                                    'text-lg font-semibold',
                                    currentPnl >= 0 ? 'text-ethos-green' : 'text-ethos-red'
                                )}>
                                    {currentPnl >= 0 ? '+' : ''}{currentPnl.toFixed(1)}%
                                </span>
                            )}
                            {signal.status === 'hit' && signal.pnl && (
                                <span className="rounded-full bg-ethos-green/10 px-2 py-0.5 text-sm font-semibold text-ethos-green">
                                    +{signal.pnl.toFixed(1)}% ✓
                                </span>
                            )}
                        </div>
                        <div className={cn(
                            'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                            signal.status === 'active' && 'bg-ethos-teal/10 text-ethos-teal',
                            signal.status === 'hit' && 'bg-ethos-green/10 text-ethos-green',
                            signal.status === 'stopped' && 'bg-ethos-red/10 text-ethos-red',
                            signal.status === 'expired' && 'bg-muted text-muted-foreground'
                        )}>
                            {signal.status === 'active' && <Clock className="h-3 w-3" />}
                            {signal.status === 'active' ? (
                                isExpiringSoon ? 'Expiring soon' : `${hoursRemaining}h left`
                            ) : (
                                signal.status.charAt(0).toUpperCase() + signal.status.slice(1)
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-lg bg-secondary p-2">
                            <p className="text-xs text-muted-foreground">Entry</p>
                            <p className="font-mono text-sm font-medium">${signal.entry.toLocaleString()}</p>
                        </div>
                        <div className="rounded-lg bg-secondary p-2">
                            <div className="flex items-center gap-1">
                                <Target className="h-3 w-3 text-ethos-green" />
                                <p className="text-xs text-muted-foreground">Target</p>
                            </div>
                            <p className="font-mono text-sm font-medium text-ethos-green">${signal.target.toLocaleString()}</p>
                        </div>
                        {signal.stopLoss && (
                            <div className="rounded-lg bg-secondary p-2">
                                <div className="flex items-center gap-1">
                                    <ShieldAlert className="h-3 w-3 text-ethos-red" />
                                    <p className="text-xs text-muted-foreground">Stop</p>
                                </div>
                                <p className="font-mono text-sm font-medium text-ethos-red">${signal.stopLoss.toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                </div>

                {!compact && (
                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{signal.reasoning}</p>
                )}

                <div className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {signal.endorsements.length > 0 && (
                            <div className="flex items-center gap-1">
                                <div className="flex -space-x-2">
                                    {signal.endorsements.slice(0, 3).map((e) => (
                                        <div
                                            key={e.id}
                                            className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-secondary text-xs font-bold sm:h-6 sm:w-6"
                                            title={`${e.endorser.username || formatAddress(e.endorser.address)} (${e.endorser.ethosScore})`}
                                        >
                                            {e.endorser.username?.[0] || '?'}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {signal.endorsementWeight.toLocaleString()} weight
                                </span>
                            </div>
                        )}

                        <EndorseButton
                            signalId={signal.id}
                            signalStatus={signal.status}
                            onEndorse={onEndorse}
                        />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatTimestamp(signal.timestamp)}</span>
                        {signal.votes.up > 0 && (
                            <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    {signal.votes.up}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
