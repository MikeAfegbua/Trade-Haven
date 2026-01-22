'use client';

export function FAQ() {
    return (
        <div>
            <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <details className="group rounded-lg border border-border bg-card">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                        How is my Trader Score calculated?
                        <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                        Your Trader Score is calculated based on your signal accuracy, consistency, and risk management.
                        Signals that hit their targets increase your score, while stopped-out or expired signals decrease it.
                        The formula weighs recent performance more heavily than historical results.
                    </div>
                </details>

                <details className="group rounded-lg border border-border bg-card">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                        What happens when my signal expires?
                        <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                        When a signal expires without hitting its target or stop loss, it&apos;s marked as &quot;expired&quot; and
                        has a minor negative impact on your Trader Score. It&apos;s better to set realistic timeframes
                        based on your analysis.
                    </div>
                </details>

                <details className="group rounded-lg border border-border bg-card">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                        How do endorsements affect my visibility?
                        <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                        Endorsements from high-reputation traders boost your signal&apos;s visibility in the feed.
                        The endorsement weight is calculated by summing the Ethos scores of all endorsers.
                        Signals with higher endorsement weights rank higher in the default &quot;weighted&quot; sort.
                    </div>
                </details>

                <details className="group rounded-lg border border-border bg-card">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                        What does the verified badge mean?
                        <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                        The verified badge appears on signals from traders with an Ethos score of 1,400 or higher.
                        This indicates the trader has established credibility within the Ethos network.
                        Verified signals are given higher priority in the feed ranking algorithm.
                    </div>
                </details>

                <details className="group rounded-lg border border-border bg-card">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                        Can I edit or delete my signals?
                        <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                        Once posted, signals cannot be edited to maintain transparency and trust.
                        You can only delete signals within the first 5 minutes of posting if no one has endorsed them yet.
                        This prevents manipulation and ensures accountability.
                    </div>
                </details>

                <details className="group rounded-lg border border-border bg-card">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                        How does Ethos reputation work?
                        <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                        Ethos is an on-chain reputation protocol that tracks your credibility across web3.
                        Your Ethos score is built through vouches, reviews, and verified activity.
                        TradeHaven uses your Ethos score to weight your signals and determine endorsement eligibility.
                    </div>
                </details>

                <details className="group rounded-lg border border-border bg-card">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                        Who can endorse signals?
                        <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                        Only traders with an Ethos score of 1,200 or higher can endorse signals.
                        This ensures that endorsements carry weight and come from established community members.
                        Your endorsement adds your Ethos score to the signal&apos;s endorsement weight.
                    </div>
                </details>
            </div>
        </div>
    );
}
