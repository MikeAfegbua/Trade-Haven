import { Github, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            Powered by{' '}
                            <a
                                href="https://ethos.network"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-ethos-teal hover:underline"
                            >
                                Ethos Network
                            </a>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Built by{' '}
                        <a
                            href="https://x.com/shinobeme"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-ethos-teal hover:underline"
                        >
                            @shinobeme
                        </a>{' '}
                        for Ethos Vibeathon 2026
                    </p>
                </div>
            </div>
        </footer>
    );
}
