import { Signal, TraderStats } from '@/types';

function calculateTraderScore(ethosScore: number, winRate: number, totalSignals: number): number {
    const ethosWeight = 0.4;
    const performanceWeight = 0.5;
    const experienceWeight = 0.1;

    const normalizedEthos = Math.min(ethosScore / 2000, 1) * 100;
    const normalizedWinRate = winRate;
    const normalizedExperience = Math.min(totalSignals / 50, 1) * 100;

    return Math.round(
        normalizedEthos * ethosWeight +
        normalizedWinRate * performanceWeight +
        normalizedExperience * experienceWeight
    );
}

function calculateEndorsementWeight(endorsements: Signal['endorsements']): number {
    return endorsements
        .filter(e => e.type === 'endorse')
        .reduce((sum, e) => sum + e.endorser.ethosScore, 0);
}

function calculateVisibilityScore(signal: Signal): number {
    const authorWeight = signal.author.ethosScore * 0.3;
    const performanceWeight = signal.author.traderScore * 0.4;
    const endorsementWeight = Math.min(signal.endorsementWeight / 5000, 1) * 100 * 0.2;
    const recencyWeight = Math.max(0, 100 - (Date.now() - signal.timestamp) / 3600000) * 0.1;

    return authorWeight + performanceWeight + endorsementWeight + recencyWeight;
}

const MOCK_SIGNALS: Signal[] = [
    {
        id: '1',
        author: {
            address: '0x1234567890abcdef1234567890abcdef12345678',
            username: 'zachxbt',
            ethosScore: 1847,
            traderScore: 82,
            winRate: 73.5,
            totalSignals: 89,
        },
        token: 'ETH',
        direction: 'long',
        entry: 3250,
        target: 3800,
        stopLoss: 3100,
        reasoning: 'Strong support at $3200, breaking out of consolidation. RSI showing bullish divergence on 4H chart. Volume increasing significantly.',
        timestamp: Date.now() - 3600000,
        expiresAt: Date.now() + 86400000,
        status: 'active',
        currentPrice: 3320,
        isVerified: true,
        endorsements: [
            { id: 'e1', signalId: '1', endorser: { address: '0xabc', username: 'powellruggedme', ethosScore: 1923 }, timestamp: Date.now() - 1800000, type: 'endorse' },
            { id: 'e2', signalId: '1', endorser: { address: '0xdef', username: 'serpinxbt', ethosScore: 1562 }, timestamp: Date.now() - 900000, type: 'endorse' },
        ],
        endorsementWeight: 3485,
        votes: { up: 42, down: 3 },
    },
    {
        id: '2',
        author: {
            address: '0xfedcba9876543210fedcba9876543210fedcba98',
            username: 'powellruggedme',
            ethosScore: 1923,
            traderScore: 91,
            winRate: 78.5,
            totalSignals: 124,
        },
        token: 'BTC',
        direction: 'long',
        entry: 97500,
        target: 105000,
        stopLoss: 94000,
        reasoning: 'Breaking previous ATH with strong institutional buying. ETF inflows remain positive. Weekly close above 95k confirms bullish structure.',
        timestamp: Date.now() - 7200000,
        expiresAt: Date.now() + 604800000,
        status: 'active',
        currentPrice: 99200,
        isVerified: true,
        endorsements: [
            { id: 'e3', signalId: '2', endorser: { address: '0x123', username: 'zachxbt', ethosScore: 1847 }, timestamp: Date.now() - 3600000, type: 'endorse' },
        ],
        endorsementWeight: 1847,
        votes: { up: 89, down: 12 },
    },
    {
        id: '3',
        author: {
            address: '0x9876543210fedcba9876543210fedcba98765432',
            username: '0xGiwax',
            ethosScore: 982,
            traderScore: 45,
            winRate: 51.2,
            totalSignals: 234,
        },
        token: 'SOL',
        direction: 'short',
        entry: 185,
        target: 150,
        stopLoss: 195,
        reasoning: 'Overextended on daily, expecting pullback to 200 EMA. Network congestion issues persist.',
        timestamp: Date.now() - 14400000,
        expiresAt: Date.now() + 172800000,
        status: 'active',
        currentPrice: 182,
        isVerified: false,
        endorsements: [],
        endorsementWeight: 0,
        votes: { up: 15, down: 28 },
    },
    {
        id: '4',
        author: {
            address: '0xabcdef1234567890abcdef1234567890abcdef12',
            username: 'serpinxbt',
            ethosScore: 1562,
            traderScore: 76,
            winRate: 68.9,
            totalSignals: 156,
        },
        token: 'LINK',
        direction: 'long',
        entry: 22.5,
        target: 30,
        stopLoss: 20,
        reasoning: 'CCIP adoption accelerating. Multiple partnerships announced. Accumulation pattern on weekly chart.',
        timestamp: Date.now() - 28800000,
        expiresAt: Date.now() + 604800000,
        status: 'active',
        currentPrice: 24.8,
        isVerified: true,
        endorsements: [
            { id: 'e4', signalId: '4', endorser: { address: '0xfed', username: 'powellruggedme', ethosScore: 1923 }, timestamp: Date.now() - 7200000, type: 'endorse' },
            { id: 'e5', signalId: '4', endorser: { address: '0x456', username: 'zachxbt', ethosScore: 1847 }, timestamp: Date.now() - 3600000, type: 'endorse' },
        ],
        endorsementWeight: 3770,
        votes: { up: 156, down: 8 },
    },
    {
        id: '5',
        author: {
            address: '0x1111222233334444555566667777888899990000',
            username: '1st_Bernice',
            ethosScore: 458,
            traderScore: 22,
            winRate: 38.7,
            totalSignals: 45,
        },
        token: 'DOGE',
        direction: 'long',
        entry: 0.32,
        target: 0.50,
        stopLoss: 0.28,
        reasoning: 'Elon tweeted a dog emoji. Moon soon! 🚀',
        timestamp: Date.now() - 43200000,
        expiresAt: Date.now() + 86400000,
        status: 'active',
        currentPrice: 0.31,
        isVerified: false,
        endorsements: [],
        endorsementWeight: 0,
        votes: { up: 5, down: 67 },
    },
    {
        id: '6',
        author: {
            address: '0xfedcba9876543210fedcba9876543210fedcba98',
            username: 'shinobeme',
            ethosScore: 1923,
            traderScore: 91,
            winRate: 78.5,
            totalSignals: 124,
        },
        token: 'ETH',
        direction: 'long',
        entry: 2800,
        target: 3200,
        stopLoss: 2650,
        reasoning: 'Major support held, expecting bounce to previous resistance.',
        timestamp: Date.now() - 172800000,
        expiresAt: Date.now() - 86400000,
        status: 'hit',
        currentPrice: 3250,
        finalPrice: 3215,
        pnl: 14.8,
        isVerified: true,
        endorsements: [],
        endorsementWeight: 0,
        votes: { up: 234, down: 12 },
    },
];

