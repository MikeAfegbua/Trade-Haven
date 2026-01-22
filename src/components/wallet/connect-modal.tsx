'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    const handleConnect = async (address: string) => {
        setIsConnecting(address);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        connect(address);
        setIsConnecting(null);
        onClose();
    };

    const modalContent = (
        <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
        >
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                style={{ zIndex: 9999 }}
            />

            <div
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-xl max-h-[85vh] flex flex-col"
                style={{ zIndex: 10000 }}
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 text-muted-foreground transition-colors hover:text-foreground"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="shrink-0 p-6 pb-4 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ethos-teal/10">
                        <Wallet className="h-6 w-6 text-ethos-teal" />
                    </div>
                    <h2 className="text-xl font-bold">Connect Wallet</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Select a demo wallet to simulate connection
                    </p>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-6">
                    <div className="space-y-3 pb-4">
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
                                    <div className="relative shrink-0">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-bold">
                                            {wallet.username?.[0] || '?'}
                                        </div>
                                        {wallet.traderScore >= 80 && (
                                            <div className="absolute -bottom-1 -right-1 rounded-full bg-ethos-teal p-0.5">
                                                <Flame className="h-3 w-3 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-medium truncate">{wallet.username}</span>
                                            {isVerified ? (
                                                <CheckCircle className="h-4 w-4 text-ethos-teal shrink-0" />
                                            ) : (
                                                <AlertTriangle className="h-4 w-4 text-ethos-yellow shrink-0" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <span className="truncate">{formatAddress(wallet.address!)}</span>
                                            <span>•</span>
                                            <span>{wallet.winRate}% win</span>
                                        </div>
                                    </div>

                                    <div className="text-right shrink-0">
                                        <p className="font-mono font-bold text-ethos-teal">{wallet.ethosScore}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {isVerified ? 'Verified' : 'Unverified'}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="shrink-0 p-6 pt-4">
                    <div className="rounded-lg bg-secondary/50 p-3">
                        <p className="text-xs text-muted-foreground">
                            <strong>Demo Mode:</strong> These are simulated wallets with different Ethos scores.
                            Higher scores = higher signal visibility.
                        </p>
                    </div>

                    <a
                        href="https://app.ethos.network"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ethos-teal"
                    >
                        Build your Ethos reputation
                        <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}