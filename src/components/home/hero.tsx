import Link from 'next/link';
import { TrendingUp, Shield, BarChart3, Award, ArrowDown, AlertTriangle } from 'lucide-react';

const features = [
    {
        icon: BarChart3,
        title: 'Reputation Ranked',
        description: 'Anyone can post. Your visibility depends on your Ethos score.',
    },
    {
        icon: TrendingUp,
        title: 'Performance Tracked',
        description: 'Every call is tracked. Win rate affects your visibility.',
    },
    {
        icon: Award,
        title: 'Weighted Endorsements',
        description: 'High-rep users boost signals. Low rep? Lower visibility.',
    },
    {
        icon: AlertTriangle,
        title: 'Real Consequences',
        description: 'Miss your targets? Your Trader Score drops. Hard.',
    },
];

const stats = [
    { value: '1,400+', label: 'Verified status' },
    { value: '1,200+', label: 'Min to endorse' },
    { value: '∞', label: 'Anyone can post' },
];

export function Hero() {
    return (
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-ethos-teal/5 to-transparent py-20">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

            <div className="container relative mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ethos-teal/20 bg-ethos-teal/10 px-4 py-1.5 text-sm font-medium">
                        <Shield className="h-4 w-4 text-ethos-teal" />
                        <span className="text-ethos-teal">Reputation Has Consequences</span>
                    </div>

                    <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-5xl">
                        Crypto Alpha Spot Where{' '}
                        <span className="bg-gradient-to-r from-ethos-teal to-ethos-green bg-clip-text text-transparent">
                            Reputation Compounds
                        </span>
                        {' '}or{' '}
                        <span className="text-ethos-red">Decays</span>
                    </h1>

                    <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                        The first trading signals board with <strong>hard consequences</strong> tied to on-chain reputation.
                        Win and your visibility grows. Lose and watch your influence fade.
                        Powered by Ethos.
                    </p>

                    <div className="mb-8 flex items-center justify-center gap-6">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="font-mono text-2xl font-bold text-ethos-teal">{stat.value}</p>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/#signals"
                            className="w-full rounded-lg bg-ethos-teal px-6 py-3 font-medium text-white transition-colors hover:bg-ethos-teal-dark sm:w-auto"
                        >
                            View Signals
                        </Link>
                        <Link
                            href="/leaderboard"
                            className="w-full rounded-lg border border-border bg-secondary px-6 py-3 font-medium transition-colors hover:bg-muted sm:w-auto"
                        >
                            Leaderboard →
                        </Link>
                    </div>
                </div>

                <div className="mx-auto mt-6 flex justify-center">
                    <a href="#signals" className="animate-bounce text-muted-foreground transition-colors hover:text-foreground">
                        <ArrowDown className="h-6 w-6" />
                    </a>
                </div>

                <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-ethos-teal/30"
                        >
                            <feature.icon className="mb-3 h-8 w-8 text-ethos-teal" />
                            <h3 className="mb-1 font-semibold">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
