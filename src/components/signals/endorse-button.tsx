'use client';

import { useState } from 'react';
import { Award, CheckCircle, X, AlertTriangle, Lock } from 'lucide-react';
import { useWalletStore } from '@/store/wallet';
import { MIN_ETHOS_SCORE_TO_ENDORSE } from '@/types';
import { cn } from '@/lib/utils';

interface EndorseButtonProps {
    signalId: string;
    signalStatus: string;
    onEndorse?: () => void;
    variant?: 'compact' | 'full';
}

export function EndorseButton({ signalId, signalStatus, onEndorse, variant = 'compact' }: EndorseButtonProps) {
    const { isConnected, ethosScore, username } = useWalletStore();
    const [isEndorsing, setIsEndorsing] = useState(false);
    const [hasEndorsed, setHasEndorsed] = useState(false);
    const [showFeedback, setShowFeedback] = useState<'success' | 'error' | 'low-score' | 'not-connected' | null>(null);

    const canEndorse = isConnected && ethosScore >= MIN_ETHOS_SCORE_TO_ENDORSE;
    const isActive = signalStatus === 'active';

    const handleEndorse = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isConnected) {
            setShowFeedback('not-connected');
            setTimeout(() => setShowFeedback(null), 3000);
            return;
        }

        if (ethosScore < MIN_ETHOS_SCORE_TO_ENDORSE) {
            setShowFeedback('low-score');
            setTimeout(() => setShowFeedback(null), 3000);
            return;
        }

        if (hasEndorsed || !isActive) return;

        setIsEndorsing(true);

        await new Promise(resolve => setTimeout(resolve, 800));

        setHasEndorsed(true);
        setIsEndorsing(false);
        setShowFeedback('success');
        setTimeout(() => setShowFeedback(null), 3000);

        onEndorse?.();
    };

    if (!isActive) return null;

    if (variant === 'full') {
        return (
            <div className="relative">
                {hasEndorsed ? (
                    <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-ethos-green/10 py-2.5 font-medium text-ethos-green">
                        <CheckCircle className="h-4 w-4" />
                        Endorsed
                    </div>
                ) : !isConnected ? (
                    <div className="rounded-lg bg-secondary p-3 text-center text-sm text-muted-foreground">
                        Connect wallet to endorse
                    </div>
                ) : ethosScore < MIN_ETHOS_SCORE_TO_ENDORSE ? (
                    <div className="rounded-lg bg-secondary p-3 text-center text-sm text-muted-foreground">
                        Need {MIN_ETHOS_SCORE_TO_ENDORSE}+ Ethos to endorse
                    </div>
                ) : (
                    <button
                        onClick={handleEndorse}
                        disabled={isEndorsing}
                        className={cn(
                            'w-full rounded-lg bg-ethos-teal py-2.5 font-medium text-white transition-colors hover:bg-ethos-teal-dark',
                            isEndorsing && 'animate-pulse opacity-70'
                        )}
                    >
                        {isEndorsing ? 'Endorsing...' : 'Endorse This Signal'}
                    </button>
                )}

                {showFeedback && (
                    <FeedbackToast type={showFeedback} onClose={() => setShowFeedback(null)} />
                )}
            </div>
        );
    }

    return (
        <div className="relative">
            {hasEndorsed ? (
                <span className="flex items-center gap-1 rounded-lg bg-ethos-green/10 px-2 py-1 text-xs font-medium text-ethos-green">
                    <CheckCircle className="h-3 w-3" />
                    Endorsed
                </span>
            ) : (
                <button
                    onClick={handleEndorse}
                    disabled={isEndorsing}
                    className={cn(
                        'flex items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-xs font-medium transition-colors hover:bg-ethos-teal/20 hover:text-ethos-teal',
                        isEndorsing && 'animate-pulse'
                    )}
                >
                    <Award className="h-3 w-3" />
                    {isEndorsing ? '...' : 'Endorse'}
                </button>
            )}

            {showFeedback && (
                <FeedbackToast type={showFeedback} onClose={() => setShowFeedback(null)} />
            )}
        </div>
    );
}

function FeedbackToast({ type, onClose }: { type: 'success' | 'error' | 'low-score' | 'not-connected'; onClose: () => void }) {
    const config = {
        success: {
            icon: CheckCircle,
            message: 'Endorsement added!',
            color: 'bg-ethos-green text-white',
        },
        error: {
            icon: X,
            message: 'Failed to endorse',
            color: 'bg-ethos-red text-white',
        },
        'low-score': {
            icon: AlertTriangle,
            message: `Need ${MIN_ETHOS_SCORE_TO_ENDORSE}+ Ethos`,
            color: 'bg-ethos-yellow text-black',
        },
        'not-connected': {
            icon: Lock,
            message: 'Connect wallet first',
            color: 'bg-secondary text-foreground border border-border',
        },
    };

    const { icon: Icon, message, color } = config[type];

    return (
        <div className={cn(
            'absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 duration-200',
            'flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium shadow-lg',
            color
        )}>
            <Icon className="h-3 w-3" />
            {message}
        </div>
    );
}
