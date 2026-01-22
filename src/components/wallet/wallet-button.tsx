'use client';

import { useState } from 'react';
import { Wallet, LogOut, ChevronDown, CheckCircle, AlertTriangle, User, ExternalLink } from 'lucide-react';
import { useWalletStore } from '@/store/wallet';
import { formatAddress } from '@/lib/utils';
import { ConnectModal } from './connect-modal';
import { MIN_ETHOS_SCORE_VERIFIED } from '@/types';
import { cn } from '@/lib/utils';

export function WalletButton() {
    const { isConnected, address, username, ethosScore, disconnect } = useWalletStore();
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const isVerified = ethosScore >= MIN_ETHOS_SCORE_VERIFIED;

    if (!isConnected) {
        return (
            <>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 rounded-lg bg-ethos-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ethos-teal-dark"
                >
                    <Wallet className="h-4 w-4" />
                    Connect
                </button>
                <ConnectModal isOpen={showModal} onClose={() => setShowModal(false)} />
            </>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ethos-teal/20 text-xs font-bold">
                    {username?.[0] || '?'}
                </div>
                <span className="max-w-[100px] truncate">{username || formatAddress(address!)}</span>
                {isVerified ? (
                    <CheckCircle className="h-4 w-4 text-ethos-teal" />
                ) : (
                    <AlertTriangle className="h-4 w-4 text-ethos-yellow" />
                )}
                <ChevronDown className={cn('h-4 w-4 transition-transform', showDropdown && 'rotate-180')} />
            </button>

            {showDropdown && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                    <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-border bg-card p-2 shadow-xl">
                        <div className="mb-2 rounded-lg bg-secondary p-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Ethos Score</span>
                                <span className="font-mono font-bold text-ethos-teal">{ethosScore}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-xs">
                                {isVerified ? (
                                    <>
                                        <CheckCircle className="h-3 w-3 text-ethos-teal" />
                                        <span className="text-ethos-teal">Verified Trader</span>
                                    </>
                                ) : (
                                    <>
                                        <AlertTriangle className="h-3 w-3 text-ethos-yellow" />
                                        <span className="text-ethos-yellow">Build more reputation</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <a
                            href={`https://app.ethos.network/profile/${address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary"
                            onClick={() => setShowDropdown(false)}
                        >
                            <User className="h-4 w-4" />
                            View Ethos Profile
                            <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
                        </a>

                        <button
                            onClick={() => {
                                disconnect();
                                setShowDropdown(false);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ethos-red transition-colors hover:bg-ethos-red/10"
                        >
                            <LogOut className="h-4 w-4" />
                            Disconnect
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
