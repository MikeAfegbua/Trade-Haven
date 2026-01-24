'use client';

import { SignalFilter, SignalSort } from '@/types';
import { useSignalsStore } from '@/store/signals';
import { cn } from '@/lib/utils';
import { Filter, ArrowUpDown, CheckCircle } from 'lucide-react';

const filters: { label: string; value: SignalFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Verified', value: 'verified' },
    { label: 'Long', value: 'long' },
    { label: 'Short', value: 'short' },
];

const sorts: { label: string; value: SignalSort }[] = [
    { label: 'Weighted Score', value: 'weighted' },
    { label: 'Performance', value: 'performance' },
    { label: 'Reputation', value: 'reputation' },
    { label: 'Newest', value: 'newest' },
];

export function SignalFilters() {
    const { filter, sort, setFilter, setSort } = useSignalsStore();

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
                <Filter className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
                <div className="flex w-full justify-between gap-1 overflow-x-auto rounded-lg border border-border bg-secondary p-1 sm:w-auto sm:justify-start">
                {filters.map((f) => (
                    <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={cn(
                        'flex flex-1 sm:flex-none items-center justify-center gap-1 rounded-md px-2.5 py-1.5 text-xs sm:px-3 sm:text-sm font-medium transition-colors',
                        filter === f.value
                        ? 'bg-ethos-teal text-black'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    >
                    {f.value === 'verified' && <CheckCircle className="h-3 w-3" />}
                    {f.label}
                    </button>
                ))}
                </div>

            </div>

            <div className="flex items-center gap-2">
                <ArrowUpDown className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SignalSort)}
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-ethos-teal sm:w-auto"
                >
                    {sorts.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