export async function getSignals(): Promise<Signal[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_SIGNALS.sort((a, b) => calculateVisibilityScore(b) - calculateVisibilityScore(a));
}

export async function getSignalById(id: string): Promise<Signal | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_SIGNALS.find(s => s.id === id) || null;
}

export async function createSignal(
    input: Omit<Signal, 'id' | 'timestamp' | 'status' | 'votes' | 'endorsements' | 'endorsementWeight' | 'isVerified' | 'expiresAt'>,
    timeframe: '1h' | '4h' | '1d' | '1w'
): Promise<Signal> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const timeframeMs = {
        '1h': 3600000,
        '4h': 14400000,
        '1d': 86400000,
        '1w': 604800000,
    };

    return {
        ...input,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        expiresAt: Date.now() + timeframeMs[timeframe],
        status: 'active',
        isVerified: input.author.ethosScore >= 1400,
        endorsements: [],
        endorsementWeight: 0,
        votes: { up: 0, down: 0 },
    };
}

export async function endorseSignal(signalId: string, endorser: Signal['endorsements'][0]['endorser']): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
}

export async function getTraderStats(address: string): Promise<TraderStats | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const signals = MOCK_SIGNALS.filter(s => s.author.address === address);
    if (signals.length === 0) return null;

    const author = signals[0].author;
    const hitSignals = signals.filter(s => s.status === 'hit').length;
    const stoppedSignals = signals.filter(s => s.status === 'stopped').length;

    return {
        address,
        username: author.username,
        ethosScore: author.ethosScore,
        traderScore: author.traderScore,
        winRate: author.winRate,
        avgReturn: signals.filter(s => s.pnl).reduce((sum, s) => sum + (s.pnl || 0), 0) / Math.max(hitSignals + stoppedSignals, 1),
        totalSignals: author.totalSignals,
        hitSignals,
        stoppedSignals,
        streak: 3,
        lastActive: signals[0].timestamp,
    };
}

export { calculateTraderScore, calculateEndorsementWeight, calculateVisibilityScore };
