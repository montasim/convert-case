"use client";

import * as React from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Copy,
    Trash2,
    GitBranch,
    Tag,
    Type,
    Check,
    Zap,
    Layout,
    Shield,
    LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { PageHeader, InfoCard, InfoGrid } from "@/components/layout";
import { useBranchNameGenerator, type BranchPrefix } from "@/lib/hooks";

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

function OptionButton({
    active,
    onClick,
    children
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border",
                active
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary hover:border-primary/30"
            )}
        >
            {children}
        </button>
    );
}

export function BranchNameGenerator() {
    const {
        taskName,
        setTaskName,
        prefix,
        setPrefix,
        customPrefix,
        setCustomPrefix,
        divider,
        setDivider,
        branchName,
        copied,
        handleCopy,
        handleClear,
    } = useBranchNameGenerator();

    const inputRef = useRef<HTMLInputElement>(null);

    const onClear = () => {
        handleClear();
        inputRef.current?.focus();
    };

    const prefixOptions: { value: BranchPrefix; label: string }[] = [
        { value: "feature", label: "Feature" },
        { value: "bug", label: "Bug" },
        { value: "none", label: "None" },
        { value: "custom", label: "Custom" },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <PageHeader
                title="Git Branch Name Generator"
                description="Generate consistent git branch names from your task descriptions. Fast, simple, and effective."
                icon={GitBranch}
                gradient
            />

            <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-primary/5 bg-card/70 backdrop-blur-xl overflow-hidden ring-1 ring-border py-0 group/card">
                <CardContent className="p-0">
                    {/* Settings Section */}
                    <div className="p-6 md:p-8 border-b border-border/50 bg-muted/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Divider Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                    <Type className="w-4 h-4" />
                                    Divider
                                </label>
                                <div className="flex gap-2">
                                    <OptionButton
                                        active={divider === "-"}
                                        onClick={() => setDivider("-")}
                                    >
                                        Dash (-)
                                    </OptionButton>
                                    <OptionButton
                                        active={divider === "_"}
                                        onClick={() => setDivider("_")}
                                    >
                                        Underscore (_)
                                    </OptionButton>
                                </div>
                            </div>

                            {/* Prefix Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    Prefix
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {prefixOptions.map(({ value, label }) => (
                                        <OptionButton
                                            key={value}
                                            active={prefix === value}
                                            onClick={() => setPrefix(value)}
                                        >
                                            {label}
                                        </OptionButton>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Custom Prefix Input */}
                        {prefix === "custom" && (
                            <div className="mt-4 space-y-2">
                                <label htmlFor="custom-prefix" className="text-sm font-semibold text-muted-foreground">
                                    Custom Prefix
                                </label>
                                <Input
                                    id="custom-prefix"
                                    placeholder="e.g., hotfix, refactor, chore"
                                    value={customPrefix}
                                    onChange={(e) => setCustomPrefix(e.target.value)}
                                    className="rounded-xl bg-background/50 border-border focus-visible:ring-primary/30"
                                />
                            </div>
                        )}
                    </div>

                    {/* Task Input */}
                    <div className="p-6 md:p-8">
                        <div className="space-y-3">
                            <label htmlFor="task-input" className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <GitBranch className="w-4 h-4" />
                                Task / Ticket Name
                            </label>
                            <Input
                                id="task-input"
                                ref={inputRef}
                                placeholder="e.g., Add user login functionality"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                className="rounded-xl bg-background/50 border-border focus-visible:ring-primary/30 text-lg py-6"
                            />
                        </div>
                    </div>

                    {/* Generated Branch Name Output */}
                    <div className="p-6 md:px-8 md:pb-8">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                Generated Branch Name
                            </label>
                            <div className="flex gap-3 items-center">
                                <div className="flex-1 relative">
                                    <Input
                                        readOnly
                                        placeholder="Your branch name will appear here..."
                                        value={branchName}
                                        className="rounded-xl bg-muted/50 border-border font-mono text-base h-14 pr-14 text-primary"
                                    />
                                    {branchName && (
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                            <IconButton
                                                icon={Copy}
                                                tooltip="Copy branch name"
                                                onClick={handleCopy}
                                                success={copied}
                                                className="w-10 h-10"
                                            />
                                        </div>
                                    )}
                                </div>
                                <IconButton
                                    icon={Trash2}
                                    tooltip="Clear all"
                                    onClick={onClear}
                                    disabled={!taskName}
                                    className="w-14 h-14 bg-background border-border shadow-sm hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="pt-8 pb-12">
                <InfoGrid>
                    <InfoCard
                        title="Real-time Generation"
                        description="Type your task name and instantly see the formatted branch name. No waiting, no extra clicks."
                        icon={Zap}
                    />
                    <InfoCard
                        title="Customizable Format"
                        description="Choose your preferred divider and prefix style to match your team's git conventions."
                        icon={Layout}
                    />
                    <InfoCard
                        title="One-click Copy"
                        description="Copy the generated branch name to your clipboard and paste it directly into your terminal."
                        icon={Shield}
                    />
                </InfoGrid>
            </div>
        </div>
    );
}
