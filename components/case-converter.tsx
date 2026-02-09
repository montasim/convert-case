"use client";

import * as React from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
    Copy,
    Download,
    Trash2,
    Type,
    Check,
    Hash,
    FileText,
    Zap,
    Layout,
    Shield,
    AlignLeft,
    LucideIcon
} from "lucide-react";
import {
    toSentenceCase,
    toLowerCase,
    toUpperCase,
    toCapitalizedCase,
    toAlternatingCase,
    toTitleCase,
    toInverseCase
} from "@/lib/conversions";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { PageHeader, InfoCard, InfoGrid } from "@/components/layout";
import { useCaseConverter } from "@/lib/hooks";

/**
 * SRP: Separate UI components for specific responsibilities
 */

function StatBadge({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: number }) {
    const colorMap: Record<string, string> = {
        "Characters": "text-primary",
        "Words": "text-chart-2",
        "Lines": "text-chart-5"
    };
    const activeColor = colorMap[label] || "text-primary";

    return (
        <div className="flex items-center gap-2.5 px-4 py-2 bg-background/60 shadow-sm rounded-2xl ring-1 ring-border transition-all hover:ring-primary/40 hover:bg-background/90 hover:scale-105 group/badge">
            <Icon className={cn("w-4 h-4 transition-colors", activeColor)} />
            <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover/badge:text-foreground">
                {label}: <span className="text-foreground">{value}</span>
            </span>
        </div>
    );
}

function IconButton({
    icon: Icon,
    tooltip,
    onClick,
    disabled,
    className,
    success = false
}: {
    icon: LucideIcon,
    tooltip: string,
    onClick: () => void,
    disabled?: boolean,
    className?: string,
    success?: boolean
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onClick}
                        disabled={disabled}
                        className={cn(
                            "rounded-2xl transition-all duration-300 hover:scale-110 active:scale-90 shadow-sm border-border bg-background",
                            className
                        )}
                    >
                        {success ? <Check className="w-5 h-5 animate-in zoom-in text-green-500" /> : <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-foreground text-background font-bold border-none">{tooltip}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

interface ConversionOption {
    label: string;
    fn: (t: string) => string;
}

const CONVERSION_OPTIONS: ConversionOption[] = [
    { label: "Sentence case", fn: toSentenceCase },
    { label: "lower case", fn: toLowerCase },
    { label: "UPPER CASE", fn: toUpperCase },
    { label: "Capitalized Case", fn: toCapitalizedCase },
    { label: "aLtErNaTiNg cAsE", fn: toAlternatingCase },
    { label: "Title Case", fn: toTitleCase },
    { label: "InVeRsE CaSe", fn: toInverseCase },
];

export function CaseConverter() {
    const {
        text,
        setText,
        stats,
        copied,
        handleCopy,
        handleDownload,
        handleClear,
        applyConversion,
    } = useCaseConverter();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onClear = () => {
        handleClear();
        textareaRef.current?.focus();
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <PageHeader
                title="Smart Case Converter"
                description="Modern text transformation tools for everyone. Fast, secure, and intuitive."
                icon={Type}
                gradient
            />

            <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-primary/5 bg-card/70 backdrop-blur-xl overflow-hidden ring-1 ring-border py-0 group/card">
                <CardContent className="p-0">
                    <div className="relative">
                        <Textarea
                            ref={textareaRef}
                            placeholder="Type or paste your content here..."
                            className="min-h-[200px] md:min-h-[300px] p-8 md:p-12 text-xl border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent resize-y transition-all duration-300 placeholder:text-muted-foreground/30 leading-relaxed font-medium"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 md:px-12 md:py-8 bg-muted/30 border-t border-border/50 backdrop-blur-md">
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                            <StatBadge icon={Hash} label="Characters" value={stats.characters} />
                            <StatBadge icon={FileText} label="Words" value={stats.words} />
                            <StatBadge icon={AlignLeft} label="Lines" value={stats.lines} />
                        </div>

                        <div className="flex items-center gap-3">
                            <IconButton
                                icon={Copy}
                                tooltip="Copy"
                                onClick={handleCopy}
                                success={copied}
                                disabled={!text}
                                className={cn("w-14 h-14 bg-background border-border shadow-sm hover:border-primary/50", copied && "bg-green-500/10 border-green-500/50 text-green-600 hover:bg-green-500/20")}
                            />
                            <IconButton
                                icon={Download}
                                tooltip="Save as TXT"
                                onClick={handleDownload}
                                disabled={!text}
                                className="w-14 h-14 bg-background border-border shadow-sm hover:border-primary/50"
                            />
                            <IconButton
                                icon={Trash2}
                                tooltip="Clear content"
                                onClick={onClear}
                                disabled={!text}
                                className="w-14 h-14 bg-background border-border shadow-sm hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {CONVERSION_OPTIONS.map(({ label, fn }) => (
                    <Button
                        key={label}
                        variant="secondary"
                        className="rounded-2xl h-14 text-sm font-bold transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] bg-secondary/80 hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-primary/30 border border-transparent hover:border-primary/30"
                        onClick={() => applyConversion(fn)}
                        disabled={!text}
                    >
                        {label}
                    </Button>
                ))}
            </div>

            <div className="pt-16 pb-12">
                <InfoGrid>
                    <InfoCard
                        title="Fast & Simple"
                        description="Paste your text and transform it instantly. No waiting, no complex menus."
                        icon={Zap}
                    />
                    <InfoCard
                        title="Modern Interface"
                        description="A clean, colorful, and distraction-free environment designed for your focus."
                        icon={Layout}
                    />
                    <InfoCard
                        title="Secure & Private"
                        description="Your data never leaves your device. All processing happens locally in your browser."
                        icon={Shield}
                    />
                </InfoGrid>
            </div>
        </div>
    );
}
