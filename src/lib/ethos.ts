const ETHOS_API_BASE = 'https://api.ethos.network/api/v2';
const ETHOS_CLIENT_HEADER = 'trade-haven';

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

async function ethosRequest<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const response = await fetch(`${ETHOS_API_BASE}${endpoint}`, {
        ...options,
        headers: {
            'X-Ethos-Client': ETHOS_CLIENT_HEADER,
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Ethos API error: ${response.statusText}`);
    }

    return response.json();
}

export async function getScoreByAddress(address: string): Promise<{ score: number }> {
    return ethosRequest(`/score/address?address=${address}`);
}

export async function getUserByAddress(address: string) {
    return ethosRequest(`/user/by/address/${address}`);
}

export async function getScoreByTwitterHandle(handle: string): Promise<{ score: number }> {
    return ethosRequest(`/score/target?target=service:x.com:username:${handle}`);
}

export function getEthosProfileUrl(address: string): string {
    return `https://app.ethos.network/profile/${address}`;
}

export function getScoreColor(score: number): string {
    if (score >= 1800) return 'text-ethos-teal';
    if (score >= 1400) return 'text-ethos-green';
    if (score >= 1000) return 'text-ethos-yellow';
    return 'text-ethos-red';
}

export function getScoreBgColor(score: number): string {
    if (score >= 1800) return 'bg-ethos-teal/10 border-ethos-teal/20';
    if (score >= 1400) return 'bg-ethos-green/10 border-ethos-green/20';
    if (score >= 1000) return 'bg-ethos-yellow/10 border-ethos-yellow/20';
    return 'bg-ethos-red/10 border-ethos-red/20';
}

export function getScoreLabel(score: number): string {
    if (score >= 1800) return 'Exemplary';
    if (score >= 1400) return 'Reputable';
    if (score >= 1000) return 'Neutral';
    if (score >= 600) return 'Questionable';
    return 'Untrusted';
}
