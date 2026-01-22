'use client';

import { useState } from 'react';
import { X, Wallet, CheckCircle, AlertTriangle, Flame, ExternalLink } from 'lucide-react';
import { useWalletStore, AVAILABLE_WALLETS } from '@/store/wallet';
import { formatAddress } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { MIN_ETHOS_SCORE_VERIFIED } from '@/types';

interface ConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
    const { connect } = useWalletStore();
    const [isConnecting, setIsConnecting] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleConnect = async (address: string) => {
        setIsConnecting(address);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        connect(address);
        setIsConnecting(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative z-10 mx-auto my-8 w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-xl sm:my-0 sm:p-6">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground sm:right-4 sm:top-4"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="mb-4 text-center sm:mb-6">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-ethos-teal/10 sm:h-12 sm:w-12">
                        <Wallet className="h-5 w-5 text-ethos-teal sm:h-6 sm:w-6" />
                    </div>
                    <h2 className="text-lg font-bold sm:text-xl">Connect Wallet</h2>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Select a demo wallet to simulate connection
                    </p>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-[50vh] sm:max-h-70">
                    {AVAILABLE_WALLETS.map((wallet) => {
                        const isVerified = wallet.ethosScore >= MIN_ETHOS_SCORE_VERIFIED;

                        return (
                            <button
                                key={wallet.address}
                                onClick={() => handleConnect(wallet.address!)}
                                disabled={isConnecting !== null}
                                className={cn(
                                    'flex w-full items-center gap-3 rounded-xl border border-border bg-secondary p-4 text-left transition-all hover:border-ethos-teal/50 hover:bg-secondary/80',
                                    isConnecting === wallet.address && 'animate-pulse border-ethos-teal'
                                )}
                            >
                                <div className="relative">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-bold">
                                        {wallet.username?.[0] || '?'}
                                    </div>
                                    {wallet.traderScore >= 80 && (
                                        <div className="absolute -bottom-1 -right-1 rounded-full bg-ethos-teal p-0.5">
                                            <Flame className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{wallet.username}</span>
                                        {isVerified ? (
                                            <CheckCircle className="h-4 w-4 text-ethos-teal" />
                                        ) : (
                                            <AlertTriangle className="h-4 w-4 text-ethos-yellow" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{formatAddress(wallet.address!)}</span>
                                        <span>•</span>
                                        <span>{wallet.winRate}% win rate</span>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-mono font-bold text-ethos-teal">{wallet.ethosScore}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {isVerified ? 'Verified' : 'Unverified'}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 rounded-lg bg-secondary/50 p-3">
                    <p className="text-xs text-muted-foreground">
                        <strong>Demo Mode:</strong> These are simulated wallets with different Ethos scores.
                        Higher scores = higher signal visibility.
                    </p>
                </div>

                <a
                    href="https://app.ethos.network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ethos-teal"
                >
                    Build your Ethos reputation
                    <ExternalLink className="h-3 w-3" />
                </a>
            </div>
        </div>
    );
}
