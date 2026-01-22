import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
    isConnected: boolean;
    address: string | null;
    username: string | null;
    ethosScore: number;
    traderScore: number;
    winRate: number;
    totalSignals: number;
    connect: (address: string) => void;
    disconnect: () => void;
}

const MOCK_WALLETS: Record<string, Omit<WalletState, 'isConnected' | 'connect' | 'disconnect'>> = {
    '0xfedcba9876543210fedcba9876543210fedcba98': {
        address: '0xfedcba9876543210fedcba9876543210fedcba98',
        username: 'powellruggedme',
        ethosScore: 1923,
        traderScore: 91,
        winRate: 78.5,
        totalSignals: 124,
    },
    '0x1234567890abcdef1234567890abcdef12345678': {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        username: 'zachxbt',
        ethosScore: 1847,
        traderScore: 85,
        winRate: 72.3,
        totalSignals: 89,
    },
    '0xabcdef1234567890abcdef1234567890abcdef12': {
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        username: 'serpinxbt',
        ethosScore: 1562,
        traderScore: 76,
        winRate: 68.9,
        totalSignals: 156,
    },
    '0x9876543210fedcba9876543210fedcba98765432': {
        address: '0x9876543210fedcba9876543210fedcba98765432',
        username: '0xGiwax',
        ethosScore: 982,
        traderScore: 52,
        winRate: 51.2,
        totalSignals: 234,
    },
    '0x1111222233334444555566667777888899990000': {
        address: '0x1111222233334444555566667777888899990000',
        username: '1st_Bernice',
        ethosScore: 458,
        traderScore: 28,
        winRate: 38.7,
        totalSignals: 45,
    },
    '0xnewuser0000000000000000000000000000000000': {
        address: '0xnewuser0000000000000000000000000000000000',
        username: 'newbie_trader',
        ethosScore: 320,
        traderScore: 10,
        winRate: 0,
        totalSignals: 0,
    },
};

export const useWalletStore = create<WalletState>()(
    persist(
        (set) => ({
            isConnected: false,
            address: null,
            username: null,
            ethosScore: 0,
            traderScore: 0,
            winRate: 0,
            totalSignals: 0,
            connect: (address: string) => {
                const wallet = MOCK_WALLETS[address];
                if (wallet) {
                    set({
                        isConnected: true,
                        ...wallet,
                    });
                }
            },
            disconnect: () => {
                set({
                    isConnected: false,
                    address: null,
                    username: null,
                    ethosScore: 0,
                    traderScore: 0,
                    winRate: 0,
                    totalSignals: 0,
                });
            },
        }),
        {
            name: 'wallet-storage',
        }
    )
);

export const AVAILABLE_WALLETS = Object.values(MOCK_WALLETS);
