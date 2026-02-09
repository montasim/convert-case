import * as React from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export function Logo({ className, iconSize = "w-8 h-8", textSize = "text-xl", showText = true }: {
    className?: string;
    iconSize?: string;
    textSize?: string;
    showText?: boolean;
}) {
    return (
        <div className={cn("flex items-center gap-0.5", className)}>
            <div className={cn("bg-primary rounded-lg flex items-center justify-center shrink-0", iconSize)}>
                <span className="text-primary-foreground font-bold leading-none" style={{ fontSize: '1.25rem' }}>C</span>
            </div>
            {showText && (
                <span className={cn("font-bold tracking-tight leading-none", textSize)}>
                    onvert Case
                </span>
            )}
        </div>
    );
}

export function Header() {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="group transition-opacity hover:opacity-90">
                    <Logo />
                </Link>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </header>
    );
}

export function Footer() {
    return (
        <footer className="border-t border-border/50 py-12 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center">
                        <Logo iconSize="w-6 h-6" textSize="text-sm" className="opacity-80" />
                        <span className="ml-2 text-sm text-muted-foreground font-medium">© 2026</span>
                    </div>

                    <nav className="flex items-center gap-8 text-sm text-muted-foreground">
                        {[
                            { href: "/privacy", label: "Privacy" },
                            { href: "/terms", label: "Terms" },
                            { href: "/contact", label: "Contact" }
                        ].map((link) => (
                            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen relative overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

            <Header />
            <div className="container mx-auto px-4 pt-36 pb-20 relative z-10">
                {children}
            </div>
            <Footer />
        </main>
    );
}

export function PageHeader({
    title,
    description,
    icon: Icon,
    gradient = false,
    className
}: {
    title: string;
    description: string;
    icon?: React.ElementType;
    gradient?: boolean;
    className?: string;
}) {
    return (
        <div className={cn("flex flex-col items-center text-center space-y-4 mb-8", className)}>
            {Icon && (
                <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-2xl mb-2">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
            )}
            <h1 className={cn(
                "text-3xl md:text-4xl font-bold tracking-tight",
                gradient && "bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
            )}>
                {title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl px-4 mx-auto">
                {description}
            </p>
        </div>
    );
}

export function InfoCard({
    title,
    description,
    icon: Icon,
    className,
    centered = false
}: {
    title: string;
    description: string;
    icon?: React.ElementType;
    className?: string;
    centered?: boolean;
}) {
    return (
        <Card className={cn("border-none shadow-xl bg-card/50 backdrop-blur-sm ring-1 ring-border/50 transition-all hover:scale-[1.02]", className)}>
            <CardContent className={cn("p-8 space-y-4", centered && "text-center")}>
                {Icon && (
                    <div className={cn(
                        "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4",
                        centered && "mx-auto"
                    )}>
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                )}
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}

export function PageSection({
    title,
    children,
    icon: Icon,
    className
}: {
    title: string;
    children: React.ReactNode;
    icon?: React.ElementType;
    className?: string;
}) {
    return (
        <section className={cn("space-y-4", className)}>
            <div className="flex items-center gap-3">
                {Icon && <Icon className="w-5 h-5 text-primary" />}
                <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            </div>
            <div className="text-muted-foreground leading-relaxed space-y-4">
                {children}
            </div>
        </section>
    );
}

export function InfoGrid({
    children,
    cols = 3,
    className
}: {
    children: React.ReactNode;
    cols?: 1 | 2 | 3 | 4;
    className?: string;
}) {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-3",
        4: "grid-cols-2 lg:grid-cols-4"
    }[cols];

    return (
        <div className={cn("grid gap-6", gridCols, className)}>
            {children}
        </div>
    );
}

export function ContentCard({
    children,
    className,
    gradientBar = false
}: {
    children: React.ReactNode;
    className?: string;
    gradientBar?: boolean;
}) {
    return (
        <Card className={cn("border-none shadow-xl bg-card/50 backdrop-blur-sm ring-1 ring-border/50 overflow-hidden", className)}>
            {gradientBar && <div className="h-2 bg-gradient-to-r from-primary/50 to-primary" />}
            <CardContent className="p-8 md:p-12 space-y-8">
                {children}
            </CardContent>
        </Card>
    );
}
