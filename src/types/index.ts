export interface Endorsement {
    id: string;
    signalId: string;
    endorser: {
        address: string;
        username?: string;
        ethosScore: number;
    };
    timestamp: number;
    type: 'endorse' | 'flag';
}

export interface Signal {
    id: string;
    author: {
        address: string;
        username?: string;
        avatar?: string;
        ethosScore: number;
        traderScore: number;
        winRate: number;
        totalSignals: number;
    };
    token: string;
    direction: 'long' | 'short';
    entry: number;
    target: number;
    stopLoss?: number;
    reasoning: string;
    timestamp: number;
    expiresAt: number;
    status: 'active' | 'hit' | 'stopped' | 'expired';
    currentPrice?: number;
    finalPrice?: number;
    pnl?: number;
    isVerified: boolean;
    endorsements: Endorsement[];
    endorsementWeight: number;
    votes: {
        up: number;
        down: number;
    };
}

export interface TraderStats {
    address: string;
    username?: string;
    ethosScore: number;
    traderScore: number;
    winRate: number;
    avgReturn: number;
    totalSignals: number;
    hitSignals: number;
    stoppedSignals: number;
    streak: number;
    lastActive: number;
}

export interface EthosUser {
    profileId: number;
    address: string;
    username?: string;
    avatar?: string;
    score: number;
    reviewStats: {
        received: {
            positive: number;
            negative: number;
            neutral: number;
        };
    };
}

export interface EthosScoreResponse {
    score: number;
    profileId?: number;
}

export type SignalFilter = 'all' | 'long' | 'short' | 'verified';
export type SignalSort = 'weighted' | 'newest' | 'reputation' | 'performance';

export interface CreateSignalInput {
    token: string;
    direction: 'long' | 'short';
    entry: number;
    target: number;
    stopLoss?: number;
    reasoning: string;
    timeframe: '1h' | '4h' | '1d' | '1w';
}

export const MIN_ETHOS_SCORE_TO_POST = 1000;
export const MIN_ETHOS_SCORE_VERIFIED = 1400;
export const MIN_ETHOS_SCORE_TO_ENDORSE = 1200;
