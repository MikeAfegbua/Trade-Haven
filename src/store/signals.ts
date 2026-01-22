'use client';

import { create } from 'zustand';
import { Signal, SignalFilter, SignalSort } from '@/types';

interface SignalsState {
    signals: Signal[];
    filter: SignalFilter;
    sort: SignalSort;
    isLoading: boolean;
    setSignals: (signals: Signal[]) => void;
    setFilter: (filter: SignalFilter) => void;
    setSort: (sort: SignalSort) => void;
    setLoading: (loading: boolean) => void;
    addSignal: (signal: Signal) => void;
    endorseSignal: (signalId: string, endorsement: Signal['endorsements'][0]) => void;
}

export const useSignalsStore = create<SignalsState>((set) => ({
    signals: [],
    filter: 'all',
    sort: 'weighted',
    isLoading: true,
    setSignals: (signals) => set({ signals }),
    setFilter: (filter) => set({ filter }),
    setSort: (sort) => set({ sort }),
    setLoading: (isLoading) => set({ isLoading }),
    addSignal: (signal) => set((state) => ({ signals: [signal, ...state.signals] })),
    endorseSignal: (signalId, endorsement) =>
        set((state) => ({
            signals: state.signals.map((s) =>
                s.id === signalId
                    ? {
                        ...s,
                        endorsements: [...s.endorsements, endorsement],
                        endorsementWeight: s.endorsementWeight + endorsement.endorser.ethosScore,
                    }
                    : s
            ),
        })),
}));
