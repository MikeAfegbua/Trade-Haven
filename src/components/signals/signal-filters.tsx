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
        <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex rounded-lg border border-border bg-secondary p-1">
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={cn(
                                'flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
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
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SignalSort)}
                    className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-ethos-teal"
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
