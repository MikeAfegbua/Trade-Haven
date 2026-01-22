import { getScoreColor, getScoreBgColor, getScoreLabel, getEthosProfileUrl } from '@/lib/ethos';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface EthosScoreBadgeProps {
    score: number;
    address: string;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    asLink?: boolean;
}

export function EthosScoreBadge({ score, address, size = 'md', showLabel = false, asLink = true }: EthosScoreBadgeProps) {
    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs gap-1',
        md: 'px-3 py-1 text-sm gap-1.5',
        lg: 'px-4 py-2 text-base gap-2',
    };

    const iconSizes = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
    };

    const content = (
        <>
            <Star className={cn(iconSizes[size], getScoreColor(score))} />
            <span className={getScoreColor(score)}>{score}</span>
            {showLabel && (
                <span className={cn('text-muted-foreground', size === 'sm' ? 'text-xs' : 'text-sm')}>
                    • {getScoreLabel(score)}
                </span>
            )}
        </>
    );

    const className = cn(
        'inline-flex items-center rounded-full border font-medium transition-all',
        asLink && 'hover:scale-105',
        getScoreBgColor(score),
        sizeClasses[size]
    );

    if (!asLink) {
        return <span className={className}>{content}</span>;
    }

    return (
        <a
            href={getEthosProfileUrl(address)}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            onClick={(e) => e.stopPropagation()}
        >
            {content}
        </a>
    );
}
