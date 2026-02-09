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
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-background/50 rounded-full ring-1 ring-border/50 text-sm font-medium text-muted-foreground transition-all hover:ring-primary/30">
            <Icon className="w-4 h-4 text-primary/60" />
            <span>{label}: <span className="text-foreground">{value}</span></span>
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
                        className={cn("rounded-xl transition-all duration-300", className)}
                    >
                        {success ? <Check className="w-4 h-4 animate-in zoom-in" /> : <Icon className="w-4 h-4" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
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
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <PageHeader
                title="Smart Case Converter"
                description="The most advanced online case conversion tool. Transform your text instantly with premium accuracy and a clean interface."
                icon={Type}
                gradient
            />

            <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden ring-1 ring-border/50 py-0 group/card">
                <CardContent className="p-0">
                    <div className="relative">
                        <Textarea
                            ref={textareaRef}
                            placeholder="Paste or type your text here..."
                            className="min-h-[200px] md:min-h-[350px] p-6 md:p-8 text-lg border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent resize-y transition-all duration-300 placeholder:text-muted-foreground/40 leading-relaxed"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 md:px-8 md:py-6 bg-muted/40 border-t border-border/50 backdrop-blur-md">
                        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                            <StatBadge icon={Hash} label="Chars" value={stats.characters} />
                            <StatBadge icon={FileText} label="Words" value={stats.words} />
                            <StatBadge icon={AlignLeft} label="Lines" value={stats.lines} />
                        </div>

                        <div className="flex items-center gap-3">
                            <IconButton
                                icon={Copy}
                                tooltip="Copy to Clipboard"
                                onClick={handleCopy}
                                success={copied}
                                disabled={!text}
                                className={cn(copied && "bg-green-500/10 border-green-500/50 text-green-600 hover:bg-green-500/20")}
                            />
                            <IconButton
                                icon={Download}
                                tooltip="Download as TXT"
                                onClick={handleDownload}
                                disabled={!text}
                            />
                            <IconButton
                                icon={Trash2}
                                tooltip="Clear All"
                                onClick={onClear}
                                disabled={!text}
                                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {CONVERSION_OPTIONS.map(({ label, fn }) => (
                    <Button
                        key={label}
                        variant="secondary"
                        className="rounded-xl h-12 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-secondary/80 hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-primary/20 border border-transparent hover:border-primary/20"
                        onClick={() => applyConversion(fn)}
                        disabled={!text}
                    >
                        {label}
                    </Button>
                ))}
            </div>

            <div className="pt-12">
                <InfoGrid>
                    <InfoCard
                        title="Fast & Simple"
                        description="Just paste your text and click a button. Our algorithm handles the rest instantly, saving you time and effort."
                        icon={Zap}
                    />
                    <InfoCard
                        title="Clean Interface"
                        description="A minimalist, distraction-free environment designed for maximum productivity and ease of use."
                        icon={Layout}
                    />
                    <InfoCard
                        title="Secure & Private"
                        description="Your text never leaves your browser. All conversions are performed locally, ensuring your data remains private."
                        icon={Shield}
                    />
                </InfoGrid>
            </div>
        </div>
    );
}
